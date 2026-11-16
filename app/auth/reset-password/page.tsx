"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const supabase = createClient();
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) setReady(Boolean(data.session));
    });
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (active && (event === "PASSWORD_RECOVERY" || session)) setReady(true);
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(""); setMessage("");
    if (!email.trim() || !/^\\d{6}$/.test(otp.trim())) {
      setError("أدخل البريد الإلكتروني ورمز الاستعادة المكوّن من 6 أرقام.");
      return;
    }
    setVerifying(true);
    try {
      const supabase = createClient();
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: email.trim(), token: otp.trim(), type: "recovery",
      });
      if (verifyError) throw verifyError;
      setReady(true);
      setMessage("تم التحقق من الرمز. أدخل كلمة المرور الجديدة.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "تعذر التحقق من الرمز. تأكد من الرمز واطلب رسالة جديدة إذا انتهت صلاحيته.");
    } finally { setVerifying(false); }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(""); setMessage("");
    if (password.length < 8) { setError("كلمة المرور يجب ألا تقل عن 8 أحرف."); return; }
    if (password !== confirm) { setError("كلمتا المرور غير متطابقتين."); return; }
    setBusy(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      setMessage("تم تحديث كلمة المرور بنجاح. جارٍ فتح حسابك...");
      router.replace("/dashboard"); router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "تعذر تحديث كلمة المرور.");
    } finally { setBusy(false); }
  }

  return <main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-5 py-12 text-slate-800">
    <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl">
      <Link href="/" className="text-xl font-black">رابطك <span className="text-teal-700">Link</span></Link>
      <h1 className="mt-8 text-2xl font-black">تعيين كلمة مرور جديدة / New password</h1>
      {!ready ? <>
        <p className="mt-3 text-sm leading-7 text-slate-600">إذا تعذر فتح رابط البريد في Safari، يمكنك إدخال رمز الاستعادة المكوّن من 6 أرقام هنا. يجب أن تحتوي رسالة الاستعادة على الرمز.</p>
        <form onSubmit={verifyCode} className="mt-6 space-y-4">
          <label className="block text-sm">البريد الإلكتروني / Email
            <input type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-400" />
          </label>
          <label className="block text-sm">رمز الاستعادة / 6-digit code
            <input inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required value={otp} onChange={e=>setOtp(e.target.value.replace(/\\D/g, "").slice(0, 6))} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center tracking-[0.4em] outline-none focus:border-teal-400" />
          </label>
          {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
          <button disabled={verifying} className="w-full rounded-xl bg-teal-600 px-5 py-3.5 font-bold text-white disabled:opacity-60">{verifying ? "جارٍ التحقق..." : "التحقق من الرمز / Verify code"}</button>
        </form>
        <p className="mt-4 text-xs leading-6 text-slate-500">يمكنك أيضاً فتح رابط الاستعادة في الرسالة إذا كان يعمل. لن يعمل إدخال الرمز قبل ضبط قالب رسالة Supabase لإظهار الرمز.</p>
      </> : <>
        <p className="mt-3 text-sm leading-7 text-slate-600">اختر كلمة مرور جديدة لحسابك (8 أحرف على الأقل).</p>
        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block text-sm">كلمة المرور الجديدة / New password
            <input type="password" required minLength={8} autoComplete="new-password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-400" />
          </label>
          <label className="block text-sm">تأكيد كلمة المرور / Confirm password
            <input type="password" required minLength={8} autoComplete="new-password" value={confirm} onChange={e=>setConfirm(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-400" />
          </label>
          {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
          {message && <p role="status" className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}
          <button disabled={busy} className="w-full rounded-xl bg-teal-600 px-5 py-3.5 font-bold text-white disabled:opacity-60">{busy ? "جارٍ الحفظ..." : "حفظ كلمة المرور / Save password"}</button>
        </form>
      </>}
      <Link href="/auth?mode=login" className="mt-6 block text-center text-sm text-teal-700">العودة لتسجيل الدخول / Back to sign in</Link>
    </section>
  </main>;
}
