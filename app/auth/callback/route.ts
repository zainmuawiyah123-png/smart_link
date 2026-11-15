import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/dashboard";
  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      const { data: profile } = await supabase.from("profiles").select("id").eq("id", data.user.id).maybeSingle();
      if (!profile) {
        const fallback = (data.user.email?.split("@")[0] ?? "user").toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20);
        const username = `${fallback || "user"}_${data.user.id.slice(0, 6)}`;
        await supabase.from("profiles").insert({ id: data.user.id, username, is_published: false });
      }
      return NextResponse.redirect(new URL(next.startsWith("/") ? next : "/dashboard", url.origin));
    }
  }
  return NextResponse.redirect(new URL("/auth?mode=login&error=confirmation", url.origin));
}
