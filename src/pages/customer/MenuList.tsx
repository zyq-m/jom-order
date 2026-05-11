import { Textarea } from "@/components/ui/textarea";
import { useOrderStore, type CartItem } from "@/stores/orderStore";
import { Minus, Plus, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const categories = [
	{ id: "Semua", label: "Semua" },
	{ id: "Makanan", label: "Makanan" },
	{ id: "Minuman", label: "Minuman" },
	{ id: "Dessert", label: "Dessert" },
];

const menuItems = [
	{
		id: "1",
		name: "Nasi Goreng",
		price: 8,
		category: "Makanan",
		image:
			"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
		desc: "Nasi goreng dengan ayam dan sayur-sayuran. Dimasak dengan api yang panas.",
	},
	{
		id: "2",
		name: "Nasi Ayam",
		price: 7,
		category: "Makanan",
		image:
			"https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
		desc: "Nasi ayam bersama sos istimewa dan sup.",
	},
	{
		id: "3",
		name: "Milo Ais",
		price: 4,
		category: "Minuman",
		image:
			"https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
		desc: "Milo sejuk yang menyegarkan.",
	},
	{
		id: "4",
		name: "Teh O Ais",
		price: 3,
		category: "Minuman",
		image:
			"https://images.pexels.com/photos/2109099/pexels-photo-2109099.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
		desc: "Teh O sejuk dengan gula batu.",
	},
	{
		id: "5",
		name: "Cendol",
		price: 5,
		category: "Dessert",
		image:
			"https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
		desc: "Cendol durian dengan santan segar.",
	},
	{
		id: "6",
		name: "Kuih Lapis",
		price: 3,
		category: "Dessert",
		image:
			"https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
		desc: "Kuih lapis tradisional 9 lapis.",
	},
];

export default function MenuList() {
	const tableId = useOrderStore((s) => s.tableId);
	const cartItems = useOrderStore((s) => s.items);
	const addItem = useOrderStore((s) => s.addItem);
	const updateItem = useOrderStore((s) => s.updateItem);
	const removeItem = useOrderStore((s) => s.removeItem);
	const navigate = useNavigate();

	const [search, setSearch] = useState("");
	const [activeCategory, setActiveCategory] = useState("Semua");
	const [selectedItem, setSelectedItem] = useState<
		(typeof menuItems)[number] | null
	>(null);
	const [modalQty, setModalQty] = useState(1);
	const [modalNotes, setModalNotes] = useState("");

	const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
	const cartTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

	const filtered = menuItems.filter((item) => {
		const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
		const matchCategory =
			activeCategory === "Semua" || item.category === activeCategory;
		return matchSearch && matchCategory;
	});

	function getItemQty(id: string) {
		return cartItems.find((i) => i.id === id)?.quantity ?? 0;
	}

	function handleQuickAdd(item: (typeof menuItems)[number]) {
		const existing = cartItems.find((i) => i.id === item.id);
		if (existing) {
			updateItem(item.id, { quantity: existing.quantity + 1 });
		} else {
			const cartItem: CartItem = {
				id: item.id,
				name: item.name,
				price: item.price,
				quantity: 1,
				notes: "",
			};
			addItem(cartItem);
		}
	}

	function handleQuickRemove(item: (typeof menuItems)[number]) {
		const existing = cartItems.find((i) => i.id === item.id);
		if (!existing) return;
		if (existing.quantity <= 1) {
			removeItem(item.id);
		} else {
			updateItem(item.id, { quantity: existing.quantity - 1 });
		}
	}

	function openDetail(item: (typeof menuItems)[number]) {
		const existing = cartItems.find((i) => i.id === item.id);
		setSelectedItem(item);
		setModalQty(existing?.quantity || 1);
		setModalNotes(existing?.notes || "");
	}

	function closeDetail() {
		setSelectedItem(null);
	}

	function handleModalAdd() {
		if (!selectedItem) return;
		const existing = cartItems.find((i) => i.id === selectedItem.id);
		const cartItem: CartItem = {
			id: selectedItem.id,
			name: selectedItem.name,
			price: selectedItem.price,
			quantity: modalQty,
			notes: modalNotes.trim(),
		};
		if (existing) {
			updateItem(selectedItem.id, {
				quantity: modalQty,
				notes: modalNotes.trim(),
			});
		} else {
			addItem(cartItem);
		}
		closeDetail();
	}

	return (
		<div
			className={`flex flex-col flex-1 ${cartCount > 0 ? "pb-16 md:pb-0" : ""}`}
		>
			{/* Search bar */}
			<div className="relative mb-3">
				<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
				<input
					type="text"
					placeholder="Cari makanan..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full h-10 md:h-11 pl-10 pr-4 rounded-xl border bg-background text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
				/>
			</div>

			{/* Category tabs */}
			<div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
				{categories.map((cat) => (
					<button
						key={cat.id}
						onClick={() => setActiveCategory(cat.id)}
						className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
							activeCategory === cat.id
								? "bg-primary text-primary-foreground shadow-sm"
								: "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
						}`}
					>
						{cat.label}
					</button>
				))}
			</div>

			{/* Menu grid */}
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
				{filtered.map((item) => {
					const qty = getItemQty(item.id);
					return (
						<div
							key={item.id}
							className="group rounded-xl border bg-card overflow-hidden flex flex-col hover:shadow-md transition-all"
						>
							<div
								onClick={() => openDetail(item)}
								className="relative aspect-[3/2] overflow-hidden bg-muted cursor-pointer"
							>
								<img
									src={item.image}
									alt={item.name}
									className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									loading="lazy"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
							</div>

							<div className="flex flex-col p-3">
								<button onClick={() => openDetail(item)} className="text-left">
									<p className="font-semibold text-sm leading-tight line-clamp-1">
										{item.name}
									</p>
									<p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
										{item.desc}
									</p>
								</button>

								<div className="flex items-center justify-between mt-auto pt-2">
									<span className="text-sm font-bold">RM{item.price}</span>

									{qty === 0 ? (
										<button
											onClick={() => handleQuickAdd(item)}
											className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
										>
											<Plus className="h-4 w-4" />
										</button>
									) : (
										<div className="flex items-center gap-1.5">
											<button
												onClick={() => handleQuickRemove(item)}
												className="flex items-center justify-center w-7 h-7 rounded-full border hover:bg-accent transition-colors"
											>
												<Minus className="h-3.5 w-3.5" />
											</button>
											<span className="text-sm font-semibold tabular-nums w-5 text-center">
												{qty}
											</span>
											<button
												onClick={() => handleQuickAdd(item)}
												className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
											>
												<Plus className="h-3.5 w-3.5" />
											</button>
										</div>
									)}
								</div>
							</div>
						</div>
					);
				})}
				{filtered.length === 0 && (
					<p className="text-center text-sm text-muted-foreground py-12 col-span-full">
						Tiada menu dijumpai
					</p>
				)}
			</div>

			{/* Cart floating bar - mobile */}
			{cartCount > 0 && (
				<div className="md:hidden fixed bottom-14 left-0 right-0 z-50 border-t bg-background px-4 py-3">
					<button
						onClick={() => navigate(`/t/${tableId}/cart`)}
						className="flex items-center justify-between w-full rounded-full bg-primary text-primary-foreground px-5 py-3 shadow-lg"
					>
						<div className="flex items-center gap-2">
							<ShoppingCart className="h-4 w-4" />
							<span className="text-sm font-medium">{cartCount} item</span>
						</div>
						<span className="text-sm font-bold">RM{cartTotal}</span>
					</button>
				</div>
			)}

			{/* Cart floating pill - desktop */}
			{cartCount > 0 && (
				<div className="hidden md:block fixed bottom-6 right-6 z-50">
					<button
						onClick={() => navigate(`/t/${tableId}/cart`)}
						className="flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-5 py-3 shadow-lg hover:bg-primary/90 transition-colors"
					>
						<ShoppingCart className="h-4 w-4" />
						<span className="text-sm font-medium">{cartCount} item</span>
						<span className="text-sm font-bold">RM{cartTotal}</span>
					</button>
				</div>
			)}

			{/* Detail modal - bottom sheet on all screens */}
			{selectedItem && (
				<div
					className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50"
					onClick={closeDetail}
				>
					<div
						className="relative w-full md:max-w-lg max-h-[85vh] md:max-h-[80vh] bg-background rounded-t-2xl md:rounded-2xl overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={closeDetail}
							className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm hover:bg-accent transition-colors"
						>
							<X className="h-4 w-4" />
						</button>

						<div className="aspect-[16/9] overflow-hidden bg-muted">
							<img
								src={selectedItem.image}
								alt={selectedItem.name}
								className="w-full h-full object-cover"
							/>
						</div>

						<div className="p-5">
							<div className="flex items-start justify-between">
								<div>
									<h2 className="text-xl font-bold">{selectedItem.name}</h2>
									<p className="text-lg font-semibold mt-0.5">
										RM{selectedItem.price}
									</p>
								</div>
							</div>
							<p className="text-sm text-muted-foreground mt-2 leading-relaxed">
								{selectedItem.desc}
							</p>

							<div className="mt-5">
								<p className="text-sm font-medium mb-2">Kuantiti</p>
								<div className="flex items-center gap-4">
									<button
										onClick={() => setModalQty(Math.max(1, modalQty - 1))}
										className="flex items-center justify-center w-10 h-10 rounded-full border hover:bg-accent transition-colors"
									>
										<Minus className="h-4 w-4" />
									</button>
									<span className="text-lg font-semibold w-8 text-center tabular-nums">
										{modalQty}
									</span>
									<button
										onClick={() => setModalQty(modalQty + 1)}
										className="flex items-center justify-center w-10 h-10 rounded-full border hover:bg-accent transition-colors"
									>
										<Plus className="h-4 w-4" />
									</button>
								</div>
							</div>

							<div className="mt-4">
								<p className="text-sm font-medium mb-2">Nota</p>
								<Textarea
									placeholder="cth: kurang pedas"
									value={modalNotes}
									onChange={(e) => setModalNotes(e.target.value)}
									className="min-h-0 h-20 resize-none rounded-xl"
								/>
							</div>

							<button
								onClick={handleModalAdd}
								className="flex items-center justify-center gap-2 w-full mt-6 rounded-full bg-primary text-primary-foreground px-6 py-3 text-base font-semibold hover:bg-primary/90 transition-colors shadow-sm"
							>
								<ShoppingCart className="h-4 w-4" />
								Add to Cart — RM{selectedItem.price * modalQty}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
