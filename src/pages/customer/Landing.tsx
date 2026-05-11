import { useOrderStore } from "@/stores/orderStore"
import { Button } from "@/components/ui/button"
import { UtensilsCrossed } from "lucide-react"
import { Link, useParams } from "react-router"
import { useEffect } from "react"

export default function CustomerLanding() {
  const tableId = useOrderStore((s) => s.tableId)
  const restaurantName = useOrderStore((s) => s.restaurantName)
  const restaurantTagline = useOrderStore((s) => s.restaurantTagline)
  const setTable = useOrderStore((s) => s.setTable)
  const params = useParams()

  useEffect(() => {
    if (params.tableId && params.tableId !== tableId) {
      setTable(params.tableId, "JomCafe", "Fresh Coffee & Meals")
    }
  }, [params.tableId, tableId, setTable])

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-12 text-center">
      <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-primary/10 mb-6">
        <UtensilsCrossed className="h-10 w-10 md:h-12 md:w-12 text-primary" />
      </div>
      <p className="text-3xl md:text-4xl mb-1">{restaurantName === "JomCafe" ? "☕" : "🍽️"}</p>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{restaurantName}</h1>
      <p className="text-muted-foreground mt-1 md:text-lg">{restaurantTagline}</p>
      <div className="flex items-center gap-2 mt-6 mb-8 px-4 py-2 rounded-full bg-muted text-sm md:text-base">
        <span className="text-muted-foreground">Meja</span>
        <span className="font-bold">{tableId}</span>
      </div>
      <p className="text-lg md:text-xl mb-8">Selamat datang! 👋</p>
      <Button asChild size="lg" className="w-full max-w-xs text-base rounded-full md:text-lg md:py-6">
        <Link to={`/t/${tableId}/menu`}>Lihat Menu</Link>
      </Button>
    </div>
  )
}
