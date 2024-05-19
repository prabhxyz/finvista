import React from 'react';
import { categories } from '@/constants/data';
const Transaction = ({
	transaction,
}: {
	transaction: {
		transaction_id: string;
		transaction_date: string;
		transaction_amount: string;
		account_number: string;
		category_id: string;
	};
}) => {
	return (
		<div className="w-full px-5 py-3 bg-zinc-700 rounded-xl">
			<h3 className="text-2xl font-bold">{categories[transaction.category_id]}</h3>
			<p>{transaction.transaction_date}</p>
		</div>
	);
};

export default Transaction;
