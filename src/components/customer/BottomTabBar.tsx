import { useOrderStore } from "@/stores/orderStore"
import { Home, Menu, ShoppingCart } from "lucide-react"
import { Link, useLocation } from "react-router"

export default function BottomTabBar() {
  const tableId = useOrderStore((s) => s.tableId)
  const items = useOrderStore((s) => s.items)
  const location = useLocation()
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0)

  const tabs = [
    { to: `/t/${tableId}`, icon: Home, label: "Home" },
    { to: `/t/${tableId}/menu`, icon: Menu, label: "Menu" },
    { to: `/t/${tableId}/cart`, icon: ShoppingCart, label: "Cart", badge: cartCount },
  ]

  const linkClass = (to: string) => {
    const isActive = location.pathname === to
    return isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground transition-colors"
  }

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around h-14 border-t bg-background">
        {tabs.map((tab) => (
          <Link
            key={tab.to}
            to={tab.to}
            className={`relative flex flex-col items-center justify-center gap-0.5 min-w-0 flex-1 h-full ${linkClass(tab.to)}`}
          >
            <div className="relative">
              <tab.icon className="h-5 w-5" />
              {tab.badge != null && tab.badge > 0 && (
                <span className="absolute -top-1.5 -right-2.5 flex items-center justify-center w-4 h-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {tab.badge > 9 ? "9+" : tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">{tab.label}</span>
          </Link>
        ))}
      </nav>

      <nav className="hidden md:flex fixed left-0 top-12 bottom-0 z-40 w-16 flex-col items-center gap-6 border-r bg-background pt-6">
        {tabs.map((tab) => (
          <Link
            key={tab.to}
            to={tab.to}
            className={`relative flex flex-col items-center gap-1 ${linkClass(tab.to)}`}
          >
            <div className="relative">
              <tab.icon className="h-5 w-5" />
              {tab.badge != null && tab.badge > 0 && (
                <span className="absolute -top-1.5 -right-2.5 flex items-center justify-center w-4 h-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {tab.badge > 9 ? "9+" : tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">{tab.label}</span>
          </Link>
        ))}
      </nav>
    </>
  )
}
