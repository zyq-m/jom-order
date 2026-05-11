import { useOrderStore } from "@/stores/orderStore"
import { Button } from "@/components/ui/button"
import { CookingPot, Utensils } from "lucide-react"
import { Link } from "react-router"

export default function OrderStatus() {
  const tableId = useOrderStore((s) => s.tableId)
  const orderStatus = useOrderStore((s) => s.orderStatus)
  const setOrderStatus = useOrderStore((s) => s.setOrderStatus)
  const isPreparing = orderStatus === "placed" || orderStatus === "preparing"
  const isReady = orderStatus === "ready"

  function handleCheckStatus() {
    setOrderStatus(isPreparing ? "ready" : "preparing")
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-12 text-center">
      <div
        className={`flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-full mb-6 transition-colors ${
          isReady ? "bg-green-100" : "bg-amber-100"
        }`}
      >
        {isReady ? (
          <Utensils className="h-12 w-12 md:h-14 md:w-14 text-green-600" />
        ) : (
          <CookingPot className="h-12 w-12 md:h-14 md:w-14 text-amber-600" />
        )}
      </div>

      <h1 className="text-xl md:text-2xl font-bold">Order Status</h1>
      <div className="flex items-center gap-2 mt-3 px-4 py-2 rounded-full bg-muted text-sm md:text-base">
        <span className="text-muted-foreground">Meja</span>
        <span className="font-bold">{tableId}</span>
      </div>

      <div className="mt-8 flex items-center gap-4 md:gap-6">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
              isPreparing ? "bg-amber-500 animate-pulse" : "bg-muted"
            }`}
          />
          <span className={`text-sm md:text-base ${isPreparing ? "font-semibold" : "text-muted-foreground"}`}>
            Preparing
          </span>
        </div>
        <div className="w-8 md:w-12 h-px bg-border" />
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
              isReady ? "bg-green-500" : "bg-muted"
            }`}
          />
          <span className={`text-sm md:text-base ${isReady ? "font-semibold" : "text-muted-foreground"}`}>
            Ready
          </span>
        </div>
      </div>

      <p className="text-muted-foreground mt-8 max-w-xs md:text-lg">
        {isReady
          ? "Your order is ready. Please collect at counter."
          : "Your food is being prepared. Please wait..."}
      </p>

      <div className="mt-10 space-y-3 w-full max-w-xs">
        <Button onClick={handleCheckStatus} variant="outline" size="lg" className="w-full rounded-full md:text-lg md:py-6">
          {isReady ? "Set ke Preparing" : "Set ke Ready"}
        </Button>
        <Button asChild size="lg" className="w-full rounded-full md:text-lg md:py-6">
          <Link to={`/t/${tableId}/menu`}>Order Lagi</Link>
        </Button>
      </div>
    </div>
  )
}
