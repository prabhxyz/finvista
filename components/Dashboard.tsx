import { userData } from '@/constants/data';
import React from 'react';
import CategoryChart from './CategoryChart';
import MoneyOverTime from './MoneyOverTime';
import Resources from './Resources';
import Expenses from './cells/Expenses';
import Investments from './cells/Investments';
import NetWorth from './cells/NetWorth';
import { motion } from 'framer-motion';
const Dashboard = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="flex-1 flex-grow w-full h-full overflow-y-scroll gap-10 fc py-12 px-7 justify-start items-start"
		>
			<div className="fc gap-6 w-full items-start">
				<h1 className="text-4xl font-bold">
					Welcome, <span className="text-green-300">{userData.name.split(' ')[0]}</span>
				</h1>
			</div>
			<div className="grid grid-cols-3 gap-10 w-full">
				<NetWorth />
				<Investments />
				<Expenses />
			</div>
			<div className="fr gap-2 w-full items-stretch flex-wrap">
				<MoneyOverTime />
				<CategoryChart />
			</div>
			<Resources />
		</motion.div>
	);
};

export default Dashboard;
