import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  notes: string
  image?: string
}

interface OrderStore {
  tableId: string
  restaurantName: string
  restaurantTagline: string
  items: CartItem[]
  orderStatus: "idle" | "placed" | "preparing" | "ready"

  setTable: (tableId: string, restaurantName: string, restaurantTagline: string) => void
  addItem: (item: CartItem) => void
  updateItem: (id: string, changes: Partial<CartItem>) => void
  removeItem: (id: string) => void
  clearCart: () => void
  placeOrder: () => void
  setOrderStatus: (status: "preparing" | "ready") => void
  reset: () => void
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      tableId: "05",
      restaurantName: "JomCafe",
      restaurantTagline: "Fresh Coffee & Meals",
      items: [],
      orderStatus: "idle",

      setTable: (tableId, restaurantName, restaurantTagline) =>
        set({ tableId, restaurantName, restaurantTagline }),

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity, notes: item.notes }
                  : i
              ),
            }
          }
          return { items: [...state.items, item] }
        }),

      updateItem: (id, changes) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, ...changes } : i)),
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      clearCart: () => set({ items: [] }),

      placeOrder: () => set({ orderStatus: "placed" }),

      setOrderStatus: (status) => set({ orderStatus: status }),

      reset: () =>
        set({
          items: [],
          orderStatus: "idle",
        }),
    }),
    { name: "jomorder-cart" }
  )
)
