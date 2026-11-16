"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError(""); setMessage("");
    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth/callback?next=%2Fauth%2Freset-password`,
      });
      if (resetError) throw resetError;
      setMessage("إذا كان لهذا البريد حساب، فستصلك رسالة لإعادة تعيين كلمة المرور. افحص الوارد والرسائل غير المرغوب فيها. / If an account exists for this email, a password reset email will be sent.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "تعذر إرسال رسالة الاستعادة.");
    } finally { setBusy(false); }
  }

  return <main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-5 py-12 text-slate-800">
    <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl">
      <Link href="/" className="text-xl font-black">رابطك <span className="text-teal-700">Link</span></Link>
      <h1 className="mt-8 text-2xl font-black">استعادة كلمة المرور / Reset password</h1>
      <p className="mt-3 text-sm leading-7 text-slate-600">أدخل البريد الإلكتروني المسجل لإرسال رابط آمن لإعادة تعيين كلمة المرور.</p>
      <form onSubmit={submit} className="mt-7 space-y-4">
        <label className="block text-sm">البريد الإلكتروني / Email address
          <input type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-400" />
        </label>
        {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
        {message && <p role="status" className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}
        <button disabled={busy} className="w-full rounded-xl bg-teal-600 px-5 py-3.5 font-bold text-white disabled:opacity-60">{busy ? "جارٍ الإرسال..." : "إرسال رابط الاستعادة / Send reset link"}</button>
      </form>
      <Link href="/auth?mode=login" className="mt-6 block text-center text-sm text-teal-700">العودة لتسجيل الدخول / Back to sign in</Link>
    </section>
  </main>;
}
