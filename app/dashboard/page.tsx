export default function DashboardPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07111f] px-6 text-white" dir="rtl">
      <section className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.05] p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl text-cyan-300">🔒</div>
        <h1 className="mt-6 text-2xl font-black">لوحة التحكم قيد التجهيز</h1>
        <p className="mt-4 leading-8 text-slate-300">نعمل على تجهيز تسجيل الدخول وحماية حساب كل مستخدم وربط بياناته بشكل مستقل. لن نفعّل إدارة الروابط والمنتجات قبل اكتمال هذه الحماية.</p>
        <a href="/" className="mt-7 inline-flex rounded-full bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300">العودة إلى الصفحة الرئيسية</a>
      </section>
    </main>
  );
}
