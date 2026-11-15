import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminPayments from "./admin-payments";
export const dynamic="force-dynamic";
export default async function AdminPage(){
 const supabase=await createClient();
 const {data:{user}}=await supabase.auth.getUser();
 if(!user) redirect("/auth?mode=login");
 if((user.email??"").toLowerCase()!=="muawiyahm@yahoo.com") redirect("/dashboard");
 const {data:payments,error}=await supabase.from("payment_submissions").select("id,user_id,amount,currency,transaction_reference,payer_name,note,receipt_path,status,submitted_at").order("submitted_at",{ascending:false});
 if(error) throw new Error("تعذر تحميل طلبات الدفع / Could not load payment requests.");
 const ids=[...new Set((payments??[]).map(p=>p.user_id))];
 const {data:users}=ids.length?await supabase.from("profiles").select("id,username,display_name").in("id",ids):{data:[]};
 const {data:subs}=ids.length?await supabase.from("subscriptions").select("user_id,status,trial_ends_at,paid_until").in("user_id",ids):{data:[]};
 const enriched=await Promise.all((payments??[]).map(async p=>{const {data}=p.receipt_path?await supabase.storage.from("cliq-receipts").createSignedUrl(p.receipt_path,3600):{data:null};return {...p,receipt_url:data?.signedUrl??null,profile:(users??[]).find(u=>u.id===p.user_id)??null,subscription:(subs??[]).find(s=>s.user_id===p.user_id)??null};}));
 return <AdminPayments payments={enriched}/>;
}
