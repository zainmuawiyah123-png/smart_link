const features = [
  { number: "01", title: "كل روابطك في مكان واحد / All your links in one place", description: "اجمع حساباتك ومواقعك وقنوات التواصل في صفحة واحدة سهلة المشاركة." },
  { number: "02", title: "اعرض منتجاتك وخدماتك / Showcase products & services", description: "أضف منتجاتك وأسعارك واجعل التواصل والطلب عبر واتساب مباشراً." },
  { number: "03", title: "صفحة تحمل هويتك / Your own digital identity", description: "خصص اسم صفحتك ونبذتك ومظهرها لتناسب نشاطك وعلامتك." },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f7fb] text-slate-800" dir="rtl">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <a href="/" className="text-2xl font-black tracking-tight">رابطك <span className="text-cyan-400">Link</span></a>
        <div className="flex items-center gap-3"><a href="/auth?mode=login" className="text-sm font-semibold text-slate-600 hover:text-cyan-300">تسجيل الدخول</a><a href="/auth?mode=signup" className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950">إنشاء حساب</a></div>
      </header>
      <section className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-16 md:grid-cols-[1.1fr_.9fr] md:items-center md:pt-24">
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold text-cyan-200">مساحتك الرقمية — ببساطة</span>
          <h1 className="mt-7 max-w-2xl text-4xl font-black leading-[1.35] tracking-tight sm:text-5xl md:text-6xl">كل ما تريد مشاركته، / Everything you want to share, <span className="text-cyan-300">في رابط واحد. / In one link.</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-9 text-slate-600">أنشئ صفحة تجمع روابطك ومنتجاتك وخدماتك، وشاركها بسهولة. / Create one page for your links, products and services, and share it anywhere.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="/auth?mode=signup" className="rounded-full bg-cyan-400 px-7 py-3.5 font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300">ابدأ الآن مجاناً / Start free</a>
            <a href="#features" className="rounded-full border border-slate-300 px-7 py-3.5 font-semibold transition hover:bg-white/5">اكتشف المميزات / Explore features</a>
          </div>
          <p className="mt-5 text-xs text-slate-500">روابطك • منتجاتك • خدماتك • تواصلك</p>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur">
            <div className="rounded-[1.5rem] bg-[#eaf1f8] p-6 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 text-2xl font-black text-slate-950">SL</div>
              <h2 className="mt-4 text-xl font-bold">صفحتك الشخصية / Your profile</h2>
              <p className="mt-1 text-sm text-slate-600">كل حضورك الرقمي في مكان واحد</p>
              <div className="mt-6 space-y-3">
                {["موقعي الإلكتروني / My website", "حساباتي الاجتماعية / Social profiles", "منتجاتي وخدماتي / Products & services"].map((item) => <div key={item} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold">{item}</div>)}
              </div>
              <div className="mt-5 rounded-xl bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-300">تواصل واطلب مباشرة عبر واتساب</div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 -z-10 h-32 w-32 rounded-full bg-blue-500/20 blur-2xl" />
        </div>
      </section>
      <section id="features" className="border-t border-slate-200 bg-[#eaf1f8] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl"><p className="text-sm font-bold text-cyan-300">مميزات Smart Link</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">حضورك الرقمي، بطريقة أوضح</h2><p className="mt-4 leading-8 text-slate-600">أدوات بسيطة تساعدك على تنظيم ما تقدمه ومشاركته مع جمهورك.</p></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map((feature) => <article key={feature.number} className="rounded-2xl border border-slate-200 bg-white p-7"><span className="text-sm font-black text-cyan-300">{feature.number}</span><h3 className="mt-5 text-xl font-bold">{feature.title}</h3><p className="mt-3 leading-7 text-slate-600">{feature.description}</p></article>)}
          </div>
        </div>
      </section>
      <footer className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Smart Link</span><span>روابطك وعملك في مساحة رقمية واحدة</span></footer>
    </main>
  );
}
