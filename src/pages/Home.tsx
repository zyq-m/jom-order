import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router"
import {
  QrCode,
  Smartphone,
  UtensilsCrossed,
  Bell,
  CheckCircle2,
  Menu,
  ShoppingCart,
  ChefHat,
  Globe,
  Wifi,
  Zap,
} from "lucide-react"

const steps = [
  {
    icon: QrCode,
    title: "Scan QR",
    desc: "Pelanggan scan QR code di meja guna phone sendiri.",
  },
  {
    icon: Smartphone,
    title: "Order",
    desc: "Lihat menu, tambah item, hantar terus ke dapur.",
  },
  {
    icon: UtensilsCrossed,
    title: "Sedia",
    desc: "Dapur terima order dan masak. Siap terus hidang.",
  },
]

const features = [
  {
    icon: Menu,
    title: "Menu Digital",
    desc: "Tambah, ubah, padam item menu bila-bila masa.",
  },
  {
    icon: ShoppingCart,
    title: "Order Sendiri",
    desc: "Pelanggan order terus dari phone — tak perlu tunggu waiter.",
  },
  {
    icon: ChefHat,
    title: "Skrin Dapur",
    desc: "Order muncul terus di skrin dapur dengan bunyi notifikasi.",
  },
  {
    icon: Globe,
    title: "Bahasa Melayu",
    desc: "Antaramuka penuh Bahasa Melayu. Senang untuk semua.",
  },
  {
    icon: Wifi,
    title: "Jimat Data",
    desc: "Berfungsi pada internet perlahan. Ringan dan cepat.",
  },
  {
    icon: Zap,
    title: "Masa Nyata",
    desc: "Order sampai ke dapur dalam beberapa saat.",
  },
]

const plans = [
  {
    name: "Percuma",
    price: "RM0",
    period: "selamanya",
    desc: "Sesuai untuk cuba dulu.",
    features: ["20 item menu", "5 meja QR", "Order asas", "Branding JomOrder"],
    cta: "Cuba Percuma",
    featured: false,
  },
  {
    name: "Basic",
    price: "RM29",
    period: "/bulan",
    desc: "Untuk kedai yang nak lebih.",
    features: [
      "Menu tanpa had",
      "Meja tanpa had",
      "Tiada branding JomOrder",
      "Laporan asas",
    ],
    cta: "Pilih Basic",
    featured: true,
  },
  {
    name: "Pro",
    price: "RM59",
    period: "/bulan",
    desc: "Untuk kedai yang nak power.",
    features: [
      "Semua Basic",
      "Integrasi WhatsApp",
      "Status order pelanggan",
      "Sokongan utama",
    ],
    cta: "Pilih Pro",
    featured: false,
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 h-14">
          <span className="text-lg font-bold tracking-tight">JomOrder</span>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#cara" className="hover:text-foreground transition-colors">
              Cara
            </a>
            <a
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#harga"
              className="hover:text-foreground transition-colors"
            >
              Harga
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button size="sm" className="rounded-full">Hubungi Kami</Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative pt-28 pb-20 px-4 overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium text-muted-foreground mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Untuk kedai makan & warung di Malaysia
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-4">
              Kurangkan waiter,
              <br />
              cepatkan order,
              <br />
              <span className="text-primary/70">tambah jualan.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Pelanggan scan QR, order dari phone sendiri. Order terus sampai ke
              dapur. Semudah itu.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" className="w-full sm:w-auto text-base px-8 rounded-full">
                Cuba Percuma
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base px-8 rounded-full"
                asChild
              >
                <Link to="/demo">Lihat Demo</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Tak perlukan kad kredit. Setup dalam 5 minit.
            </p>
          </div>
          {/* subtle grid bg */}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,transparent_0%,hsl(var(--primary)/0.03)_50%,transparent_100%)]" />
        </section>

        {/* How it works */}
        <section
          id="cara"
          className="py-20 px-4 border-t bg-muted/30"
        >
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                Macam mana nak guna?
              </h2>
              <p className="text-muted-foreground">
                Tiga langkah mudah. Tak perlu training.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((step, i) => (
                <Card key={step.title} className="relative">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {i + 1}
                      </span>
                      <step.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                    <CardDescription className="text-base">
                      {step.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 px-4 border-t">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                Kenapa JomOrder?
              </h2>
              <p className="text-muted-foreground">
                Dibina khas untuk kedai makan & warung Malaysia.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f) => (
                <Card key={f.title}>
                  <CardHeader>
                    <f.icon className="h-5 w-5 text-primary mb-1" />
                    <CardTitle className="text-base">{f.title}</CardTitle>
                    <CardDescription>{f.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="harga" className="py-20 px-4 border-t bg-muted/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                Harga
              </h2>
              <p className="text-muted-foreground">
                Lebih murah dari gaji waiter sehari.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {plans.map((p) => (
                <Card
                  key={p.name}
                  className={`relative flex flex-col ${p.featured ? "border-primary shadow-lg" : ""}`}
                >
                  {p.featured && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      Paling Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{p.name}</CardTitle>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-bold">{p.price}</span>
                      <span className="text-sm text-muted-foreground">
                        {p.period}
                      </span>
                    </div>
                    <CardDescription>{p.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col gap-4">
                    <ul className="space-y-2">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={p.featured ? "default" : "outline"}
                      className="mt-auto w-full rounded-full"
                    >
                      {p.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 border-t">
          <div className="container mx-auto max-w-2xl text-center">
            <Bell className="mx-auto h-10 w-10 text-primary mb-4" />
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Sedia untuk majukan kedai anda?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Cubaan percuma 1 bulan. Kami setupkan semuanya untuk anda.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" className="w-full sm:w-auto text-base px-8 rounded-full">
                Mulakan Percuma
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base px-8 rounded-full"
              >
                WhatsApp Kami
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 px-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <p className="font-semibold text-foreground mb-1">JomOrder</p>
          <p>Kurangkan waiter, cepatkan order, tambah jualan.</p>
          <p className="mt-2 text-xs">© 2026 JomOrder. Hak cipta terpelihara.</p>
        </div>
      </footer>
    </div>
  )
}
