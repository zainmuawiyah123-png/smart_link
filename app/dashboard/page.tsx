import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

// دالة Server Action لتحديث الملف الشخصي والثيم
async function updateProfile(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const username = formData.get("username") as string;
  const theme = formData.get("theme") as string;
  const userId = "user_1";

  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      bio,
      username,
      theme,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath(`/${username}`);
}

// دالة Server Action لإضافة رابط جديد
async function addLink(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const userId = "user_1";

  if (!title || !url) return;

  await prisma.link.create({
    data: { title, url, userId },
  });

  revalidatePath("/dashboard");
  revalidatePath("/muawiyah");
}

// دالة Server Action لحذف رابط
async function deleteLink(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  
  await prisma.link.delete({
    where: { id },
  });

  revalidatePath("/dashboard");
  revalidatePath("/muawiyah");
}

// دالة Server Action لإضافة منتج جديد
async function addProduct(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const price = parseFloat(formData.get("price") as string) || 0;
  const whatsappNo = formData.get("whatsappNo") as string;
  const userId = "user_1";

  if (!title || !whatsappNo) return;

  await prisma.product.create({
    data: { title, price, whatsappNo, userId },
  });

  revalidatePath("/dashboard");
  revalidatePath("/muawiyah");
}

// دالة Server Action لحذف منتج
async function deleteProduct(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;

  await prisma.product.delete({
    where: { id },
  });

  revalidatePath("/dashboard");
  revalidatePath("/muawiyah");
}

export default async function DashboardPage() {
  const user = await prisma.user.findUnique({
    where: { id: "user_1" },
    include: {
      links: { orderBy: { createdAt: "desc" } },
      products: { orderBy: { createdAt: "desc" } },
    },
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-12" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* رأس الصفحة */}
        <div className="flex justify-between items-center border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold">لوحة التحكم الرئيسية</h1>
            <p className="text-gray-400 mt-1">إدارة منصتك الشخصية بسهولة تامة</p>
          </div>
          <a
            href={`/${user?.username || "muawiyah"}`}
            target="_blank"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            عرض صفحتي الشخصية 🔗
          </a>
        </div>

        {/* قسم تعديل الملف الشخصي والثيم */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-sky-400">تعديل الملف الشخصي والمظهر</h2>
          <form action={updateProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.name || ""}
                  required
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">اسم المستخدم (رابط الصفحة)</label>
                <input
                  type="text"
                  name="username"
                  defaultValue={user?.username || ""}
                  required
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">مظهر الصفحة (Theme)</label>
                <select
                  name="theme"
                  defaultValue={user?.theme || "dark"}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="dark">الوضع الداكن الأنيق (Dark)</option>
                  <option value="light">الوضع الفاتح الكلاسيكي (Light)</option>
                  <option value="ocean">أزرق المحيط المتدرج (Ocean)</option>
                  <option value="emerald">الأخضر الزمردي الفاخر (Emerald)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">النبذة التعريفية (Bio)</label>
              <textarea
                name="bio"
                defaultValue={user?.bio || ""}
                rows={2}
                placeholder="اكتب نبذة مختصرة عنك أو عن أعمالك..."
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-sky-500"
              />
            </div>
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 text-white font-medium px-6 py-2.5 rounded-lg transition"
            >
              حفظ التعديلات والمظهر
            </button>
          </form>
        </div>

        {/* قسم النماذج (إضافة روابط ومنتجات) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* إضافة رابط */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-indigo-400">إضافة رابط جديد</h2>
            <form action={addLink} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">عنوان الرابط</label>
                <input
                  type="text"
                  name="title"
                  placeholder="مثال: قناتي على تيليجرام"
                  required
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">الرابط (URL)</label>
                <input
                  type="url"
                  name="url"
                  placeholder="https://t.me/..."
                  required
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 font-medium py-2.5 rounded-lg transition"
              >
                حفظ وإضافة الرابط
              </button>
            </form>
          </div>

          {/* إضافة منتج */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-emerald-400">إضافة منتج أو خدمة</h2>
            <form action={addProduct} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">اسم المنتج</label>
                <input
                  type="text"
                  name="title"
                  placeholder="مثال: استشارة هندسية خاصة"
                  required
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">السعر ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    placeholder="25.00"
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">رقم واتساب للطلب</label>
                  <input
                    type="tel"
                    name="whatsappNo"
                    placeholder="9627XXXXXXXX"
                    required
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 font-medium py-2.5 rounded-lg transition"
              >
                حفظ وإضافة المنتج
              </button>
            </form>
          </div>

        </div>

        {/* عرض المحتوى الحالي مع أزرار الحذف */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-800">
          
          {/* قائمة الروابط */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">الروابط الحالية ({user?.links.length || 0})</h3>
            <div className="space-y-3">
              {user?.links.map((link: { id: string; title: string; url: string }) => (
                <div key={link.id} className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex justify-between items-center">
                  <div className="truncate ml-4">
                    <h4 className="font-medium text-white truncate">{link.title}</h4>
                    <a href={link.url} target="_blank" className="text-xs text-indigo-400 hover:underline truncate block max-w-[200px]">
                      {link.url}
                    </a>
                  </div>
                  <form action={deleteLink}>
                    <input type="hidden" name="id" value={link.id} />
                    <button
                      type="submit"
                      className="bg-red-950/60 hover:bg-red-900 text-red-300 text-xs px-3 py-1.5 rounded-lg border border-red-800/50 transition"
                    >
                      حذف
                    </button>
                  </form>
                </div>
              ))}
              {user?.links.length === 0 && <p className="text-gray-500 text-sm">لا توجد روابط مضافة حتى الآن.</p>}
            </div>
          </div>

          {/* قائمة المنتجات */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">المنتجات الحالية ({user?.products.length || 0})</h3>
            <div className="space-y-3">
              {user?.products.map((prod) => (
                <div key={prod.id} className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex justify-between items-center">
                  <div className="truncate ml-4">
                    <h4 className="font-medium text-white truncate">{prod.title}</h4>
                    <span className="text-emerald-400 font-bold text-sm">${prod.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={prod.whatsappNo ? `https://wa.me/${prod.whatsappNo.replace(/\\D/g, "")}` : "#"} target="_blank" rel="noopener noreferrer" className="text-xs bg-emerald-950 text-emerald-300 px-3 py-1.5 rounded-lg hover:bg-emerald-900 transition">
                      الرابط
                    </a>
                    <form action={deleteProduct}>
                      <input type="hidden" name="id" value={prod.id} />
                      <button
                        type="submit"
                        className="bg-red-950/60 hover:bg-red-900 text-red-300 text-xs px-3 py-1.5 rounded-lg border border-red-800/50 transition"
                      >
                        حذف
                      </button>
                    </form>
                  </div>
                </div>
              ))}
              {user?.products.length === 0 && <p className="text-gray-500 text-sm">لا توجد منتجات مضافة حتى الآن.</p>}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}