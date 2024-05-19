'use client';
import React from 'react';
import { Syncopate } from 'next/font/google';
import { useMainStore } from '@/context/main-state-provider';
const syncopate = Syncopate({ weight: ['700'], subsets: ['latin'] });

const Sidebar = () => {
	const { setView } = useMainStore((state) => state);
	return (
		<>
			<nav className="h-full max-w-xl fc justify-start items-start px-4 py-10 bg-zinc-800 border-r-1 border-zinc-700">
				<h1 className={`uppercase text-2xl mb-10 text-green-300 ${syncopate.className}`}>Finvista</h1>
				<ul className="w-full fc gap-3">
					<li className="nav-item" onClick={() => setView('dashboard')}>
						Dashboard
					</li>
					<li className="nav-item" onClick={() => setView('investing')}>
						Investing
					</li>
				</ul>
			</nav>
		</>
	);
};

export default Sidebar;
