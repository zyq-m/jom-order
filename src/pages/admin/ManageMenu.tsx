import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAdminStore, type MenuItem } from "@/stores/adminStore";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const categories = ["Makanan", "Minuman", "Dessert"];

const defaultForm = {
	name: "",
	price: "",
	category: "Makanan",
	image:
		"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
	desc: "",
};

export default function ManageMenu() {
	const menuItems = useAdminStore((s) => s.menuItems);
	const addMenuItem = useAdminStore((s) => s.addMenuItem);
	const updateMenuItem = useAdminStore((s) => s.updateMenuItem);
	const removeMenuItem = useAdminStore((s) => s.removeMenuItem);
	const [open, setOpen] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [form, setForm] = useState(defaultForm);

	function resetForm() {
		setForm(defaultForm);
	}

	function handleAdd() {
		if (!form.name || !form.price) return;
		addMenuItem({
			id: crypto.randomUUID(),
			name: form.name,
			price: Number(form.price),
			category: form.category,
			image: form.image,
			desc: form.desc,
		});
		setOpen(false);
		resetForm();
	}

	function handleUpdate(id: string) {
		if (!form.name || !form.price) return;
		updateMenuItem(id, {
			name: form.name,
			price: Number(form.price),
			category: form.category,
			image: form.image,
			desc: form.desc,
		});
		setOpen(false);
		setEditingId(null);
		resetForm();
	}

	function openAdd() {
		setEditingId(null);
		resetForm();
		setOpen(true);
	}

	function openEdit(item: MenuItem) {
		setEditingId(item.id);
		setForm({
			name: item.name,
			price: String(item.price),
			category: item.category,
			image: item.image,
			desc: item.desc,
		});
		setOpen(true);
	}

	return (
		<div>
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-bold">Menu</h2>
				<Dialog
					open={open}
					onOpenChange={(v) => {
						setOpen(v);
						if (!v) {
							setEditingId(null);
							resetForm();
						}
					}}
				>
					<DialogTrigger asChild>
						<Button size="sm" onClick={openAdd} className="rounded-full">
							<Plus className="h-4 w-4 mr-1" /> Add Item
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>
								{editingId ? "Edit Item" : "Tambah Item Baru"}
							</DialogTitle>
						</DialogHeader>
						<div className="space-y-3">
							<div className="grid grid-cols-2 gap-3">
								<div>
									<label className="text-xs text-muted-foreground mb-1 block">
										Nama
									</label>
									<input
										type="text"
										placeholder="Nasi Goreng"
										value={form.name}
										onChange={(e) => setForm({ ...form, name: e.target.value })}
										className="w-full h-9 px-3 rounded-lg border bg-background text-sm outline-none focus:border-primary transition-colors"
									/>
								</div>
								<div>
									<label className="text-xs text-muted-foreground mb-1 block">
										Harga (RM)
									</label>
									<input
										type="number"
										placeholder="8"
										value={form.price}
										onChange={(e) =>
											setForm({ ...form, price: e.target.value })
										}
										className="w-full h-9 px-3 rounded-lg border bg-background text-sm outline-none focus:border-primary transition-colors"
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-3">
								<div>
									<label className="text-xs text-muted-foreground mb-1 block">
										Kategori
									</label>
									<Select
										value={form.category}
										onValueChange={(v) => setForm({ ...form, category: v })}
									>
										<SelectTrigger className="h-9">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{categories.map((c) => (
												<SelectItem key={c} value={c}>
													{c}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div>
									<label className="text-xs text-muted-foreground mb-1 block">
										URL Gambar
									</label>
									<input
										type="text"
										placeholder="https://images.pexels.com/..."
										value={form.image}
										onChange={(e) =>
											setForm({ ...form, image: e.target.value })
										}
										className="w-full h-9 px-3 rounded-lg border bg-background text-sm outline-none focus:border-primary transition-colors"
									/>
								</div>
							</div>
							<div>
								<label className="text-xs text-muted-foreground mb-1 block">
									Penerangan
								</label>
								<input
									type="text"
									placeholder="Deskripsi ringkas"
									value={form.desc}
									onChange={(e) => setForm({ ...form, desc: e.target.value })}
									className="w-full h-9 px-3 rounded-lg border bg-background text-sm outline-none focus:border-primary transition-colors"
								/>
							</div>
							<div className="flex gap-2 pt-2">
								{editingId ? (
									<Button
										size="sm"
										onClick={() => handleUpdate(editingId)}
										className="flex-1 rounded-full"
									>
										Simpan
									</Button>
								) : (
									<Button size="sm" onClick={handleAdd} className="flex-1 rounded-full">
										<Plus className="h-4 w-4 mr-1" /> Tambah
									</Button>
								)}
								<Button
									size="sm"
									variant="outline"
									onClick={() => {
										setOpen(false);
										setEditingId(null);
										resetForm();
									}}
									className="flex-1 rounded-full"
								>
									Batal
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			{/* Menu list */}
			<div className="space-y-2">
				{menuItems.map((item) => (
					<div
						key={item.id}
						className="flex items-center gap-3 p-3 rounded-xl border bg-card"
					>
						<div className="w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
							<img
								src={item.image}
								alt={item.name}
								className="w-full h-full object-cover"
								loading="lazy"
							/>
						</div>
						<div className="flex-1 min-w-0">
							<p className="font-medium text-sm">{item.name}</p>
							<p className="text-xs text-muted-foreground">
								RM{item.price} &middot; {item.category}
							</p>
						</div>
						<div className="flex items-center gap-1">
							<button
								onClick={() => openEdit(item)}
								className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-accent transition-colors"
							>
								<Pencil className="h-4 w-4 text-muted-foreground" />
							</button>
							<button
								onClick={() => removeMenuItem(item.id)}
								className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-destructive/10 transition-colors"
							>
								<Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
