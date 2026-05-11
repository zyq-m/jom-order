import { useKitchenStore } from "@/stores/kitchenStore"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import { Bell, CookingPot, CheckCircle2, Clock, ChevronDown } from "lucide-react"
import { useState } from "react"

const statusConfig = {
  new: { label: "Baru", icon: Bell, color: "text-amber-600", bg: "bg-amber-50 border-amber-200", dot: "bg-amber-500 animate-pulse" },
  preparing: { label: "Disiapkan", icon: CookingPot, color: "text-blue-600", bg: "bg-blue-50 border-blue-200", dot: "bg-blue-500" },
  done: { label: "Siap", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50 border-green-200", dot: "bg-green-500" },
}

const statuses = ["new", "preparing", "done"] as const

export default function KitchenDashboard() {
  const orders = useKitchenStore((s) => s.orders)
  const unreadCount = useKitchenStore((s) => s.unreadCount)
  const updateStatus = useKitchenStore((s) => s.updateStatus)
  const markRead = useKitchenStore((s) => s.markRead)
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  function handleStatus(id: string, status: "preparing" | "done") {
    updateStatus(id, status)
  }

  function toggleCollapse(id: string) {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const ordersByStatus = (status: string) => orders.filter((o) => o.status === status)

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <header className="sticky top-0 z-30 border-b bg-background px-4 h-12 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <CookingPot className="h-5 w-5 text-primary" />
          <h1 className="font-bold text-sm">Dapur</h1>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <ThemeToggle />
          <span className="hidden sm:inline ml-2">
            {orders.filter((o) => o.status !== "done").length} aktif
          </span>
          <span className="hidden sm:inline">
            {orders.length} jumlah
          </span>
          {unreadCount > 0 && (
            <button
              onClick={markRead}
              className="flex items-center gap-1.5 text-amber-600 font-medium"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">{unreadCount} baru</span>
              <span className="sm:hidden">{unreadCount}</span>
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 p-4 md:p-6">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">Tiada order buat masa ini</p>
            <p className="text-sm text-muted-foreground mt-1">Order akan muncul di sini secara langsung</p>
          </div>
        ) : (
          <>
            <div className="md:hidden space-y-4">
              {statuses.map((status) => {
                const group = ordersByStatus(status)
                const cfg = statusConfig[status]
                if (group.length === 0) return null
                return (
                  <section key={status}>
                    <div className="flex items-center gap-2 mb-2">
                      <cfg.icon className={`h-4 w-4 ${cfg.color}`} />
                      <h2 className="font-semibold text-sm">{cfg.label}</h2>
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {group.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {group.map((order) => (
                        <OrderCard
                          key={order.id}
                          order={order}
                          status={status}
                          onStatus={handleStatus}
                          collapsed={collapsed[order.id]}
                          onToggle={() => toggleCollapse(order.id)}
                        />
                      ))}
                    </div>
                  </section>
                )
              })}
            </div>

            <div className="hidden md:grid md:grid-cols-3 gap-4 h-full">
              {statuses.map((status) => {
                const group = ordersByStatus(status)
                const cfg = statusConfig[status]
                return (
                  <section key={status} className="flex flex-col">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b">
                      <cfg.icon className={`h-4 w-4 ${cfg.color}`} />
                      <h2 className="font-semibold text-sm">{cfg.label}</h2>
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground ml-auto">
                        {group.length}
                      </span>
                    </div>
                    <div className="flex-1 space-y-2 overflow-y-auto">
                      {group.length === 0 ? (
                        <p className="text-xs text-muted-foreground text-center py-8">Tiada</p>
                      ) : (
                        group.map((order) => (
                          <OrderCard
                            key={order.id}
                            order={order}
                            status={status}
                            onStatus={handleStatus}
                            collapsed={collapsed[order.id]}
                            onToggle={() => toggleCollapse(order.id)}
                          />
                        ))
                      )}
                    </div>
                  </section>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function OrderCard({
  order,
  status,
  onStatus,
  collapsed,
  onToggle,
}: {
  order: ReturnType<typeof useKitchenStore.getState>["orders"][number]
  status: string
  onStatus: (id: string, s: "preparing" | "done") => void
  collapsed: boolean | undefined
  onToggle: () => void
}) {
  return (
    <div className={`rounded-xl border bg-card shadow-sm ${status === "new" ? "ring-1 ring-amber-300" : ""}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 pt-3 pb-2 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center h-6 px-2 rounded-md bg-primary/10 text-xs font-bold text-primary">
            Meja {order.tableId}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {new Date(order.timestamp).toLocaleTimeString("ms-MY", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">
            {order.items.reduce((s, i) => s + i.quantity, 0)} item
          </span>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${collapsed ? "" : "rotate-180"}`}
          />
        </div>
      </button>

      {!collapsed && (
        <>
          <div className="px-4 pb-2 space-y-1">
            {order.items.map((item, i) => (
              <div key={i}>
                <p className="text-sm">
                  {item.quantity}x {item.name} <span className="text-muted-foreground">(RM{item.price})</span>
                </p>
                {item.notes && (
                  <p className="text-xs text-muted-foreground ml-3">note: {item.notes}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2 px-4 pb-3">
            {status === "new" && (
              <Button
                size="sm"
                className="flex-1 text-xs rounded-full"
                onClick={() => onStatus(order.id, "preparing")}
              >
                Start Preparing
              </Button>
            )}
            {status === "preparing" && (
              <Button
                size="sm"
                variant="secondary"
                className="flex-1 text-xs rounded-full"
                onClick={() => onStatus(order.id, "done")}
              >
                Done
              </Button>
            )}
            {status === "done" && (
              <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Siap
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
