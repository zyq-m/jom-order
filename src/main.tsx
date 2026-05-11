import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "@/pages/Home"
import Demo from "@/pages/Demo"
import CustomerLayout from "@/components/customer/Layout"
import CustomerLanding from "@/pages/customer/Landing"
import MenuList from "@/pages/customer/MenuList"
import FoodDetails from "@/pages/customer/FoodDetails"
import CartPage from "@/pages/customer/Cart"
import OrderSuccess from "@/pages/customer/OrderSuccess"
import OrderStatus from "@/pages/customer/OrderStatus"
import KitchenDashboard from "@/pages/kitchen/KitchenDashboard"
import AdminLayout from "@/pages/admin/AdminLayout"
import AdminDashboard from "@/pages/admin/Dashboard"
import ManageMenu from "@/pages/admin/ManageMenu"
import ViewOrders from "@/pages/admin/ViewOrders"
import QRTableGenerator from "@/pages/admin/QRTableGenerator"
import "./index.css"

const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/demo", Component: Demo },
  { path: "/kitchen", Component: KitchenDashboard },
  {
    path: "/t/:tableId",
    element: <CustomerLayout />,
    children: [
      { index: true, Component: CustomerLanding },
      { path: "menu", Component: MenuList },
      { path: "menu/:itemId", Component: FoodDetails },
      { path: "cart", Component: CartPage },
      { path: "success", Component: OrderSuccess },
      { path: "status", Component: OrderStatus },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "menu", Component: ManageMenu },
      { path: "orders", Component: ViewOrders },
      { path: "qr", Component: QRTableGenerator },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
