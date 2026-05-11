import { useOrderStore } from "@/stores/orderStore";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router";
import BottomTabBar from "./BottomTabBar";
import TopBar from "./TopBar";

export default function CustomerLayout() {
	const { tableId } = useParams();
	const setTable = useOrderStore((s) => s.setTable);
	const currentTableId = useOrderStore((s) => s.tableId);

	useEffect(() => {
		if (tableId && tableId !== currentTableId) {
			setTable(tableId, "JomCafe", "Fresh Coffee & Meals");
		}
	}, [tableId, currentTableId, setTable]);

	return (
		<div className="min-h-screen flex flex-col bg-background pb-14 md:pb-0 md:pl-16">
			<TopBar />
			<main className="flex-1 overflow-y-auto p-4 md:p-6 md:pt-12 flex flex-col">
				<div className="mx-auto w-full md:max-w-4xl flex-1 flex flex-col">
					<Outlet />
				</div>
			</main>
			<BottomTabBar />
		</div>
	);
}
