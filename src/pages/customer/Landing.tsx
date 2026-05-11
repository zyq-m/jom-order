import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/stores/orderStore";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router";

export default function CustomerLanding() {
	const tableId = useOrderStore((s) => s.tableId);
	const restaurantName = useOrderStore((s) => s.restaurantName);
	const setTable = useOrderStore((s) => s.setTable);
	const params = useParams();

	useEffect(() => {
		if (params.tableId && params.tableId !== tableId) {
			setTable(params.tableId, "Kedai Maju Jaya", "Sedap & Cepat");
		}
	}, [params.tableId, tableId, setTable]);

	return (
		<div className="flex flex-col min-h-[calc(100dvh-9rem)]">
			<div className="flex flex-col items-center justify-center flex-1 px-6">
				<p className="text-primary font-extrabold text-3xl md:text-4xl mb-1">
					Selamat datang
				</p>

				<h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
					{restaurantName}
				</h1>

				<div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-border shadow-lg mb-8">
					<img
						src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop"
						alt="Hidangan"
						className="w-full h-full object-cover"
					/>
				</div>

				<p className="text-muted-foreground text-center max-w-xs md:max-w-sm leading-relaxed mb-8">
					Nikmati hidangan kegemaran anda dengan pesanan pantas dan murah.
				</p>

				<Button
					asChild
					size="lg"
					className="w-full max-w-xs text-base rounded-full md:text-lg md:py-6"
				>
					<Link to={`/t/${tableId}/menu`}>
						Lihat Menu
						<ArrowRight className="h-4 w-4 ml-2" />
					</Link>
				</Button>
			</div>

			<p className="text-center text-[11px] text-muted-foreground">
				&copy; 2026 JomOrder
			</p>
		</div>
	);
}
