"use client";

import { useState } from "react";

export default function Home() {
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const ar = language === "ar";
  const copy = ar ? {
    discover:"اكتشف المتاجر", signIn:"تسجيل الدخول", start:"ابدأ مجاناً",
    eyebrow:"مساحتك الرقمية في رابط واحد",
    title:"كل ما تريد مشاركته،", accent:"في رابط واحد.",
    intro:"أنشئ صفحة تجمع موقعك الإلكتروني وروابطك ومنتجاتك وخدماتك، وشاركها بسهولة مع عملائك.",
    create:"أنشئ صفحتك مجاناً", explore:"اكتشف المميزات",
    preview:"صفحتك الرقمية", previewSub:"كل حضورك الرقمي في مكان واحد",
    website:"موقعي الإلكتروني", socials:"حساباتي وروابطي", products:"منتجاتي وخدماتي", contact:"تواصل بسهولة",
    why:"لماذا رابطك؟", heading:"حضورك الرقمي، بطريقة أوضح",
    features:[
      ["01","روابطك كلها في مكان واحد","اجمع موقعك الإلكتروني وحساباتك وروابطك في صفحة واحدة."],
      ["02","اعرض منتجاتك وخدماتك","اعرض ما تقدمه مع الصور والأسعار واجعل التواصل سهلاً."],
      ["03","صفحتك بهويتك","اختر اسم صفحتك وأضف نبذتك وشارك رابطك مع الجميع."]
    ],
    footer:"صفحتك الرقمية في رابط واحد"
  } : {
    discover:"Discover shops", signIn:"Sign in", start:"Get started",
    eyebrow:"Your digital space in one link",
    title:"Everything you want to share,", accent:"in one link.",
    intro:"Create one page for your website, social links, products and services — and share it easily with customers.",
    create:"Create your free page", explore:"Explore features",
    preview:"Your digital page", previewSub:"Your online presence in one place",
    website:"My website", socials:"My social links", products:"Products & services", contact:"Easy contact",
    why:"Why Your Link?", heading:"Your online presence, made simple",
    features:[
      ["01","All your links in one place","Bring your website, profiles and links together on one page."],
      ["02","Showcase products & services","Present what you offer with photos, prices and easy contact."],
      ["03","Your page, your identity","Choose your page name, add a bio and share your link."]
    ],
    footer:"Your digital page in one link"
  };
  return <main dir={ar ? "rtl" : "ltr"} lang={language} className="min-h-screen overflow-hidden bg-gradient-to-br from-cyan-100 via-sky-50 to-indigo-100 text-slate-800">
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-7">
      <a href="/" className="text-2xl font-black tracking-tight text-slate-900">رابطك <span className="text-teal-700">| Your Link</span></a>
      <nav className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={()=>setLanguage(ar?"en":"ar")} className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">{ar?"English":"العربية"}</button>
        <a href="/discover" className="text-sm font-semibold text-teal-800">{copy.discover}</a>
        <a href="/auth?mode=login" className="text-sm font-semibold text-slate-600">{copy.signIn}</a>
        <a href="/auth?mode=signup" className="rounded-full bg-teal-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-900/15 transition hover:-translate-y-0.5 hover:bg-teal-800">{copy.start}</a>
      </nav>
    </header>
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-24 pt-12 sm:px-7 md:grid-cols-2 md:pt-20">
      <div>
        <span className="inline-flex rounded-full border border-teal-200/80 bg-white/75 px-4 py-2 text-sm font-bold text-teal-800 shadow-sm">{copy.eyebrow}</span>
        <h1 className="mt-7 text-4xl font-black leading-[1.25] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">{copy.title}<span className="block text-teal-700">{copy.accent}</span></h1>
        <p className="mt-6 max-w-xl text-lg leading-9 text-slate-600">{copy.intro}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="/auth?mode=signup" className="rounded-full bg-teal-700 px-7 py-3.5 font-bold text-white shadow-xl shadow-teal-900/15 transition hover:-translate-y-0.5 hover:bg-teal-800">{copy.create}</a>
          <a href="#features" className="rounded-full border border-slate-200 bg-white/85 px-7 py-3.5 font-semibold text-slate-700 shadow-sm transition hover:bg-white">{copy.explore}</a>
        </div>
        <p className="mt-5 text-sm text-slate-500">{ar?"7 أيام تجربة مجانية · دولار واحد شهرياً بعد التجربة":"7-day free trial · $1 per month after the trial"}</p>
      </div>
      <div className="relative mx-auto w-full max-w-md">
        <div className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-teal-200/50 to-blue-200/50 blur-2xl"/>
        <div className="relative rounded-[2.2rem] border border-white/90 bg-white/85 p-4 shadow-2xl shadow-slate-400/25 backdrop-blur">
          <div className="rounded-[1.7rem] bg-gradient-to-br from-[#e5f6f2] via-[#f2f7ff] to-[#e9efff] p-7">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.7rem] bg-gradient-to-br from-teal-600 to-cyan-700 text-2xl font-black text-white shadow-lg shadow-teal-800/20">YL</div>
            <h2 className="mt-5 text-center text-xl font-black text-slate-900">{copy.preview}</h2>
            <p className="mt-2 text-center text-sm text-slate-500">{copy.previewSub}</p>
            <div className="mt-7 space-y-3">
              {[copy.website,copy.socials,copy.products].map((item,i)=><div key={item} className="flex items-center gap-3 rounded-2xl border border-white bg-white/90 px-4 py-4 text-sm font-bold text-slate-700 shadow-sm"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-700">{["↗","◎","▦"][i]}</span>{item}<span className="ms-auto text-slate-400">→</span></div>)}
            </div>
            <div className="mt-4 rounded-2xl bg-teal-700 px-4 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-teal-900/15">{copy.contact}</div>
          </div>
        </div>
      </div>
    </section>
    <section id="features" className="border-t border-white/80 bg-white/65 px-5 py-20 backdrop-blur sm:px-7">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-black text-teal-700">{copy.why}</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{copy.heading}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {copy.features.map(([number,title,description])=><article key={number} className="group rounded-3xl border border-slate-200/80 bg-white/90 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/30"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-sm font-black text-teal-800">{number}</span><h3 className="mt-6 text-lg font-black text-slate-900">{title}</h3><p className="mt-3 leading-8 text-slate-600">{description}</p></article>)}
        </div>
      </div>
    </section>
    <footer className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-7"><span>© {new Date().getFullYear()} رابطك | Your Link</span><span>{copy.footer}</span></footer>
  </main>;
}
