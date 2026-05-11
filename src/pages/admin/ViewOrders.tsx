import { useKitchenStore } from "@/stores/kitchenStore"
import { Button } from "@/components/ui/button"
import { CookingPot, CheckCircle2 } from "lucide-react"

export default function ViewOrders() {
  const orders = useKitchenStore((s) => s.orders)
  const updateStatus = useKitchenStore((s) => s.updateStatus)

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      {orders.length === 0 ? (
        <p className="text-sm text-muted-foreground">Belum ada order</p>
      ) : (
        <div className="space-y-2">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border bg-card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center h-6 px-2 rounded-md bg-primary/10 text-xs font-bold text-primary">
                    Meja {order.tableId}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(order.timestamp).toLocaleString("ms-MY", {
                      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                    })}
                  </span>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  order.status === "new" ? "bg-amber-100 text-amber-700" :
                  order.status === "preparing" ? "bg-blue-100 text-blue-700" :
                  "bg-green-100 text-green-700"
                }`}>
                  {order.status === "new" ? "Baru" : order.status === "preparing" ? "Disiapkan" : "Siap"}
                </span>
              </div>
              <div className="space-y-0.5 mb-3">
                {order.items.map((item, i) => (
                  <p key={i} className="text-sm">
                    {item.quantity}x {item.name}
                    {item.notes && <span className="text-muted-foreground"> — note: {item.notes}</span>}
                  </p>
                ))}
              </div>
              <div className="flex gap-2">
                {order.status === "new" && (
                  <Button size="sm" className="text-xs rounded-full" onClick={() => updateStatus(order.id, "preparing")}>
                    <CookingPot className="h-3.5 w-3.5 mr-1" /> Start Preparing
                  </Button>
                )}
                {order.status === "preparing" && (
                  <Button size="sm" variant="secondary" className="text-xs rounded-full" onClick={() => updateStatus(order.id, "done")}>
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Done
                  </Button>
                )}
                {order.status === "done" && (
                  <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Siap
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
