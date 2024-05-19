'use client';

import React, { useEffect, useState } from 'react';
import { data, categories } from '@/constants/data';
import Enclosure from './Enclosure';
import { useMainStore } from '@/context/main-state-provider';
import { PieChart, ResponsiveChartContainer } from '@mui/x-charts';
import Cal from './Cal';

const CategoryChart = () => {
	const { startDate, endDate } = useMainStore((state) => state);
	const [chartData, setChartData] = useState([]);

	useEffect(() => {
		console.log(chartData);
	}, [chartData]);

	const transformData = (startDate, endDate) => {
		let pieData = [];
		// data has a transaction_date key: 9/14/2023
		// we need to ensure each the data is limited to the selected time period
		const startDateObj = new Date(startDate);
		const endDateObj = new Date(endDate);

		// loop through each category
		categories.forEach((category) => {
			const filteredData = data.filter((transaction) => {
				if (new Date(transaction.transaction_date) >= startDateObj && new Date(transaction.transaction_date) <= endDateObj) {
					if (transaction.category_id === category.id) {
						return true;
					}
				}
				return false;
			});

			// loop through each transaction
			if (filteredData.length > 0) {
				// pieData.push([category.name, filteredData.length, category.color]);
				pieData.push({
					label: category.name,
					value: filteredData.length,
					color: category.color,
				});
			}
		});

		// eliminate 0 values
		// add header row to data
		return pieData;
	};

	useEffect(() => {
		setChartData(transformData(startDate, endDate));
	}, [startDate, endDate]);

	return (
		<Enclosure>
			<Cal />

			<div>
				{chartData.length > 0 && (
					<PieChart
						key={startDate}
						className="text-white fr"
						series={[
							{
								data: chartData,
								innerRadius: 50,
								outerRadius: 150,
								paddingAngle: 2,
								cornerRadius: 2,
								startAngle: 0,
								endAngle: 360,
							},
						]}
						width={400}
						height={400}
						slotProps={{
							legend: { hidden: true },
						}}
					/>
				)}
			</div>
		</Enclosure>
	);
};

export default CategoryChart;

const Bullet = ({ backgroundColor, size }) => {
	return (
		<div
			className="CirecleBullet"
			style={{
				backgroundColor,
				width: size,
				height: size,
			}}
		></div>
	);
};

const CustomizedLegend = (props) => {
	const { payload } = props;
	return (
		<ul className="LegendList">
			{payload.map((entry, index) => (
				<li key={`item-${index}`}>
					<div className="BulletLabel">
						<Bullet backgroundColor={entry.payload.fill} size="10px" />
						<div className="BulletLabelText">{entry.value}</div>
					</div>
					<div style={{ marginLeft: '20px' }}>{entry.payload.value}</div>
				</li>
			))}
		</ul>
	);
};

const CustomLabel = ({ viewBox, labelText, value }) => {
	const { cx, cy } = viewBox;
	return (
		<g>
			<text
				x={cx}
				y={cy}
				className="recharts-text recharts-label"
				textAnchor="middle"
				dominantBaseline="central"
				alignmentBaseline="middle"
				fontSize="15"
			>
				{labelText}
			</text>
			<text
				x={cx}
				y={cy + 20}
				className="recharts-text recharts-label"
				textAnchor="middle"
				dominantBaseline="central"
				alignmentBaseline="middle"
				fill="#0088FE"
				fontSize="26"
				fontWeight="600"
			>
				{value}
			</text>
		</g>
	);
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const RADIAN = Math.PI / 180;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};
