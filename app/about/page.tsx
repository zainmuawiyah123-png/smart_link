"use client";

import { useState } from "react";

export default function AboutPage() {
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const ar = language === "ar";
  const sections = ar ? [
    { n: "01", title: "ما هو رابطك؟", body: "رابطك منصة تساعد أصحاب المتاجر والمشاريع والخدمات على إنشاء صفحة رقمية تجمع المنتجات والخدمات والروابط وطرق التواصل في مكان واحد." },
    { n: "02", title: "ماذا تستطيع أن تفعل؟", body: "أنشئ صفحة باسم تختاره، أضف نبذة عن نشاطك، اعرض منتجاتك بالصور والأسعار، أضف موقعك الإلكتروني وروابط التواصل، ثم شارك صفحتك مع عملائك." },
    { n: "03", title: "كيف تبدأ؟", body: "أنشئ حساباً ببريدك الإلكتروني وكلمة مرور، أكّد بريدك إذا طُلب منك ذلك، ثم أكمل بيانات صفحتك وأضف منتجاتك وانشرها عندما تصبح جاهزة." },
  ] : [
    { n: "01", title: "What is Your Link?", body: "Your Link helps shops, independent businesses and service providers create one digital page for their products, services, links and contact options." },
    { n: "02", title: "What can you do?", body: "Choose a page name, add a short business description, showcase products with photos and prices, add your website and social links, then share your page with customers." },
    { n: "03", title: "How do you get started?", body: "Create an account with your email and a password, verify your email if prompted, complete your page details, add products and publish when ready." },
  ];
  const faqs = ar ? [
    ["هل يجب أن أفتح الرابط مباشرة؟", "ليس ضرورياً. يمكنك قراءة هذه الصفحة والتأكد من عنوان الموقع أولاً. استخدم العنوان الرسمي المكتوب هنا، ولا تفتح روابط مختصرة أو روابط أرسلها حساب غير موثوق."],
    ["هل أحتاج إلى كلمة مرور حساباتي الاجتماعية؟", "لا تدخل كلمات مرور حساباتك على إنستغرام أو فيسبوك أو غيرها في رابطك. أضف روابط صفحاتك العامة فقط."],
    ["هل أشارك رمز التحقق أو كلمة المرور مع أحد؟", "لا. لا تشارك كلمة مرورك أو رمز التحقق الذي يصلك عبر البريد أو الهاتف مع أي شخص، حتى لو ادعى أنه من فريق الدعم."],
    ["هل أحتاج إلى الدفع حتى أتصفح المنصة؟", "يمكنك زيارة الصفحات العامة والتعرف على المنصة. إنشاء الصفحة يبدأ بفترة تجربة مجانية مدتها 7 أيام، ثم دولار أمريكي واحد شهرياً لكل صفحة. الدفع المتاح حالياً عبر CliQ يراجعه مدير المنصة."],
    ["كيف أتأكد أنني في الموقع الصحيح؟", "تحقق من ظهور العنوان smart-link-preview.onrender.com في شريط المتصفح، وتأكد من وجود HTTPS ورمز القفل. إذا ظهر عنوان مختلف أو طلبت منك رسالة غير متوقعة بيانات حساسة، توقف ولا تكمل."],
  ] : [
    ["Do I have to open a link immediately?", "No. Read this page and check the website address first. Use the official address shown here; avoid shortened links or links from accounts you do not trust."],
    ["Do I need to provide my social-media passwords?", "No. Do not enter your Instagram, Facebook or other social account passwords on Your Link. Add public profile links only."],
    ["Should I share a password or verification code?", "Never share your password or any email or phone verification code with anyone, even if they claim to be support."],
    ["Do I have to pay just to browse?", "You can visit public pages and learn about the platform. Creating a page starts with a 7-day free trial, then costs USD $1 per page per month. CliQ payments are currently reviewed by the platform manager."],
    ["How can I check that I am on the right website?", "Check that your browser address shows smart-link-preview.onrender.com and uses HTTPS. If the address is different or an unexpected message asks for sensitive information, stop."],
  ];
  return <main dir={ar ? "rtl" : "ltr"} lang={language} className="min-h-screen px-5 py-8 sm:px-7">
    <div className="mx-auto max-w-5xl">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white bg-white/90 px-5 py-4 shadow-lg">
        <a href="/" className="text-xl font-black text-[#302344]">رابطك <span className="text-violet-700">| Your Link</span></a>
        <div className="flex items-center gap-3">
          <button onClick={() => setLanguage(ar ? "en" : "ar")} className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-bold text-violet-800">{ar ? "English" : "العربية"}</button>
          <a href="/auth?mode=signup" className="rounded-full bg-violet-700 px-5 py-2.5 text-sm font-bold text-white">{ar ? "ابدأ مجاناً" : "Get started"}</a>
        </div>
      </header>

      <section className="mt-8 rounded-[2rem] border border-white/80 bg-gradient-to-br from-violet-800 via-purple-700 to-fuchsia-600 px-6 py-12 text-white shadow-xl sm:px-10">
        <p className="text-sm font-bold text-violet-100">{ar ? "تعرف علينا قبل أن تبدأ" : "Get to know us before you begin"}</p>
        <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">{ar ? "مرحباً بك في رابطك" : "Welcome to Your Link"}</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/90 sm:text-lg">{ar ? "مساحة رقمية بسيطة تساعدك على عرض نشاطك ومشاركة كل ما يخصه من خلال رابط واحد. خذ وقتك في التعرف علينا قبل التسجيل." : "A simple digital space to present your business and share everything about it through one link. Take your time to learn about us before signing up."}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="/auth?mode=signup" className="rounded-full bg-white px-6 py-3 font-bold text-violet-800">{ar ? "إنشاء صفحتي" : "Create my page"}</a>
          <a href="/discover" className="rounded-full border border-white/50 px-6 py-3 font-bold text-white">{ar ? "تصفح دليل المتاجر" : "Explore the directory"}</a>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {sections.map(item => <article key={item.n} className="rounded-3xl border border-[#eadcf5] bg-white/95 p-6 shadow-lg">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 font-black text-violet-800">{item.n}</span>
          <h2 className="mt-5 text-xl font-black text-[#302344]">{item.title}</h2>
          <p className="mt-3 leading-8 text-[#756681]">{item.body}</p>
        </article>)}
      </section>

      <section className="mt-8 rounded-3xl border border-[#eadcf5] bg-white/95 p-6 shadow-lg sm:p-8">
        <h2 className="text-2xl font-black text-[#302344]">{ar ? "الأمان والخصوصية أولاً" : "Safety and privacy first"}</h2>
        <p className="mt-3 leading-8 text-[#756681]">{ar ? "من حقك أن تتأكد قبل استخدام أي خدمة على الإنترنت. هذه إرشادات عملية تساعدك على حماية حسابك أثناء استخدام رابطك وأي موقع آخر." : "You have every right to check before using an online service. These practical steps help protect your account on Your Link and elsewhere."}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {(ar ? [
            "اكتب عنوان الموقع الرسمي بنفسك أو افتحه من هذه الصفحة.",
            "لا تشارك كلمة المرور أو رمز التحقق مع أي شخص.",
            "لا تدخل كلمات مرور حساباتك الاجتماعية في المنصة.",
            "تأكد من عنوان الموقع قبل إدخال بيانات تسجيل الدخول.",
          ] : [
            "Type the official website address yourself or open it from this page.",
            "Never share your password or verification code.",
            "Do not enter your social-media account passwords on the platform.",
            "Check the website address before entering sign-in details.",
          ]).map((tip, i) => <div key={i} className="flex gap-3 rounded-2xl bg-[#fff8f1] p-4 text-sm leading-7 text-[#51435f]"><span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-black text-violet-800">✓</span>{tip}</div>)}
        </div>
        <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">{ar ? "تنبيه: لا توجد خدمة على الإنترنت يمكن وصفها بأنها آمنة بنسبة 100%. احمِ بياناتك، وتواصل معنا عبر القنوات الرسمية إذا لاحظت شيئاً مريباً." : "Note: No online service can honestly be described as 100% risk-free. Protect your information and use official channels if anything seems suspicious."}</p>
      </section>

      <section className="mt-8 rounded-3xl border border-[#eadcf5] bg-white/95 p-6 shadow-lg sm:p-8">
        <h2 className="text-2xl font-black text-[#302344]">{ar ? "أسئلة شائعة" : "Frequently asked questions"}</h2>
        <div className="mt-5 divide-y divide-[#eadcf5]">
          {faqs.map(([question, answer]) => <details key={question} className="py-4">
            <summary className="cursor-pointer font-bold text-[#49365d]">{question}</summary>
            <p className="mt-3 leading-8 text-[#756681]">{answer}</p>
          </details>)}
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white/90 p-6 text-center shadow-lg">
        <p className="text-sm font-bold text-violet-700">{ar ? "العنوان الرسمي للمعاينة" : "Official preview address"}</p>
        <p dir="ltr" className="mt-2 break-all text-lg font-black text-[#302344]">https://smart-link-preview.onrender.com</p>
        <p className="mt-3 text-sm text-[#756681]">{ar ? "7 أيام تجربة مجانية، ثم 1 دولار أمريكي شهرياً لكل صفحة." : "7-day free trial, then USD $1 per page per month."}</p>
        <a href="/auth?mode=signup" className="mt-5 inline-flex rounded-full bg-gradient-to-r from-violet-700 via-fuchsia-600 to-orange-600 px-7 py-3.5 font-bold text-white shadow-lg">{ar ? "ابدأ إنشاء صفحتك" : "Create your page"}</a>
      </section>

      <footer className="py-8 text-center text-sm text-[#756681]">© {new Date().getFullYear()} رابطك | Your Link</footer>
    </div>
  </main>;
}
