import { useKitchenStore } from "@/stores/kitchenStore"
import { useAdminStore } from "@/stores/adminStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, UtensilsCrossed, Table2, DollarSign } from "lucide-react"

export default function AdminDashboard() {
  const orders = useKitchenStore((s) => s.orders)
  const menuItems = useAdminStore((s) => s.menuItems)
  const tables = useAdminStore((s) => s.tables)

  const todayOrders = orders.length
  const activeOrders = orders.filter((o) => o.status !== "done").length
  const revenue = orders.filter((o) => o.status === "done").reduce((sum, o) => sum + o.total, 0)

  const stats = [
    { icon: ShoppingCart, label: "Order Hari Ini", value: todayOrders, sub: `${activeOrders} aktif` },
    { icon: UtensilsCrossed, label: "Item Menu", value: menuItems.length, sub: "dalam sistem" },
    { icon: Table2, label: "Meja", value: tables.length, sub: "QR sedia" },
    { icon: DollarSign, label: "Pendapatan", value: `RM${revenue}`, sub: "dari order siap" },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-medium text-muted-foreground">{s.label}</CardTitle>
                <s.icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent orders */}
      <div className="mt-6">
        <h3 className="font-semibold text-sm mb-3">Order Terkini</h3>
        {orders.length === 0 ? (
          <p className="text-sm text-muted-foreground">Belum ada order</p>
        ) : (
          <div className="space-y-2">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-lg border bg-card text-sm">
                <div>
                  <span className="font-medium">Meja {order.tableId}</span>
                  <span className="text-muted-foreground ml-2">
                    {order.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(order.timestamp).toLocaleTimeString("ms-MY", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
