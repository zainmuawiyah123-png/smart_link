"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setReady(Boolean(data.session));
      if (!data.session) setError("رابط الاستعادة غير صالح أو انتهت صلاحيته. اطلب رابطاً جديداً. / Reset link is invalid or expired.");
    });
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

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
      setMessage("تم تحديث كلمة المرور. جارٍ فتح حسابك...");
      router.replace("/dashboard");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "تعذر تحديث كلمة المرور.");
    } finally { setBusy(false); }
  }

  return <main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-5 py-12 text-slate-800">
    <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl">
      <Link href="/" className="text-xl font-black">رابطك <span className="text-teal-700">Link</span></Link>
      <h1 className="mt-8 text-2xl font-black">تعيين كلمة مرور جديدة / New password</h1>
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
        <button disabled={busy || !ready} className="w-full rounded-xl bg-teal-600 px-5 py-3.5 font-bold text-white disabled:opacity-60">{busy ? "جارٍ الحفظ..." : "حفظ كلمة المرور / Save password"}</button>
      </form>
      {!ready && <p className="mt-4 text-xs text-slate-500">افتح رابط الاستعادة الذي وصلك بالبريد أولاً.</p>}
    </section>
  </main>;
}
