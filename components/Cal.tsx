'use client';
import React, { use, useEffect, useState } from 'react';
import { useMainStore } from '@/context/main-state-provider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { data } from '@/constants/data';
import { useDateFormatter } from '@react-aria/i18n';
import { getLocalTimeZone } from '@internationalized/date';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
export default function Cal() {
	const { startDate, endDate, setStartDate, setEndDate } = useMainStore((state) => state);

	const { log } = console;
	const [interval, setInterval] = useState('');

	// useEffect(() => {
	// 	log(startDate);
	// 	log(endDate);
	// }, [startDate, endDate]);

	useEffect(() => {
		setTimePeriod('all');
	}, []);

	useEffect(() => {
		console.log(startDate);
		console.log(endDate);
	}, [startDate, endDate]);

	const [age, setAge] = React.useState('');

	const handleChange = (event) => {
		setAge(event.target.value as string);
	};

	const setTimePeriod = (timePeriod: string) => {
		const today = new Date();

		setInterval(timePeriod);

		if (timePeriod === 'all') {
			// sort data by date
			data.sort((a, b) => new Date(a.transaction_date).getTime() - new Date(b.transaction_date).getTime());
			console.log(data);
			setStartDate(new Date(data[0].transaction_date).toISOString().split('T')[0]);
			setEndDate(new Date(data[data.length - 1].transaction_date).toISOString().split('T')[0]);
		} else if (timePeriod === 'last-week') {
			// today - 7 days is start date
			// today is end date
			const lastWeek = new Date(today);
			lastWeek.setDate(today.getDate() - 7);

			const startDate = lastWeek.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
			const endDate = today.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

			setStartDate(startDate);
			setEndDate(endDate);
		} else if (timePeriod === 'last-month') {
			// today - 30 days is start date
			// today is end date
			const lastMonth = new Date(today);
			lastMonth.setDate(today.getDate() - 30);

			const startDate = lastMonth.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
			const endDate = today.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

			setStartDate(startDate);
			setEndDate(endDate);
		} else if (timePeriod === 'last-year') {
			// today - 365 days is start date
			// today is end date
			const lastYear = new Date(today);
			lastYear.setDate(today.getDate() - 365);

			const startDate = lastYear.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
			const endDate = today.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

			setStartDate(startDate);
			setEndDate(endDate);
		}
	};

	return (
		<div className="fr gap-2 w-full">
			<div className="w-full fr gap-2 justify-start">
				<input className="bg-transparent" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
				<input className="bg-transparent" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

				{/* <FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">
						{interval === 'all' ? 'All' : interval === 'last-week' ? 'Last Week' : interval === 'last-month' ? 'Last Month' : 'Last Year'}
					</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={interval}
						onChange={(e) => setTimePeriod(event.target.value)}
					>
						<MenuItem value={'all'}>All</MenuItem>
						<MenuItem value={'last-week'}>Last Week</MenuItem>
						<MenuItem value={'last-month'}>Last Month</MenuItem>
						<MenuItem value={'last-year'}>Last Year</MenuItem>
					</Select>
				</FormControl> */}
				<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
					<InputLabel id="demo-simple-select-label">Interval</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={interval}
						label="Age"
						onChange={(event) => setTimePeriod(event.target.value)}
					>
						<MenuItem value={'all'}>All</MenuItem>
						<MenuItem value={'last-week'}>Last Week</MenuItem>
						<MenuItem value={'last-month'}>Last Month</MenuItem>
						<MenuItem value={'last-year'}>Last Year</MenuItem>
					</Select>
				</FormControl>
			</div>
		</div>
	);
}
