import { useState } from "react"
import { useAdminStore, type TableInfo } from "@/stores/adminStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Download, X } from "lucide-react"

export default function QRTableGenerator() {
  const tables = useAdminStore((s) => s.tables)
  const addTable = useAdminStore((s) => s.addTable)
  const removeTable = useAdminStore((s) => s.removeTable)
  const [showAdd, setShowAdd] = useState(false)
  const [newLabel, setNewLabel] = useState("")

  function handleAdd() {
    if (!newLabel.trim()) return
    const table: TableInfo = {
      id: crypto.randomUUID(),
      label: newLabel.trim(),
    }
    addTable(table)
    setNewLabel("")
    setShowAdd(false)
  }

  function handleDownload(table: TableInfo) {
    const orderUrl = `${window.location.origin}/t/${table.id}`
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="520" viewBox="0 0 400 520">
      <rect width="400" height="520" fill="white" rx="16"/>
      <text x="200" y="60" text-anchor="middle" font-family="system-ui, sans-serif" font-size="24" font-weight="bold" fill="#111">JomOrder</text>
      <text x="200" y="90" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" fill="#666">${table.label}</text>
      <rect x="40" y="110" width="320" height="320" fill="#f5f5f5" rx="8"/>
      <text x="200" y="280" text-anchor="middle" font-family="monospace" font-size="14" fill="#999">QR placeholder</text>
      <text x="200" y="470" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#999">Scan untuk order</text>
      <text x="200" y="490" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#ccc">${orderUrl}</text>
    </svg>`
    const blob = new Blob([svg], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `jomorder-${table.label.replace(/\s+/g, "-")}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  function getTableUrl(table: TableInfo) {
    return `${window.location.origin}/t/${table.id}`
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">QR Meja</h2>
        <Button size="sm" onClick={() => setShowAdd(true)} className="rounded-full">
          <Plus className="h-4 w-4 mr-1" /> Add Table
        </Button>
      </div>

      {showAdd && (
        <Card className="mb-4">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm">Tambah Meja Baru</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <input
              type="text"
              placeholder="Meja 6"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border bg-background text-sm outline-none focus:border-primary transition-colors"
              autoFocus
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAdd} className="rounded-full">Tambah</Button>
              <Button size="sm" variant="outline" onClick={() => { setShowAdd(false); setNewLabel("") }} className="rounded-full">
                <X className="h-4 w-4 mr-1" /> Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tables.map((table) => (
          <Card key={table.id}>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm">{table.label}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2">
              <div className="flex items-center justify-center h-32 rounded-lg bg-muted">
                <div className="text-center">
                  <div className="text-3xl mb-1">📱</div>
                  <p className="text-[10px] text-muted-foreground break-all px-2">{getTableUrl(table)}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 text-xs rounded-full" onClick={() => handleDownload(table)}>
                  <Download className="h-3.5 w-3.5 mr-1" /> Download QR
                </Button>
                <button
                  onClick={() => removeTable(table.id)}
                  className="flex items-center justify-center w-9 h-9 rounded-lg border hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
