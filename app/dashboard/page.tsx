import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardClient from "./dashboard-client";
export const dynamic = "force-dynamic";
export default async function DashboardPage() {
 const supabase=await createClient();
 const {data:{user}}=await supabase.auth.getUser();
 if(!user) redirect("/auth?mode=login");
 let {data:profile,error}=await supabase.from("profiles").select("username,display_name,bio,country,city,category,is_published,referral_code").eq("id",user.id).maybeSingle();
 if(error) throw new Error("تعذر تحميل بيانات الصفحة.");
 if(!profile){
  const username=`member_${user.id.replace(/-/g,"").slice(0,10)}`;
  const {data:createdProfile,error:createError}=await supabase.from("profiles").insert({id:user.id,username,is_published:false}).select("username,display_name,bio,country,city,category,is_published").single();
  if(createError||!createdProfile) throw new Error("تم تسجيل الدخول، لكن تعذر تجهيز صفحتك. يرجى المحاولة مرة أخرى.");
  profile=createdProfile;
 }
 const [{data:links},{data:products},{data:subscription},{data:payments},{count:referralCount}]=await Promise.all([
  supabase.from("links").select("id,title,url,is_active").eq("user_id",user.id).order("sort_order"),
  supabase.from("products").select("id,title,description,price,currency,whatsapp_no,image_url,is_active").eq("user_id",user.id).order("sort_order"),
  supabase.from("subscriptions").select("status,trial_ends_at,paid_until").eq("user_id",user.id).maybeSingle(),
  supabase.from("payment_submissions").select("id,transaction_reference,status,submitted_at").eq("user_id",user.id).order("submitted_at",{ascending:false}),
  supabase.from("referral_attributions").select("id",{count:"exact",head:true}).eq("referrer_user_id",user.id)
 ]);
 return <DashboardClient userId={user.id} email={user.email??""} profile={profile} links={links??[]} products={(products??[]).map(p=>({...p,price:Number(p.price)}))} subscription={subscription} payments={payments??[]} referralCount={referralCount??0}/>;
}
