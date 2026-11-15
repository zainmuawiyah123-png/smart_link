import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardClient from "./dashboard-client";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth?mode=login");

  const { data: profile, error } = await supabase.from("profiles")
    .select("username,display_name,bio,is_published").eq("id", user.id).maybeSingle();
  if (error) throw new Error("تعذر تحميل بيانات الصفحة.");
  if (!profile) redirect("/auth?mode=signup");

  const [{ data: links }, { data: products }] = await Promise.all([
    supabase.from("links").select("id,title,url,is_active").eq("user_id", user.id).order("sort_order"),
    supabase.from("products").select("id,title,description,price,currency,whatsapp_no,is_active").eq("user_id", user.id).order("sort_order"),
  ]);

  return <DashboardClient userId={user.id} email={user.email ?? ""} profile={profile}
    links={links ?? []} products={(products ?? []).map(p => ({...p, price:Number(p.price)}))} />;
}
