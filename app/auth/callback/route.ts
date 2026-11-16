import { createServerClient } from "@supabase/ssr";
import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  // Render may expose its internal bind address (0.0.0.0:10000) to the
  // application. Never use that internal origin for browser redirects.
  const siteOrigin =
    process.env.NEXT_PUBLIC_SITE_URL || "https://smart-link-live.onrender.com";

  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const emailType = url.searchParams.get("type") as EmailOtpType | null;
  const isRecovery = emailType === "recovery";
  const requestedNext =
    url.searchParams.get("next") ?? (isRecovery ? "/auth/reset-password" : "/dashboard");
  const next =
    requestedNext.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : isRecovery
        ? "/auth/reset-password"
        : "/dashboard";

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.redirect(new URL("/auth?mode=login&error=configuration", siteOrigin));
  }

  // Keep the success redirect and the Supabase session cookies on one response.
  const response = NextResponse.redirect(new URL(next, siteOrigin));
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  let user = null;
  if (tokenHash && emailType) {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: emailType,
    });
    if (error || !data.user) {
      const errorPath = isRecovery
        ? "/auth/reset-password?error=invalid_or_expired"
        : "/auth?mode=login&error=confirmation";
      return NextResponse.redirect(new URL(errorPath, siteOrigin));
    }
    user = data.user;
  } else if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error || !data.user) {
      return NextResponse.redirect(
        new URL(
          isRecovery ? "/auth/reset-password?error=invalid_or_expired" : "/auth?mode=login&error=confirmation",
          siteOrigin,
        ),
      );
    }
    user = data.user;
  } else {
    return NextResponse.redirect(
      new URL(
        isRecovery ? "/auth/reset-password?error=missing_token" : "/auth?mode=login&error=confirmation",
        siteOrigin,
      ),
    );
  }

  // Create a profile only when one does not already exist (normally signup).
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile) {
      const fallback = (user.email?.split("@")[0] ?? "user")
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, "")
        .slice(0, 20);
      const username = `${fallback || "user"}_${user.id.slice(0, 6)}`;
      await supabase.from("profiles").insert({
        id: user.id,
        username,
        is_published: false,
      });
    }
  }

  return response;
}
