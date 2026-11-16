"use client";

import { useState } from "react";

export default function Home() {
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const ar = language === "ar";
  const c = ar ? {
    discover:"اكتشف المشاريع", login:"تسجيل الدخول", signup:"أنشئ صفحتك",
    eyebrow:"مساحتك الرقمية… ببساطة",
    title:"مشروعك يستحق", accent:"رابطاً يجمع كل شيء.",
    intro:"أنشئ صفحة رقمية واحدة لمنتجاتك وخدماتك وروابط التواصل، وشاركها مع عملائك أينما كانوا.",
    start:"ابدأ تجربتك المجانية", see:"اكتشف كيف تعمل",
    trial:"7 أيام مجاناً", price:"$1", per:"شهرياً لكل صفحة بعد التجربة",
    priceNote:"لا تحتاج إلى متجر إلكتروني معقد لتبدأ بعرض مشروعك.",
    preview:"هذه صفحتك… كما يراها عملاؤك", previewSub:"اسم مشروعك • نبذة • منتجات • طرق التواصل",
    product1:"منتجاتك مع الصور والأسعار", product2:"روابط حساباتك وموقعك", product3:"تواصل مباشر معك",
    sectionLabel:"كل ما تحتاجه في مكان واحد", sectionTitle:"من أول زيارة إلى أول طلب",
    features:[
      ["▧","اعرض منتجاتك وخدماتك","أضف الصور والأسماء والأسعار والأوصاف، وعدّلها من هاتفك متى شئت."],
      ["↗","اجمع روابطك","ضع موقعك الإلكتروني وحسابات التواصل وروابطك المهمة في صفحة واحدة."],
      ["⌁","سهّل التواصل والطلبات","دع العميل يصل إليك عبر وسيلة التواصل التي تضيفها إلى صفحتك."],
      ["◎","اكتشف مشاريع أخرى","اعرض صفحتك ومنتجاتك في دليل الاكتشاف ليسهل على الناس العثور عليك."]
    ],
    howLabel:"البداية سهلة", howTitle:"ثلاث خطوات فقط",
    steps:[
      ["01","أنشئ حسابك","سجّل بالبريد الإلكتروني وأكّد حسابك."],
      ["02","جهّز صفحتك","أضف اسم مشروعك وصوره ومنتجاتك وروابطك."],
      ["03","انشر رابطك","شارك صفحتك على واتساب وفيسبوك وإنستغرام."]
    ],
    priceTitle:"سعر بسيط وواضح", priceDesc:"كل ما تحتاجه لعرض مشروعك في صفحة واحدة.",
    included:["7 أيام تجربة مجانية","منتجات وخدمات متعددة","صور وأسعار ووصف للمنتجات","روابط الموقع وحسابات التواصل","صفحة عربية وإنجليزية","الظهور في دليل الاكتشاف وفق بيانات صفحتك"],
    ctaTitle:"اجعل مشروعك أسهل في الوصول",
    ctaDesc:"ابدأ بإنشاء صفحتك الرقمية وشارك رابطاً واحداً مع عملائك.",
    faqTitle:"أسئلة شائعة",
    faqs:[
      ["هل أحتاج إلى خبرة تقنية؟","لا. أنشئ حسابك وأضف بياناتك ومنتجاتك من لوحة التحكم."],
      ["هل أستطيع إضافة صوري وأسعاري؟","نعم، يمكنك إضافة صور المنتجات وأسعارها وتعديل بياناتها من هاتفك."],
      ["كم تبلغ تكلفة الاستخدام؟","تبدأ بتجربة مجانية لمدة 7 أيام، ثم دولار واحد شهرياً لكل صفحة."],
      ["هل رابطك يستقبل الدفع من العملاء؟","رابطك يعرض منتجاتك ويسهّل التواصل والطلبات؛ الدفع يتم بالطريقة التي تتفق عليها مباشرة مع العميل."]
    ],
    footer:"صفحتك الرقمية في رابط واحد."
  } : {
    discover:"Discover projects", login:"Sign in", signup:"Create your page",
    eyebrow:"Your digital space, made simple",
    title:"Your business deserves", accent:"one link for everything.",
    intro:"Create one digital page for your products, services and contact links — then share it with customers everywhere.",
    start:"Start your free trial", see:"See how it works",
    trial:"7 days free", price:"$1", per:"per page / month after trial",
    priceNote:"You don't need a complicated online store to start showcasing your business.",
    preview:"Your page, as customers see it", previewSub:"Business name • About • Products • Contact",
    product1:"Products with photos and prices", product2:"Your website and social links", product3:"Direct contact with you",
    sectionLabel:"Everything in one place", sectionTitle:"From first visit to first enquiry",
    features:[
      ["▧","Show products & services","Add photos, names, prices and descriptions, and update them from your phone."],
      ["↗","Bring your links together","Add your website, social profiles and important links to one page."],
      ["⌁","Make contact easy","Let customers reach you through the contact method you add to your page."],
      ["◎","Help people discover you","List your page and products in the discovery directory so people can find you."]
    ],
    howLabel:"Easy to get started", howTitle:"Just three steps",
    steps:[
      ["01","Create your account","Sign up with your email and confirm your account."],
      ["02","Build your page","Add your business name, photos, products and links."],
      ["03","Share your link","Share your page on WhatsApp, Facebook and Instagram."]
    ],
    priceTitle:"Simple, transparent pricing", priceDesc:"Everything you need to present your business on one page.",
    included:["7-day free trial","Multiple products and services","Product photos, prices and descriptions","Website and social links","Arabic and English page","Discovery directory listing based on your page details"],
    ctaTitle:"Make your business easier to find",
    ctaDesc:"Create your digital page and share one link with your customers.",
    faqTitle:"Frequently asked questions",
    faqs:[
      ["Do I need technical skills?","No. Create an account and add your details and products from your dashboard."],
      ["Can I add photos and prices?","Yes. Add product photos and prices, and update your details from your phone."],
      ["How much does it cost?","Start with a 7-day free trial, then pay $1 per page each month."],
      ["Does Your Link process customer payments?","Your Link showcases products and helps customers contact you. Payment is arranged directly between you and the customer."]
    ],
    footer:"Your digital page in one link."
  };
  return <main dir={ar ? "rtl" : "ltr"} lang={language} className="landing-page min-h-screen overflow-hidden text-slate-800">
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-7">
      <a href="/" className="text-2xl font-black tracking-tight text-slate-900">رابطك <span className="text-teal-700">| Your Link</span></a>
      <nav className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={()=>setLanguage(ar?"en":"ar")} className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">{ar?"English":"العربية"}</button>
        <a href="/discover" className="text-sm font-semibold text-teal-800">{c.discover}</a>
        <a href="/auth?mode=login" className="text-sm font-semibold text-slate-600">{c.login}</a>
        <a href="/auth?mode=signup" className="rounded-full bg-teal-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg">{c.signup}</a>
      </nav>
    </header>

    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-12 sm:px-7 md:grid-cols-2 md:pt-20">
      <div>
        <span className="inline-flex rounded-full border border-teal-200 bg-white/75 px-4 py-2 text-sm font-bold text-teal-800 shadow-sm">{c.eyebrow}</span>
        <h1 className="mt-7 text-4xl font-black leading-[1.25] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">{c.title}<span className="block text-teal-700">{c.accent}</span></h1>
        <p className="mt-6 max-w-xl text-lg leading-9 text-slate-600">{c.intro}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="/auth?mode=signup" className="rounded-full bg-teal-700 px-7 py-3.5 font-bold text-white shadow-xl">{c.start}</a>
          <a href="#how" className="rounded-full border border-slate-200 bg-white/85 px-7 py-3.5 font-semibold text-slate-700">{c.see}</a>
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-600">
          <span className="rounded-full bg-white/90 px-4 py-2 shadow-sm">✓ {c.trial}</span>
          <span>{c.price} {c.per}</span>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-md">
        <div className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-teal-200/50 to-blue-200/50 blur-2xl"/>
        <div className="relative rounded-[2.2rem] border border-white/90 bg-white/90 p-4 shadow-2xl">
          <div className="rounded-[1.7rem] bg-gradient-to-br from-[#e5f6f2] via-[#f2f7ff] to-[#e9efff] p-6 sm:p-7">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.7rem] bg-gradient-to-br from-teal-600 to-cyan-700 text-2xl font-black text-white shadow-lg">YL</div>
            <h2 className="mt-5 text-center text-xl font-black text-slate-900">{c.preview}</h2>
            <p className="mt-2 text-center text-sm text-slate-500">{c.previewSub}</p>
            <div className="mt-7 space-y-3">
              {[c.product1,c.product2,c.product3].map((item,i)=><div key={item} className="flex items-center gap-3 rounded-2xl border border-white bg-white/95 px-4 py-4 text-sm font-bold text-slate-700 shadow-sm"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-700">{["▧","↗","⌁"][i]}</span><span>{item}</span><span className="ms-auto text-slate-400">←</span></div>)}
            </div>
            <div className="mt-4 rounded-2xl bg-teal-700 px-4 py-3.5 text-center text-sm font-bold text-white shadow-lg">{ar?"تواصل مع المشروع":"Contact the business"}</div>
          </div>
        </div>
      </div>
    </section>

    <section className="border-y border-white/80 bg-white/65 px-5 py-16 backdrop-blur sm:px-7">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-black text-teal-700">{c.sectionLabel}</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{c.sectionTitle}</h2>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.features.map(([icon,title,description])=><article key={title} className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-2xl font-black text-teal-800">{icon}</span><h3 className="mt-5 text-lg font-black text-slate-900">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{description}</p></article>)}
        </div>
      </div>
    </section>

    <section id="how" className="mx-auto max-w-6xl px-5 py-20 sm:px-7">
      <p className="text-sm font-black text-teal-700">{c.howLabel}</p>
      <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">{c.howTitle}</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {c.steps.map(([number,title,description])=><article key={number} className="rounded-3xl border border-white bg-white/80 p-7 shadow-sm"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-300 text-lg font-black text-slate-900">{number}</span><h3 className="mt-6 text-xl font-black text-slate-900">{title}</h3><p className="mt-3 leading-8 text-slate-600">{description}</p></article>)}
      </div>
    </section>

    <section className="px-5 pb-20 sm:px-7">
      <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-[2rem] border border-white bg-white/90 p-7 shadow-xl sm:p-10 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-sm font-black text-teal-700">{c.priceTitle}</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">{c.price} <span className="text-lg font-bold text-slate-600">{c.per}</span></h2>
          <p className="mt-3 leading-8 text-slate-600">{c.priceDesc}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {c.included.map(item=><li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-700"><span className="font-black text-teal-700">✓</span><span>{item}</span></li>)}
          </ul>
        </div>
        <div className="min-w-[220px] rounded-3xl bg-gradient-to-br from-[#e8f6f1] to-[#f0e8ff] p-7 text-center">
          <p className="text-sm font-bold text-slate-600">{c.trial}</p>
          <div className="mt-3 text-6xl font-black tracking-tight text-slate-900">{c.price}</div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{c.per}</p>
          <a href="/auth?mode=signup" className="mt-6 inline-flex w-full justify-center rounded-full bg-teal-700 px-6 py-3.5 font-bold text-white shadow-lg">{c.start}</a>
        </div>
      </div>
      <p className="mx-auto mt-4 max-w-6xl text-center text-xs leading-6 text-slate-500">{c.priceNote}</p>
    </section>

    <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-7">
      <div className="rounded-[2rem] bg-gradient-to-br from-teal-800 via-teal-700 to-cyan-800 px-7 py-12 text-center text-white shadow-2xl sm:px-12">
        <h2 className="text-3xl font-black sm:text-4xl">{c.ctaTitle}</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-white/85">{c.ctaDesc}</p>
        <a href="/auth?mode=signup" className="mt-7 inline-flex rounded-full bg-white px-8 py-3.5 font-black text-teal-800 shadow-lg">{c.start}</a>
      </div>
    </section>

    <section className="border-t border-white/80 bg-white/60 px-5 py-16 sm:px-7">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-black text-slate-950">{c.faqTitle}</h2>
        <div className="mt-8 grid gap-4">
          {c.faqs.map(([q,a])=><article key={q} className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm"><h3 className="font-black text-slate-900">{q}</h3><p className="mt-2 leading-7 text-slate-600">{a}</p></article>)}
        </div>
      </div>
    </section>
    <footer className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-7"><span>© {new Date().getFullYear()} رابطك | Your Link</span><span>{c.footer}</span><a href="/about" className="font-semibold text-teal-800">{ar?"عن المنصة والأمان":"About & safety"}</a></footer>

    <a href={`https://wa.me/962795177640?text=${encodeURIComponent(ar ? "مرحباً، أود الاستفسار عن منصة رابطك." : "Hello, I would like to know more about Your Link.")}`} target="_blank" rel="noopener noreferrer" aria-label={ar ? "تواصل معنا عبر واتساب" : "Contact us on WhatsApp"} className="fixed bottom-5 start-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-black text-white shadow-xl ring-4 ring-white/80 transition hover:scale-105">
      <span className="text-xl" aria-hidden="true">◉</span><span>{ar ? "تواصل معنا عبر واتساب" : "Chat with us on WhatsApp"}</span>
    </a>

  </main>;
}
