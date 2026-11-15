import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

const THEMES: Record<string, { bg: string; card: string; text: string; subtext: string; button: string }> = {
  dark: {
    bg: "bg-gray-950",
    card: "bg-gray-900 border-gray-800 hover:border-indigo-500",
    text: "text-white",
    subtext: "text-gray-400",
    button: "bg-indigo-600 hover:bg-indigo-700 text-white",
  },
  light: {
    bg: "bg-slate-50",
    card: "bg-white border-slate-200 hover:border-slate-400 shadow-sm",
    text: "text-slate-900",
    subtext: "text-slate-600",
    button: "bg-slate-900 hover:bg-slate-800 text-white",
  },
  ocean: {
    bg: "bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950",
    card: "bg-white/10 backdrop-blur-md border-white/15 hover:bg-white/20",
    text: "text-white",
    subtext: "text-blue-200",
    button: "bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold",
  },
  emerald: {
    bg: "bg-gradient-to-br from-gray-950 via-emerald-950 to-teal-950",
    card: "bg-emerald-900/30 backdrop-blur-md border-emerald-700/40 hover:border-emerald-400",
    text: "text-white",
    subtext: "text-emerald-200",
    button: "bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold",
  },
};

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      links: {
        where: { isActive: true },
        orderBy: { order: "asc" },
      },
      products: {
        where: { isActive: true },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!user) {
    notFound();
  }

  const currentTheme = THEMES[user.theme] || THEMES.dark;

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} py-12 px-4 transition-colors duration-300`} dir="rtl">
      <div className="max-w-xl mx-auto space-y-8">
        
        <div className="text-center space-y-3">
          <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            {user.name ? user.name.charAt(0) : username.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold">{user.name || username}</h1>
          {user.bio && (
            <p className={`text-sm max-w-md mx-auto leading-relaxed ${currentTheme.subtext}`}>
              {user.bio}
            </p>
          )}
        </div>

        {user.links.length > 0 && (
          <div className="space-y-3">
            {user.links.map((link: { id: string; url: string; title: string }) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full p-4 rounded-2xl border text-center font-medium transition transform hover:-translate-y-0.5 ${currentTheme.card}`}
              >
                {link.title}
              </a>
            ))}
          </div>
        )}

        {user.products.length > 0 && (
          <div className="space-y-4 pt-4">
            <h2 className={`text-sm font-semibold uppercase tracking-wider text-center ${currentTheme.subtext}`}>
              المنتجات والخدمات
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {user.products.map((product: { id: string; title: string; price: number; url: string }) => (
                <div
                  key={product.id}
                  className={`p-5 rounded-2xl border flex items-center justify-between transition ${currentTheme.card}`}
                >
                  <div>
                    <h3 className="font-semibold text-lg">{product.title}</h3>
                    <p className={`text-sm font-bold mt-1 ${currentTheme.subtext}`}>
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-5 py-2.5 rounded-xl text-sm transition ${currentTheme.button}`}
                  >
                    اطلب الآن
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}