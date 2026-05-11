import { useState } from "react"
import { useOrderStore, type CartItem } from "@/stores/orderStore"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Minus, Plus, ArrowLeft, ShoppingCart } from "lucide-react"
import { useNavigate, useParams } from "react-router"

const itemData: Record<string, { id: string; name: string; price: number; image: string; category: string; desc: string }> = {
  "1": { id: "1", name: "Nasi Goreng", price: 8, image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", category: "Makanan", desc: "Nasi goreng dengan ayam dan sayur-sayuran. Dimasak dengan api yang panas." },
  "2": { id: "2", name: "Nasi Ayam", price: 7, image: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", category: "Makanan", desc: "Nasi ayam bersama sos istimewa dan sup." },
  "3": { id: "3", name: "Milo Ais", price: 4, image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", category: "Minuman", desc: "Milo sejuk yang menyegarkan." },
  "4": { id: "4", name: "Teh O Ais", price: 3, image: "https://images.pexels.com/photos/2109099/pexels-photo-2109099.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", category: "Minuman", desc: "Teh O sejuk dengan gula batu." },
  "5": { id: "5", name: "Cendol", price: 5, image: "https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", category: "Dessert", desc: "Cendol durian dengan santan segar." },
  "6": { id: "6", name: "Kuih Lapis", price: 3, image: "https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", category: "Dessert", desc: "Kuih lapis tradisional 9 lapis." },
}

export default function FoodDetails() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const tableId = useOrderStore((s) => s.tableId)
  const items = useOrderStore((s) => s.items)
  const addItem = useOrderStore((s) => s.addItem)
  const item = itemData[itemId ?? ""]
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState("")

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-12 text-center">
        <p className="text-muted-foreground">Item tidak dijumpai</p>
        <Button variant="outline" className="mt-4 rounded-full" onClick={() => navigate(-1)}>
          Kembali
        </Button>
      </div>
    )
  }

  const existing = items.find((i) => i.id === item.id)
  const inCartQty = existing ? existing.quantity : 0

  function handleAdd() {
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      notes,
    }
    addItem(cartItem)
    navigate(`/t/${tableId}/menu`)
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="mb-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row md:gap-8">
        <div className="h-48 md:h-auto md:w-1/2 md:min-h-80 rounded-2xl overflow-hidden bg-muted mb-5 md:mb-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col flex-1">
          <h1 className="text-2xl md:text-3xl font-bold">{item.name}</h1>
          <p className="text-xl md:text-2xl font-semibold mt-1">RM{item.price}</p>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{item.desc}</p>

          {inCartQty > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              {inCartQty} dalam cart
            </p>
          )}

          <div className="mt-6">
            <p className="text-sm font-medium mb-2">Kuantiti</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex items-center justify-center w-10 h-10 rounded-full border hover:bg-accent transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-lg font-semibold w-8 text-center tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex items-center justify-center w-10 h-10 rounded-full border hover:bg-accent transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium mb-2">Nota</p>
            <Textarea
              placeholder="cth: kurang pedas"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-0 h-20 resize-none"
            />
          </div>

          <Button onClick={handleAdd} size="lg" className="w-full mt-8 text-base rounded-full md:py-6 md:text-lg">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart — RM{(item.price * quantity).toFixed(0)}
          </Button>
        </div>
      </div>
    </div>
  )
}
