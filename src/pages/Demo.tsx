import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import ThemeToggle from "@/components/theme-toggle"
import { UtensilsCrossed, Smartphone, ChefHat, Settings, ExternalLink } from "lucide-react"
import { Link } from "react-router"

const flows = [
  {
    title: "Customer",
    desc: "Pelanggan scan QR, lihat menu, dan order sendiri dari telefon.",
    items: ["Buka menu digital terus dari phone", "Tambah item dengan cepat", "Hantar order ke dapur", "Lihat status order"],
    link: "/t/demo/menu",
    icon: Smartphone,
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
    btn: "Buka Menu",
  },
  {
    title: "Dapur",
    desc: "Order pelanggan muncul terus di skrin dapur secara langsung.",
    items: ["Lihat order baru dengan notifikasi", "Terima dan mula menyediakan", "Tandakan order siap", "Urus aliran kerja dapur"],
    link: "/kitchen",
    icon: ChefHat,
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
    btn: "Buka Dapur",
  },
  {
    title: "Admin",
    desc: "Urus menu, pantau order, dan cetak QR meja dari panel admin.",
    items: ["Tambah & edit item menu", "Pantau order terkini", "Generate QR code meja", "Lihat dashboard ringkasan"],
    link: "/admin",
    icon: Settings,
    color: "text-green-600",
    bg: "bg-green-50 border-green-200",
    btn: "Buka Admin",
  },
]

export default function Demo() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 h-14">
          <span className="text-lg font-bold tracking-tight">JomOrder</span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="text-xs text-muted-foreground">Demo</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <section className="py-16 md:py-24 px-4 text-center">
          <div className="container mx-auto max-w-2xl">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mx-auto mb-6">
              <UtensilsCrossed className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Demo JomOrder
            </h1>
            <p className="text-muted-foreground md:text-lg max-w-md mx-auto mb-10">
              Cuba setiap bahagian sistem JomOrder — dari pelanggan order, ke dapur, 
              sehingga panel admin.
            </p>

            <div className="grid md:grid-cols-3 gap-5 text-left max-w-4xl mx-auto">
              {flows.map((flow) => (
                <Card key={flow.title} className={`flex flex-col ${flow.bg}`}>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-1">
                      <flow.icon className={`h-5 w-5 ${flow.color}`} />
                      <CardTitle className="text-base">{flow.title}</CardTitle>
                    </div>
                    <CardDescription className="text-sm">
                      {flow.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col gap-4">
                    <ul className="space-y-1.5">
                      {flow.items.map((item) => (
                        <li key={item} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5">&#10003;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Button asChild size="sm" className="mt-auto w-full rounded-full">
                      <Link to={flow.link}>
                        {flow.btn}
                        <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 border-t bg-muted/30 text-center">
          <div className="container mx-auto max-w-md">
            <h2 className="text-xl font-bold mb-2">Sedia untuk memulakan?</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Daftar sekarang dan setup kedai anda dalam masa 5 minit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="rounded-full text-base px-8">
                <Link to="/">Cuba Percuma</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full text-base px-8">
                <Link to="/t/demo/menu">Teruskan Demo</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 px-4 text-center text-xs text-muted-foreground">
        <p>JomOrder &mdash; Kurangkan waiter, cepatkan order, tambah jualan.</p>
      </footer>
    </div>
  )
}
