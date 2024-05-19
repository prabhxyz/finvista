'use client';
import React from 'react';
import { data, categories } from '@/constants/data';
import CategoryChart from '@/components/CategoryChart';
import Sidebar from '@/components/Sidebar';
import Enclosure from '@/components/Enclosure';
import { userData } from '@/constants/data';
import MoneyOverTime from '@/components/MoneyOverTime';
import Cal from '@/components/Cal';
import NetWorth from '@/components/cells/NetWorth';
import Expenses from '@/components/cells/Expenses';
import Investments from '@/components/cells/Investments';
import RecentTransactions from '@/components/cells/RecentTransactions';
import Resources from '@/components/Resources';
import { useMainStore } from '@/context/main-state-provider';

import { AnimatePresence } from 'framer-motion';
import Investing from '@/components/Investing';
import Dashboard from '@/components/Dashboard';

const Page = () => {
	const { view, setView } = useMainStore((state) => state);
	// data is an array of objects containing a category_id
	// we need to ensure each transaction has a valid category_id
	return (
		<div className="h-screen w-screen overflow-hidden fr bg-zinc-900 dark">
			<Sidebar />
			<AnimatePresence>{view === 'dashboard' ? <Dashboard /> : view === 'investing' ? <Investing /> : <RecentTransactions />}</AnimatePresence>
		</div>
	);
};

export default Page;
