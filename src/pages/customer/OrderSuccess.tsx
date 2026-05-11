import { useOrderStore } from "@/stores/orderStore"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { Link } from "react-router"
import { useEffect } from "react"

export default function OrderSuccess() {
  const tableId = useOrderStore((s) => s.tableId)
  const orderStatus = useOrderStore((s) => s.orderStatus)

  useEffect(() => {
    if (orderStatus !== "placed") return
    const timer = setTimeout(() => {
      // Simulate kitchen starts preparing after a bit
    }, 3000)
    return () => clearTimeout(timer)
  }, [orderStatus])

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-12 text-center">
      <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-100 mb-6">
        <CheckCircle2 className="h-10 w-10 md:h-12 md:w-12 text-green-600" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold">Order Received!</h1>
      <div className="flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-muted text-sm md:text-base">
        <span className="text-muted-foreground">Meja</span>
        <span className="font-bold">{tableId}</span>
      </div>
      <p className="text-muted-foreground mt-6 max-w-xs md:text-lg">
        Your order has been sent to the kitchen.
      </p>
      <div className="mt-10 space-y-3 w-full max-w-xs">
        <Button asChild size="lg" className="w-full rounded-full md:text-lg md:py-6">
          <Link to={`/t/${tableId}/status`}>View Order Status</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full rounded-full md:text-lg md:py-6">
          <Link to={`/t/${tableId}/menu`}>Order Lagi</Link>
        </Button>
      </div>
    </div>
  )
}
