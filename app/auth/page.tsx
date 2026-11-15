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
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
          options: { emailRedirectTo: "https://smart-link-preview.onrender.com/auth/callback?next=%2Fdashboard" },
        });
        if (authError) throw authError;
        if (data.session && data.user) {
          const { error: profileError } = await supabase.from("profiles").insert({
            id: data.user.id, username: cleanUsername, is_published: false,
          });
          if (profileError) throw profileError;
          router.push("/dashboard"); router.refresh();
        } else {
          setMessage("تم إرسال رسالة تأكيد إلى بريدك الإلكتروني. افتحها لتفعيل الحساب ثم سجّل الدخول.");
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

  return <main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#07111f] px-5 py-12 text-white">
    <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.05] p-7 shadow-2xl">
      <Link href="/" className="text-xl font-black">Smart<span className="text-cyan-300">Link</span></Link>
      <h1 className="mt-8 text-3xl font-black">{mode === "signup" ? "أنشئ حسابك" : "مرحباً بعودتك"}</h1>
      <p className="mt-2 text-sm leading-7 text-slate-400">{mode === "signup" ? "ابدأ بإنشاء صفحتك الرقمية في رابط واحد." : "سجّل الدخول لإدارة صفحتك وروابطك."}</p>
      <form onSubmit={submit} className="mt-7 space-y-4">
        {mode === "signup" && <label className="block text-sm">اسم رابط صفحتك
          <div className="mt-2 flex overflow-hidden rounded-xl border border-white/10 bg-slate-950"><span className="px-3 py-3 text-slate-500">/</span><input required minLength={3} maxLength={30} value={username} onChange={e=>setUsername(e.target.value)} placeholder="yourname" className="min-w-0 flex-1 bg-transparent px-3 py-3 outline-none" /></div>
        </label>}
        <label className="block text-sm">البريد الإلكتروني<input type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-300" /></label>
        <label className="block text-sm">كلمة المرور<input type="password" required minLength={8} autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-300" /><span className="mt-1 block text-xs text-slate-500">8 أحرف على الأقل</span></label>
        {error && <p role="alert" className="rounded-xl bg-red-400/10 p-3 text-sm text-red-300">{error}</p>}
        {message && <p role="status" className="rounded-xl bg-emerald-400/10 p-3 text-sm text-emerald-300">{message}</p>}
        <button disabled={busy} className="w-full rounded-xl bg-cyan-400 px-5 py-3.5 font-bold text-slate-950 disabled:opacity-60">{busy ? "جارٍ التنفيذ..." : mode === "signup" ? "إنشاء الحساب" : "تسجيل الدخول"}</button>
      </form>
      <button onClick={()=>{setMode(mode==="signup"?"login":"signup");setError("");setMessage("");}} className="mt-5 w-full text-sm text-cyan-300">{mode==="signup"?"لديك حساب؟ سجّل الدخول":"ليس لديك حساب؟ أنشئ حساباً"}</button>
      <Link href="/" className="mt-6 block text-center text-xs text-slate-500">العودة إلى الصفحة الرئيسية</Link>
    </section>
  </main>;
}

export default function AuthPage() {
  return <Suspense fallback={<main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#07111f] text-white">جارٍ التحميل...</main>}><AuthForm /></Suspense>;
}
