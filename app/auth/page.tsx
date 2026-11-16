"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

function AuthForm() {
  const router = useRouter();
  const search = useSearchParams();
  const initialMode = search.get("mode") === "login" ? "login" : "signup";
  const [mode, setMode] = useState<"signup" | "login">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const referralCode = (search.get("ref") ?? "").trim().toLowerCase();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function resendConfirmation() {
    if (!email.trim()) {
      setError("أدخل بريدك الإلكتروني أولاً / Enter your email first.");
      return;
    }
    setBusy(true); setError(""); setMessage("");
    try {
      const supabase = createClient();
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: email.trim(),
        options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=%2Fdashboard` },
      });
      if (resendError) throw resendError;
      setMessage("تم طلب إعادة إرسال رسالة التأكيد. افحص الوارد والرسائل غير المرغوب فيها. / Confirmation email resent. Check inbox and spam.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "تعذرت إعادة إرسال رسالة التأكيد.");
    } finally {
      setBusy(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError(""); setMessage("");
    const supabase = createClient();
    try {
      if (mode === "signup") {
        const cleanUsername = username.trim().toLowerCase();
        if (!/^[a-z0-9_]{3,30}$/.test(cleanUsername)) {
          throw new Error("اسم الصفحة يجب أن يكون 3–30 حرفاً إنجليزياً صغيراً أو رقماً أو _");
        }
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=%2Fdashboard`, data: referralCode ? { referral_code: referralCode } : {} },
        });
        if (authError) throw authError;
        if (data.session && data.user) {
          const { error: profileError } = await supabase.from("profiles").insert({
            id: data.user.id, username: cleanUsername, is_published: false,
          });
          if (profileError) throw profileError;
          router.push("/dashboard"); router.refresh();
        } else {
          setMessage("تم إرسال رسالة التأكيد إلى بريدك. بعد الضغط على رابط التأكيد، سيُفتح حسابك تلقائياً دون الحاجة إلى تسجيل الدخول مرة أخرى. / Confirmation email sent. Click the link to activate your account and you will be signed in automatically.");
        }
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (authError) throw authError;
        router.push("/dashboard"); router.refresh();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "تعذر إكمال العملية.");
    } finally { setBusy(false); }
  }

  return <main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-5 py-12 text-slate-800">
    <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl">
      <Link href="/" className="text-xl font-black">رابطك <span className="text-teal-700">Link</span></Link>
      <h1 className="mt-8 text-3xl font-black">{mode === "signup" ? "أنشئ حسابك / Create your account" : "مرحباً بعودتك / Welcome back"}</h1>
      <p className="mt-2 text-sm leading-7 text-slate-600">{mode === "signup" ? "ابدأ بإنشاء صفحتك الرقمية في رابط واحد. / Create your digital page in one link." : "سجّل الدخول لإدارة صفحتك وروابطك. / Sign in to manage your page and links."}</p>
      <form onSubmit={submit} className="mt-7 space-y-4">
        {mode === "signup" && <label className="block text-sm">اسم رابط صفحتك / Your page URL
          <div className="mt-2 flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50"><span className="px-3 py-3 text-slate-500">/</span><input required minLength={3} maxLength={30} value={username} onChange={e=>setUsername(e.target.value)} placeholder="yourname" className="min-w-0 flex-1 bg-transparent px-3 py-3 outline-none" /></div>
        </label>}
        <label className="block text-sm">البريد الإلكتروني / Email address<input type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-400" /></label>
        <label className="block text-sm">كلمة المرور / Password<input type="password" required minLength={8} autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-400" /><span className="mt-1 block text-xs text-slate-500">8 أحرف على الأقل / At least 8 characters</span></label>
        {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
        {message && <div role="status" className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700"><p>{message}</p>{mode === "signup" && <button type="button" onClick={resendConfirmation} disabled={busy} className="mt-3 underline disabled:opacity-60">إعادة إرسال رسالة التأكيد / Resend confirmation</button>}</div>}
        <button disabled={busy} className="w-full rounded-xl bg-teal-600 px-5 py-3.5 font-bold text-white disabled:opacity-60">{busy ? "جارٍ التنفيذ..." : mode === "signup" ? "إنشاء الحساب / Create account" : "تسجيل الدخول / Sign in"}</button>
      </form>
      <button onClick={()=>{setMode(mode==="signup"?"login":"signup");setError("");setMessage("");}} className="mt-5 w-full text-sm text-teal-700">{mode==="signup"?"لديك حساب؟ سجّل الدخول / Already registered? Sign in":"ليس لديك حساب؟ أنشئ حساباً / New here? Create an account"}</button>
      <Link href="/" className="mt-6 block text-center text-xs text-slate-500">العودة إلى الصفحة الرئيسية / Back to home</Link>
    </section>
  </main>;
}

export default function AuthPage() {
  return <Suspense fallback={<main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#f4f7fb] text-slate-800">جارٍ التحميل...</main>}><AuthForm /></Suspense>;
}
