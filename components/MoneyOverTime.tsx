'use client';
import { data as transactions } from '@/constants/data';
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { useMainStore } from '@/context/main-state-provider';
import { data } from '@/constants/data';
import { ScatterChart } from '@mui/x-charts';
const MoneyOverTime = () => {
	const { startDate, endDate } = useMainStore((state) => state);
	const [dates, setDates] = useState([]);
	const [amounts, setAmounts] = useState([]);

	useEffect(() => {
		// sort data by date
		let sortedData = data.sort((a, b) => {
			return new Date(a.transaction_date).getTime() - new Date(b.transaction_date).getTime();
		});

		// filter out all type income
		sortedData = sortedData.filter((item) => item.transaction_type !== 'income');

		console.log(sortedData);
		const dates = sortedData.slice(0, 7).map((item) => item.transaction_date.split('/')[1]);
		const amt = sortedData.slice(0, 7).map((item) => item.transaction_amount);
		console.log(dates);
		console.log(amt);

		// for scatter plot we need this format:
		// [
		// 	{
		// 		id: 'data-0',
		// 		x1: 329.39,
		// 		x2: 391.29,
		// 		y1: 443.28,
		// 		y2: 153.9,
		// 	},
		// 	{
		// 		id: 'data-1',
		// 		x1: 96.94,
		// 		x2: 139.6,
		// 		y1: 110.5,
		// 		y2: 217.8,
		// 	},]

		const amounts = sortedData.slice(0, 7).map((item, i) => {
			return {
				id: 'data-' + i,
				x1: item.transaction_date.split('/')[1],
				y1: item.transaction_amount,
			};
		});
		console.log(amounts);
		setDates(amounts);
	}, [startDate, endDate]);

	useEffect(() => {
		console.log(dates);
		console.log(amounts);
	}, [dates, amounts]);

	return (
		<div className="p-10 bg-zinc-800 border border-zinc-400/50 rounded-2xl">
			<h3 className="text-2xl">Expenses over last 7 days</h3>
			<ScatterChart
				series={[
					{
						label: 'Expenses',
						data: dates.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
					},
				]}
				width={500}
				height={300}
				slotProps={{
					legend: { hidden: true },
				}}
				// xAxis={[{ data: dates.map((v) => `May ${Math.round(v.x1)}`) }]}
			/>
		</div>
	);
};

export default MoneyOverTime;
