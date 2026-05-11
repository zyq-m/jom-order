import { useOrderStore } from "@/stores/orderStore";
import ThemeToggle from "@/components/theme-toggle";
import { Coffee } from "lucide-react";

export default function TopBar() {
	const tableId = useOrderStore((s) => s.tableId);
	const restaurantName = useOrderStore((s) => s.restaurantName);
	const restaurantTagline = useOrderStore((s) => s.restaurantTagline);
	return (
		<header className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-12 border-b bg-background">
			<div className="flex items-center gap-2 min-w-0">
				<div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 shrink-0">
					<Coffee className="h-4 w-4 text-primary" />
				</div>
				<div className="min-w-0">
					<p className="text-sm font-semibold truncate">{restaurantName}</p>
					<p className="text-[11px] text-muted-foreground truncate hidden sm:block">
						{restaurantTagline}
					</p>
				</div>
			</div>
			<div className="flex items-center gap-1.5 shrink-0">
				<ThemeToggle />
				<span className="text-xs text-muted-foreground">Meja</span>
				<span className="text-sm font-bold">{tableId}</span>
			</div>
		</header>
	);
}
