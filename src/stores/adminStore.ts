import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface MenuItem {
  id: string
  name: string
  price: number
  category: string
  image: string
  desc: string
}

export interface TableInfo {
  id: string
  label: string
}

interface AdminStore {
  menuItems: MenuItem[]
  tables: TableInfo[]

  addMenuItem: (item: MenuItem) => void
  updateMenuItem: (id: string, data: Partial<MenuItem>) => void
  removeMenuItem: (id: string) => void

  addTable: (table: TableInfo) => void
  removeTable: (id: string) => void
}

const defaultMenu: MenuItem[] = [
  { id: "1", name: "Nasi Goreng", price: 8, category: "Makanan", image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop", desc: "Nasi goreng dengan ayam dan sayur" },
  { id: "2", name: "Nasi Ayam", price: 7, category: "Makanan", image: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop", desc: "Nasi ayam bersama sos" },
  { id: "3", name: "Milo Ais", price: 4, category: "Minuman", image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop", desc: "Milo sejuk" },
  { id: "4", name: "Teh O Ais", price: 3, category: "Minuman", image: "https://images.pexels.com/photos/2109099/pexels-photo-2109099.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop", desc: "Teh O sejuk" },
  { id: "5", name: "Cendol", price: 5, category: "Dessert", image: "https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop", desc: "Cendol durian" },
  { id: "6", name: "Kuih Lapis", price: 3, category: "Dessert", image: "https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop", desc: "Kuih lapis tradisional" },
]

const defaultTables: TableInfo[] = [
  { id: "1", label: "Meja 1" },
  { id: "2", label: "Meja 2" },
  { id: "3", label: "Meja 3" },
  { id: "4", label: "Meja 4" },
  { id: "5", label: "Meja 5" },
]

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      menuItems: defaultMenu,
      tables: defaultTables,

      addMenuItem: (item) =>
        set((state) => ({ menuItems: [...state.menuItems, item] })),

      updateMenuItem: (id, data) =>
        set((state) => ({
          menuItems: state.menuItems.map((i) => (i.id === id ? { ...i, ...data } : i)),
        })),

      removeMenuItem: (id) =>
        set((state) => ({
          menuItems: state.menuItems.filter((i) => i.id !== id),
        })),

      addTable: (table) =>
        set((state) => ({ tables: [...state.tables, table] })),

      removeTable: (id) =>
        set((state) => ({ tables: state.tables.filter((t) => t.id !== id) })),
    }),
    { name: "jomorder-admin" }
  )
)
