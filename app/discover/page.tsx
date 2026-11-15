import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Profile = { id:string; username:string; display_name:string|null; bio:string|null; country:string|null; city:string|null; category:string|null };
type Product = { id:string; user_id:string; title:string; description:string|null; price:number|string; currency:string; whatsapp_no:string|null; image_url:string|null; category:string|null };

export default async function DiscoverPage({searchParams}:{searchParams:Promise<{q?:string;country?:string;city?:string;category?:string}>}) {
  const {q="",country="",city="",category=""}=await searchParams;
  const query=q.trim();
  const supabase=await createClient();
  const {data:profiles,error:profileError}=await supabase.from("profiles")
    .select("id,username,display_name,bio,country,city,category").eq("is_published",true);
  if(profileError) throw new Error("تعذر تحميل دليل المتاجر حالياً.");
  const owners=(profiles??[]) as Profile[];
  const ids=owners.map(p=>p.id);
  const {data:products,error:productError}=ids.length
    ? await supabase.from("products").select("id,user_id,title,description,price,currency,whatsapp_no,image_url,category").in("user_id",ids).eq("is_active",true).order("sort_order")
    : {data:[],error:null};
  if(productError) throw new Error("تعذر تحميل المنتجات حالياً.");
  const allProducts=(products??[]) as Product[];
  const filtered=owners.map(profile=>({...profile,products:allProducts.filter(p=>p.user_id===profile.id)}))
    .filter(profile=>(!query || [profile.display_name,profile.username,profile.bio,...profile.products.flatMap(p=>[p.title,p.description])].some(v=>(v??"").toLocaleLowerCase().includes(query.toLocaleLowerCase()))) && (!country || profile.country===country) && (!city || profile.city===city) && (!category || profile.category===category));
  return <main dir="rtl" className="min-h-screen bg-[#f4f7fb] px-4 py-10 text-slate-800 sm:px-6">
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <a href="/" className="text-2xl font-black">رابطك <span className="text-teal-700">| Your Link</span></a>
        <nav className="flex items-center gap-3 text-sm"><a href="/auth?mode=login" className="font-semibold text-slate-600">دخول | Sign in</a><a href="/auth?mode=signup" className="rounded-full bg-teal-700 px-4 py-2.5 font-bold text-white">أنشئ صفحتك | Create page</a></nav>
      </header>
      <section className="mt-12 rounded-3xl bg-gradient-to-l from-teal-800 to-slate-800 px-6 py-10 text-white sm:px-10">
        <p className="text-sm font-bold text-teal-100">دليل رابطك | YOUR LINK DIRECTORY</p>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">اكتشف المنتجات والخدمات</h1>
        <p className="mt-3 max-w-2xl leading-8 text-teal-50">تصفّح صفحات أصحاب المشاريع والمتاجر والخدمات المنشورة على رابطك، وتواصل معهم مباشرة.</p>
        <p dir="ltr" className="mt-2 text-sm text-teal-100">Discover published shops, products and services — and contact their owners directly.</p>
        <form action="/discover" className="mt-7 flex flex-col gap-2 sm:flex-row">
          <input name="q" defaultValue={query} placeholder="ابحث عن متجر أو منتج أو خدمة | Search" className="min-w-0 flex-1 rounded-xl border border-white/30 bg-white px-4 py-3 text-slate-800 outline-none placeholder:text-slate-400"/><input name="country" defaultValue={country} placeholder="الدولة | Country" className="min-w-0 rounded-xl border border-white/30 bg-white px-4 py-3 text-slate-800"/><input name="city" defaultValue={city} placeholder="المدينة | City" className="min-w-0 rounded-xl border border-white/30 bg-white px-4 py-3 text-slate-800"/><select name="category" defaultValue={category} className="min-w-0 rounded-xl border border-white/30 bg-white px-4 py-3 text-slate-800"><option value="">كل التصنيفات | All categories</option><option value="متجر وتسوق | Shopping">متجر وتسوق | Shopping</option><option value="طعام ومشروبات | Food">طعام ومشروبات | Food</option><option value="ملابس وأزياء | Fashion">ملابس وأزياء | Fashion</option><option value="خدمات مهنية | Professional services">خدمات مهنية | Professional services</option><option value="عقارات | Real estate">عقارات | Real estate</option><option value="صحة وجمال | Health & beauty">صحة وجمال | Health & beauty</option><option value="تعليم وتدريب | Education">تعليم وتدريب | Education</option><option value="تقنية وإلكترونيات | Technology">تقنية وإلكترونيات | Technology</option><option value="أخرى | Other">أخرى | Other</option></select>
          <button className="rounded-xl bg-white px-6 py-3 font-bold text-teal-800">بحث | Search</button>
        </form>
      </section>
      <div className="mt-8 flex items-center justify-between gap-3"><h2 className="text-xl font-black">الصفحات والمتاجر المنشورة | Published pages</h2><span className="text-sm text-slate-500">{filtered.length} نتيجة | results</span></div>
      {filtered.length===0 ? <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-10 text-center"><h3 className="font-bold">لا توجد نتائج مطابقة حالياً</h3><p className="mt-2 text-sm text-slate-500">جرّب كلمة بحث أخرى، أو كن أول من ينشر متجره على رابطك.</p><a href="/auth?mode=signup" className="mt-5 inline-flex rounded-full bg-teal-700 px-5 py-3 font-bold text-white">أنشئ صفحتك مجاناً</a></div> :
      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map(profile=><article key={profile.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-l from-teal-50 to-slate-100 p-5"><div className="flex items-center gap-3"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xl font-black text-white">{(profile.display_name||profile.username).charAt(0).toUpperCase()}</div><div className="min-w-0"><h3 className="truncate text-lg font-black">{profile.display_name||profile.username}</h3><p className="text-xs text-slate-500">@{profile.username}</p></div></div>{profile.bio&&<p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">{profile.bio}</p>}<p className="mt-2 text-xs font-semibold text-teal-800">{[profile.category,profile.city,profile.country].filter(Boolean).join(" · ")}</p></div>
        <div className="p-5"><p className="mb-3 text-sm font-bold text-slate-700">المنتجات والخدمات ({profile.products.length})</p>
          {profile.products.length===0?<p className="text-sm text-slate-400">لم تتم إضافة منتجات بعد</p>:<div className="space-y-2">{profile.products.slice(0,3).map(product=><div key={product.id} className="overflow-hidden rounded-xl bg-slate-50">{product.image_url&&<img src={product.image_url} alt={product.title} loading="lazy" className="h-36 w-full object-cover"/>}<div className="p-3"><div className="flex items-start justify-between gap-2"><span className="text-sm font-semibold">{product.title}</span><strong className="whitespace-nowrap text-sm text-teal-700">{Number(product.price).toFixed(2)} {product.currency}</strong></div>{product.description&&<p className="mt-1 line-clamp-2 text-xs text-slate-500">{product.description}</p>}</div></div>)}</div>}
          <a href={`/${profile.username}`} className="mt-4 block rounded-xl bg-teal-700 px-4 py-3 text-center text-sm font-bold text-white">زيارة الصفحة والتواصل | View page</a>
        </div>
      </article>)}</div>}
      <footer className="mt-14 border-t border-slate-200 py-6 text-center text-sm text-slate-500">هل لديك مشروع؟ اعرض منتجاتك وخدماتك مجاناً لمدة 7 أيام على رابطك. <a href="/auth?mode=signup" className="font-bold text-teal-700 underline">ابدأ الآن</a></footer>
    </div>
  </main>;
}
