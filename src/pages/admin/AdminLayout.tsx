import { NavLink, Outlet } from "react-router"
import { LayoutDashboard, UtensilsCrossed, ListOrdered, QrCode } from "lucide-react"

const nav = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/menu", icon: UtensilsCrossed, label: "Menu" },
  { to: "/admin/orders", icon: ListOrdered, label: "Orders" },
  { to: "/admin/qr", icon: QrCode, label: "QR Meja" },
]

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 h-12 border-b bg-background shrink-0">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-4 w-4 text-primary" />
          <h1 className="font-bold text-sm">Admin</h1>
        </div>
        <NavLink to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          Laman Utama
        </NavLink>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="hidden md:flex flex-col w-48 shrink-0 border-r bg-muted/30 pt-4">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-4 py-2.5 text-sm mx-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center border-t bg-background">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-0.5 flex-1 h-14 text-[10px] font-medium transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-16 md:pb-6">
          <div className="mx-auto w-full max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
