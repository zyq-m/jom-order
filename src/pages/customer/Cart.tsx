import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useOrderStore } from "@/stores/orderStore"
import { useKitchenStore } from "@/stores/kitchenStore"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useNavigate } from "react-router"

export default function CartPage() {
  const tableId = useOrderStore((s) => s.tableId)
  const items = useOrderStore((s) => s.items)
  const removeItem = useOrderStore((s) => s.removeItem)
  const updateItem = useOrderStore((s) => s.updateItem)
  const placeOrder = useOrderStore((s) => s.placeOrder)
  const addKitchenOrder = useKitchenStore((s) => s.addOrder)
  const navigate = useNavigate()
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  function handlePlaceOrder() {
    addKitchenOrder({
      id: crypto.randomUUID(),
      tableId,
      items: items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        notes: i.notes,
        price: i.price,
      })),
      total,
      status: "new",
      timestamp: Date.now(),
    })
    placeOrder()
    navigate(`/t/${tableId}/success`)
  }

  return (
    <div className="flex flex-col flex-1">
      <h1 className="text-xl md:text-2xl font-bold mb-1">Your Order</h1>
      <p className="text-sm text-muted-foreground mb-5">Meja {tableId}</p>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 py-12 text-center">
          <p className="text-muted-foreground">Cart kosong</p>
          <Button variant="outline" className="mt-4 rounded-full" onClick={() => navigate(`/t/${tableId}/menu`)}>
            Lihat Menu
          </Button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col md:flex-row md:gap-8">
          <div className="flex-1 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 md:p-4 rounded-xl border bg-card">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm md:text-base">{item.name}</p>
                    <p className="text-sm md:text-base font-semibold">RM{item.price * item.quantity}</p>
                  </div>
                  <div className="mt-2 rounded-lg border border-dashed border-muted-foreground/20 bg-muted/30 p-2 focus-within:border-muted-foreground/40 focus-within:bg-muted/50 transition-colors">
                    <p className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider mb-1">Notes</p>
                    <Textarea
                      defaultValue={item.notes}
                      placeholder="e.g. no spicy, less sugar..."
                      onBlur={(e) => updateItem(item.id, { notes: e.target.value.trim() })}
                      className="min-h-0 h-14 resize-none text-xs border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/40"
                    />
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => {
                        if (item.quantity <= 1) {
                          removeItem(item.id)
                        } else {
                          updateItem(item.id, { quantity: item.quantity - 1 })
                        }
                      }}
                      className="flex items-center justify-center w-7 h-7 rounded-full border hover:bg-accent transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm font-medium tabular-nums w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateItem(item.id, { quantity: item.quantity + 1 })}
                      className="flex items-center justify-center w-7 h-7 rounded-full border hover:bg-accent transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="shrink-0 mt-1 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="md:w-72 shrink-0 mt-4 md:mt-0">
            <div className="border rounded-xl bg-card p-4 md:sticky md:top-0 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Jumlah</span>
                <span className="text-lg md:text-xl font-bold">RM{total}</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Cara Bayar</p>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-muted/50">
                  <span className="text-sm">Bayar di Kaunter</span>
                </div>
              </div>
              <Button onClick={handlePlaceOrder} size="lg" className="w-full text-base rounded-full">
                Place Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
