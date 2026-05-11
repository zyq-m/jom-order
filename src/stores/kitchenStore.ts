import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface KitchenOrderItem {
  name: string
  quantity: number
  notes: string
  price: number
}

export interface KitchenOrder {
  id: string
  tableId: string
  items: KitchenOrderItem[]
  total: number
  status: "new" | "preparing" | "done"
  timestamp: number
}

interface KitchenStore {
  orders: KitchenOrder[]
  unreadCount: number

  addOrder: (order: KitchenOrder) => void
  updateStatus: (id: string, status: "preparing" | "done") => void
  markRead: () => void
}

export const useKitchenStore = create<KitchenStore>()(
  persist(
    (set) => ({
      orders: [],
      unreadCount: 0,

      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
          unreadCount: state.unreadCount + 1,
        })),

      updateStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),

      markRead: () => set({ unreadCount: 0 }),
    }),
    { name: "jomorder-kitchen" }
  )
)
