"use client";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Subscription={status:string;trial_ends_at:string;paid_until:string|null};
type Payment={id:string;transaction_reference:string;status:string;submitted_at:string};
export default function PaymentPanel({subscription,payments}:{subscription:Subscription|null;payments:Payment[]}) {
 const supabase=createClient();
 const [reference,setReference]=useState(""),[payer,setPayer]=useState(""),[note,setNote]=useState(""),[busy,setBusy]=useState(false),[message,setMessage]=useState(""),[error,setError]=useState("");
 const trialEnd=subscription?.trial_ends_at?new Date(subscription.trial_ends_at):null;
 const paidUntil=subscription?.paid_until?new Date(subscription.paid_until):null;
 const active=subscription?.status==="active"&&paidUntil&&paidUntil>new Date();
 const trial=subscription?.status==="trialing"&&trialEnd&&trialEnd>new Date();
 async function submit(e:FormEvent){e.preventDefault();setBusy(true);setError("");setMessage("");try{
  const {data:{user}}=await supabase.auth.getUser();if(!user)throw new Error("سجّل الدخول أولاً / Please sign in.");
  const {error}=await supabase.from("payment_submissions").insert({user_id:user.id,amount:1,currency:"USD",method:"cliq",recipient:"samarza",bank:"بنك الاتحاد",transaction_reference:reference.trim(),payer_name:payer.trim()||null,note:note.trim()||null});
  if(error)throw error;setReference("");setPayer("");setNote("");setMessage("تم إرسال طلبك للمراجعة. سيتم تفعيل الاشتراك بعد التحقق اليدوي من التحويل. / Submitted for manual review."); 
 }catch(e){setError(e instanceof Error?e.message:"تعذر إرسال الطلب.");}finally{setBusy(false);}}
 const date=(d:Date|null)=>d?d.toLocaleDateString("ar-JO",{year:"numeric",month:"long",day:"numeric"}):"—";
 return <section className="mt-6 rounded-2xl border border-teal-100 bg-white p-5 shadow-sm">
 <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-black">الاشتراك والدفع / Subscription</h2><p className="mt-1 text-sm text-slate-500">7 أيام تجربة مجانية، ثم 1 USD شهرياً لكل صفحة.</p></div><span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-bold text-teal-800">{active?"نشط / Active":trial?"تجربة مجانية / Free trial":subscription?.status==="pending_payment"?"بانتظار المراجعة / Pending review":"يتطلب اشتراكاً / Subscription required"}</span></div>
 <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">نهاية التجربة / Trial ends</p><p className="mt-1 font-bold">{date(trialEnd)}</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">مدفوع حتى / Paid through</p><p className="mt-1 font-bold">{date(paidUntil)}</p></div></div>
 <div className="mt-4 rounded-xl border border-slate-200 p-4"><h3 className="font-bold">التحويل عبر CliQ / Pay with CliQ</h3><p className="mt-2 text-sm text-slate-700">اسم المستفيد: <b dir="ltr">samarza</b></p><p className="text-sm text-slate-700">البنك: <b>بنك الاتحاد</b></p><p className="text-sm text-slate-700">المبلغ: <b>1 USD شهرياً</b></p><p className="mt-2 text-xs leading-6 text-slate-500">حوّل المبلغ عبر تطبيق البنك، ثم أدخل مرجع العملية أدناه. لا يتم التفعيل تلقائياً؛ يراجع المدير التحويل ويعتمد الاشتراك يدوياً.</p></div>
 <form onSubmit={submit} className="mt-4 grid gap-3"><label className="text-sm">رقم مرجع التحويل / Transfer reference<input required value={reference} onChange={e=>setReference(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3" maxLength={120}/></label><label className="text-sm">اسم المحوّل / Sender name (optional)<input value={payer} onChange={e=>setPayer(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3" maxLength={100}/></label><label className="text-sm">ملاحظة / Note (optional)<textarea value={note} onChange={e=>setNote(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3" rows={2} maxLength={300}/></label><button disabled={busy} className="rounded-xl bg-teal-700 px-5 py-3 font-bold text-white disabled:opacity-50">{busy?"جارٍ الإرسال...":"إرسال إثبات التحويل / Submit payment details"}</button></form>
 {message&&<p role="status" className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}{error&&<p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
 {payments.length>0&&<div className="mt-5"><h3 className="font-bold">طلبات الدفع / Payment requests</h3><div className="mt-2 space-y-2">{payments.map(p=><div key={p.id} className="flex flex-wrap justify-between gap-2 rounded-xl bg-slate-50 p-3 text-sm"><span>مرجع: {p.transaction_reference}</span><b>{p.status==="pending"?"قيد المراجعة / Pending":p.status==="approved"?"مقبول / Approved":"مرفوض / Rejected"}</b></div>)}</div></div>}
 </section>;
}
