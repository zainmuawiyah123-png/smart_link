import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function PublicProfilePage({params}:{params:Promise<{username:string}>}) {
  const {username}=await params;
  const supabase=await createClient();
  const {data:profile}=await supabase.from("profiles")
    .select("id,username,display_name,bio,theme,is_published")
    .eq("username",username).eq("is_published",true).maybeSingle();
  if(!profile) notFound();
  const [{data:links},{data:products}]=await Promise.all([
    supabase.from("links").select("id,title,url").eq("user_id",profile.id).eq("is_active",true).order("sort_order"),
    supabase.from("products").select("id,title,description,price,currency,whatsapp_no,image_url").eq("user_id",profile.id).eq("is_active",true).order("sort_order")
  ]);
  return <main dir="rtl" className="min-h-screen bg-gradient-to-b from-[#f4f7fb] to-[#e8f1ef] px-4 py-14 text-slate-800"><div className="mx-auto max-w-xl">
    <header className="text-center"><div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 text-3xl font-black text-white">{(profile.display_name||username).charAt(0).toUpperCase()}</div><h1 className="mt-5 text-3xl font-black">{profile.display_name||username}</h1>{profile.bio&&<p className="mx-auto mt-3 max-w-md leading-8 text-slate-600">{profile.bio}</p>}</header>
    <section className="mt-9 space-y-3">{(links??[]).map(link=><a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-slate-200 bg-white p-4 text-center font-semibold transition hover:border-teal-300">{link.title}</a>)}</section>
    {(products??[]).length>0&&<section className="mt-10"><h2 className="mb-4 text-center text-xl font-bold">المنتجات والخدمات / Products & services</h2><div className="space-y-3">{(products??[]).map(product=><article key={product.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">{product.image_url&&<img src={product.image_url} alt={product.title} loading="lazy" className="h-56 w-full object-cover"/>}<div className="p-5"><div className="flex items-start justify-between gap-4"><div><h3 className="font-bold">{product.title}</h3>{product.description&&<p className="mt-1 text-sm text-slate-600">{product.description}</p>}</div><strong className="whitespace-nowrap text-teal-700">{Number(product.price).toFixed(2)} {product.currency}</strong></div>{product.whatsapp_no&&<a className="mt-4 inline-flex rounded-xl bg-emerald-400 px-5 py-2.5 font-bold text-white" href={`https://wa.me/${product.whatsapp_no.replace(/\\D/g,"")}`} target="_blank" rel="noopener noreferrer">اطلب عبر واتساب / Order on WhatsApp</a>}</div></article>)}</div></section>}
    <footer className="mt-14 text-center text-xs text-slate-500">صفحة منشأة عبر رابطك / صفحة منشأة عبر رابطك / Powered by Your Link</footer>
  </div></main>;
}
