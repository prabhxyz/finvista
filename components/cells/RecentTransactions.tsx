import React from 'react';
import { data } from '@/constants/data';
import Transaction from './Transaction';
const RecentTransactions = () => {
	return (
		<div className="card-item overflow-scroll">
			{data.map((item) => (
				<Transaction key={item.transaction_id} transaction={item} />
			))}
		</div>
	);
};

export default RecentTransactions;
