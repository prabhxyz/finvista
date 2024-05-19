import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { topCompanies } from '@/constants/companies';
import { Button, Checkbox, Chip } from '@mui/material';
import { useMainStore } from '@/context/main-state-provider';
import { cn } from '@/lib/cn';
import { LineChart } from '@mui/x-charts';
import Image from 'next/image';
import Link from 'next/link';
const sample = {
	links: {
		Apple: [
			'https://news.google.com/articles/CBMiigFodHRwczovL2NhLmZpbmFuY2UueWFob28uY29tL25ld3MvYXBwbGUtd2lsbC1yZXBvcnRlZGx5LW9mZmVyLWhpZ2hlci10cmFkZS1pbi1jcmVkaXQtZm9yLW9sZC1pcGhvbmVzLWZvci10aGUtbmV4dC10d28td2Vla3MtMjA1MjM5NjE4Lmh0bWzSAQA?hl=en-CA&gl=CA&ceid=CA%3Aen',
			'https://news.google.com/articles/CBMicmh0dHBzOi8vd3d3LnRvbXNndWlkZS5jb20vcGhvbmVzL2lwaG9uZXMvYXBwbGUtY2FycGxheS1pcy1nZXR0aW5nLTMtYmlnLXVwZ3JhZGVzLXdpdGgtaW9zLTE4LXdoYXQteW91LW5lZWQtdG8ta25vd9IBAA?hl=en-CA&gl=CA&ceid=CA%3Aen',
			'https://news.google.com/articles/CBMiZWh0dHBzOi8vd3d3LmVuZ2FkZ2V0LmNvbS9hcHBsZS1pcy1zYWlkLXRvLWJlLXdvcmtpbmctb24tYS1zaWduaWZpY2FudGx5LXRoaW5uZXItaXBob25lLTE4MDgyMzU2NS5odG1s0gEA?hl=en-CA&gl=CA&ceid=CA%3Aen',
			'https://news.google.com/articles/CBMiZWh0dHBzOi8vd3d3LmJubmJsb29tYmVyZy5jYS9hcHBsZS1zLTI3LWFwcC1zdG9yZS1mZWUtcGxhbi1nZXRzLXNrZXB0aWNhbC1yZWNlcHRpb24tYnktanVkZ2UtMS4yMDc0NjQ10gEA?hl=en-CA&gl=CA&ceid=CA%3Aen',
			'https://news.google.com/articles/CBMiXWh0dHBzOi8vd3d3LmZvb2wuY29tL2ludmVzdGluZy8yMDI0LzA1LzE4LzEtdW5zdG9wcGFibGUtc3RvY2stdGhhdC1jb3VsZC1qb2luLW1pY3Jvc29mdC1hcHBsL9IBAA?hl=en-CA&gl=CA&ceid=CA%3Aen',
			'https://news.google.com/articles/CBMicWh0dHBzOi8vd3d3LnVzYXRvZGF5LmNvbS9zdG9yeS9lbnRlcnRhaW5tZW50L211c2ljLzIwMjQvMDUvMTgvYXBwbGUtbXVzaWMtMTAwLWJlc3QtYWxidW1zLWxpc3QtNTAtNDEvNzM3MjMxMDYwMDcv0gEA?hl=en-CA&gl=CA&ceid=CA%3Aen',
			'https://news.google.com/articles/CBMibmh0dHBzOi8vYXJzdGVjaG5pY2EuY29tL2dhbWluZy8yMDI0LzA1L3RoZS1hcHBsZS10di1pcy1jb21pbmctZm9yLXRoZS1yYXNwYmVycnktcGlzLXJldHJvLWVtdWxhdGlvbi1ib3gtY3Jvd24v0gEA?hl=en-CA&gl=CA&ceid=CA%3Aen',
			'https://news.google.com/articles/CBMiX2h0dHBzOi8vd3d3LmJ1c2luZXNzaW5zaWRlci5jb20vd2F0Y2gtc2Ftc3VuZy1hZC1tb2Nrcy1hcHBsZXMtZmFpbGVkLWlwYWQtcHJvLWNydXNoLXNwb3QtMjAyNC010gFjaHR0cHM6Ly93d3cuYnVzaW5lc3NpbnNpZGVyLmNvbS93YXRjaC1zYW1zdW5nLWFkLW1vY2tzLWFwcGxlcy1mYWlsZWQtaXBhZC1wcm8tY3J1c2gtc3BvdC0yMDI0LTU_YW1w?hl=en-CA&gl=CA&ceid=CA%3Aen',
			'https://news.google.com/articles/CBMiaGh0dHBzOi8vd3d3Lm1hcmtldHdhdGNoLmNvbS9zdG9yeS9hcHBsZS1oYXMtbG9zdC1pdHMtc2hpbmUtaGVyZXMtd2hhdC1jYW4taGVscC1pdC1yZWdhaW4tbHVzdGVyLWU4OWQ0NWQ40gFsaHR0cHM6Ly93d3cubWFya2V0d2F0Y2guY29tL2FtcC9zdG9yeS9hcHBsZS1oYXMtbG9zdC1pdHMtc2hpbmUtaGVyZXMtd2hhdC1jYW4taGVscC1pdC1yZWdhaW4tbHVzdGVyLWU4OWQ0NWQ4?hl=en-CA&gl=CA&ceid=CA%3Aen',
			'https://news.google.com/articles/CBMiNmh0dHBzOi8vd3d3LndpcmVkLmNvbS9zdG9yeS9hcHBsZS12ZWhpY2xlLW1vdGlvbi1jdWVzL9IBAA?hl=en-CA&gl=CA&ceid=CA%3Aen',
		],
		Microsoft: [
			'https://news.google.com/articles/CBMiggFodHRwczovL3d3dy5ibGVlcGluZ2NvbXB1dGVyLmNvbS9uZXdzL21pY3Jvc29mdC9taWNyb3NvZnQtd2lsbC1zdGFydC1lbmZvcmNpbmctYXp1cmUtbXVsdGktZmFjdG9yLWF1dGhlbnRpY2F0aW9uLU1GQS1pbi1qdWx5LTIwMjQv0gGGAWh0dHBzOi8vd3d3LmJsZWVwaW5nY29tcHV0ZXIuY29tL25ld3MvbWljcm9zb2Z0L21pY3Jvc29mdC13aWxsLXN0YXJ0LWVuZm9yY2luZy1henVyZS1tdWx0aS1mYWN0b3ItYXV0aGVudGljYXRpb24tTUZBLWluLWp1bHktMjAyNC9hbXAv?hl=en-CA&gl=CA&ceid=CA%3Aen',
			'https://news.google.com/articles/CBMiX2h0dHBzOi8vd3d3LnRpcHJhbmtzLmNvbS9uZXdzL21pY3Jvc29mdC1uYXNkYXFtc2Z0LWNoYWxsZW5nZXMtbnZpZGlhLXdpdGgtYW1kLWFpLWNoaXBzLW9uLWF6dXJl0gEA?hl=en-CA&gl=CA&ceid=CA%3Aen',
			'https://news.google.com/articles/CBMibWh0dHBzOi8vY2EuZmluYW5jZS55YWhvby5jb20vbmV3cy9ob3ctdG8td2F0Y2gtdGhlLW1pY3Jvc29mdC1idWlsZC0yMDI0LWtleW5vdGUtbGl2ZS1vbi1tYXktMjEtMDAzMjA0NTk2Lmh0bWzSAQA?hl=en-CA&gl=CA&ceid=CA%3Aen',
			'https://news.google.com/articles/CBMiWWh0dHBzOi8vd3d3LmludmVzdG9ycy5jb20vbmV3cy90ZWNobm9sb2d5L2FtZC1zdG9jay1taWNyb3NvZnQtYXp1cmUtY2xvdWQtY29tcHV0aW5nLWRlYWwv0gEA?hl=en-CA&gl=CA&ceid=CA%3Aen',
			'https://news.google.com/articles/CBMiQWh0dHBzOi8vbWFzaGFibGUuY29tL2FydGljbGUvbWljcm9zb2Z0LWJ1aWxkLTIwMjQtaG93LXdoZXJlLXdhdGNo0gEA?hl=en-CA&gl=CA&ceid=CA%3Aen',
			'https://news.google.com/articles/CBMie2h0dHBzOi8vd3d3LnRoZW1vc2Nvd3RpbWVzLmNvbS8yMDI0LzA1LzE3L21pY3Jvc29mdC1ibG9ja3MtcnVzc2lhbi1jb3Jwb3JhdGUtY2xpZW50cy1mcm9tLWNsb3VkLXNlcnZpY2VzLXZlbmRvci1zYXlzLWE4NTE1MNIBAA?hl=en-CA&gl=CA&ceid=CA%3Aen',
			'https://news.google.com/articles/CBMiXWh0dHBzOi8vd3d3LmZvb2wuY29tL2ludmVzdGluZy8yMDI0LzA1LzE4LzEtdW5zdG9wcGFibGUtc3RvY2stdGhhdC1jb3VsZC1qb2luLW1pY3Jvc29mdC1hcHBsL9IBAA?hl=en-CA&gl=CA&ceid=CA%3Aen',
			'https://news.google.com/articles/CBMikgFodHRwczovL3d3dy5wY2dhbWVyLmNvbS9nYW1lcy9jYWxsLW9mLWR1dHkvbWljcm9zb2Z0LWlzLXJlcG9ydGVkbHktdGFraW5nLXRoZS1udWNsZWFyLW9wdGlvbi1yZWxlYXNpbmctdGhlLW5leHQtY2FsbC1vZi1kdXR5LWRheS1vbmUtb24tZ2FtZS1wYXNzL9IBAA?hl=en-CA&gl=CA&ceid=CA%3Aen',
			'https://news.google.com/articles/CBMiYWh0dHBzOi8vd3d3LnRoZXZlcmdlLmNvbS8yMDI0LzUvMTYvMjQxNTgwODkvbm90ZXBhZC1uZXdzbGV0dGVyLW1pY3Jvc29mdC13aW5kb3dzLW9uLWFybS1tYWMtdnMtcGPSAQA?hl=en-CA&gl=CA&ceid=CA%3Aen',
			'https://news.google.com/articles/CBMicmh0dHBzOi8vd3d3LmZvcmJlcy5jb20vc2l0ZXMvcGF1bHRhc3NpLzIwMjQvMDUvMTgvc2l4LXJlYXNvbnMtbWljcm9zb2Z0LWlzLXB1dHRpbmctY2FsbC1vZi1kdXR5LW9uLXhib3gtZ2FtZS1wYXNzL9IBAA?hl=en-CA&gl=CA&ceid=CA%3Aen',
		],
	},
	recc: [
		{
			company: 'Apple',
			reason: 'The release of new products with improved features and performance indicates strong demand and technological advancement.',
			recommendation: 'Buy',
		},
		{
			company: 'Microsoft',
			reason: 'The implementation of security measures and enforcement of authentication protocols enhances security, but it may require additional resources and potential disruptions.',
			recommendation: 'Hold',
		},
	],
};
const Investing = () => {
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState(null);
	const { pickedCompanies, setLogos, logos } = useMainStore((state) => state);

	useEffect(() => {
		console.log(response);
	}, [response]);

	useEffect(() => {
		console.log(logos);
	}, [logos]);

	const sendRequest = async () => {
		setLoading(true);
		// find the picked companies in the topCompanies array
		// and make a ticker array

		const response = await fetch('http://127.0.0.1:5000/beststock?companies=' + pickedCompanies.join(','));
		if (response.ok) {
			const data = await response.json();

			// fetch logos
			data.recc.forEach((item) => {
				const logosData = fetch(`https://api.thecompaniesapi.com/v1/companies/by-name?name=${item.company}&token=S16MHSXG`)
					.then((res) => res.json())
					.then((data) => {
						console.log(data);
						setLogos([
							...logos,
							{
								company: item.company,
								clearbit: data.companies[0],
							},
						]);
					});
			});
			setResponse(data);
			setLoading(false);
		} else {
			console.error('Failed to fetch data');
		}
	};
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={cn(`flex-1 flex-grow w-full h-full overflow-y-scroll gap-10 fc py-12 px-7 justify-start items-start bg-zinc-900`, {
				'bg-green-400 text-black': loading,
				'bg-green-300 text-black': response,
			})}
		>
			<AnimatePresence>
				{!loading && !response ? (
					<>
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fc w-full gap-6 text-white">
							<h1 className="text-4xl font-bold">Investing Genie</h1>
							<div className="fc gap-1">
								<p className="text-md">Select the companies you want to invest in</p>
								<p>and the genie shall tell you if you should</p>
							</div>
							<div className="w-full justify-end">
								<Button variant="contained" onClick={sendRequest} disabled={pickedCompanies.length === 0}>
									Send request
								</Button>
							</div>
						</motion.div>
						<div className="gap-6 w-full grid md:grid-cols-3 grid-cols-2">
							{topCompanies.map((company) => (
								<Company key={company.name} company={company} />
							))}
						</div>
					</>
				) : !response ? (
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
						<div className="w-full h-full fc justify-center items-center gap-4">
							<img src="https://i.gifer.com/KcW.gif"></img>
							<div className="loader"></div>
							<h1 className="text-3xl font-bold">The Genie is crunching the numbers for you...</h1>
						</div>
					</motion.div>
				) : null}
				{response && logos && (
					// res is the sample response data
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="flex-1 flex-grow w-full h-full overflow-y-scroll gap-10 fc py-12 justify-start items-start max-w-4xl mx-auto"
					>
						<h1 className="text-2xl font-bold">Here's what the Genie recommended for you</h1>
						{response.recc?.map((item) => (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="bg-zinc-700 text-white rounded-2xl w-full border-1 border-zinc-400/30 fc gap-3 items-start justify-start p-4 select-none transition-colors cursor-pointer"
							>
								<div className="fc gap-3 justify-center items-start">
									<div className="fr gap-2">
										<h2 className="text-4xl font-bold">{item.company}</h2>
										<Chip
											color={item.recommendation === 'Buy' ? 'primary' : item.recommendation === 'Hold' ? 'warning' : 'error'}
											label={item.recommendation}
											variant="filled"
										/>
									</div>
								</div>
								<div className="fc items-start justify-start gap-2">
									<p className="font-bold">
										{item.recommendation === 'Buy' ? 'Why Buy?' : item.recommendation === 'Hold' ? 'Why Hold?' : 'Why Sell?'}
									</p>
									<p>{item.reason}</p>
								</div>
								<div className="fc w-full">
									<h2 className="text-md mtext-2xl font-bold mb-4d:">Articles Used</h2>
									<div className="grid grid-cols-5 gap-2">
										{Object.keys(response.links)
											.filter((link) => link === item.company)
											.map((link) => {
												return response.links[link].map((article, i) => (
													<Link href={article} target="_blank" className="text-blue-400">
														Article {i + 1}
													</Link>
												));
											})}
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

const Company = ({
	company,
}: {
	company: {
		name: string;
		ticker: string;
		sector: string;
	};
}) => {
	const { setPickedCompanies, pickedCompanies } = useMainStore((state) => state);
	const checkIt = (e) => {
		console.log(e.target.checked);
		if (e.target.checked) {
			if (!pickedCompanies.includes(company.name)) {
				setPickedCompanies([...pickedCompanies, company.name]);
			}
		} else {
			setPickedCompanies(pickedCompanies.filter((item) => item !== company.name));
		}
	};

	return (
		<label
			htmlFor={company.name}
			className="bg-zinc-700 rounded-2xl border-1 border-zinc-400/30 gap-3 fc items-start justify-start p-4 select-none hover:bg-zinc-800 transition-colors cursor-pointer"
		>
			<div className="fr gap-3 justify-center items-start">
				<Checkbox id={company.name} onChange={checkIt} />
				<h2 className="text-xl lg:text-2xl font-bold mb-4d:">{company.name.replaceAll('_', ' ')}</h2>
			</div>
			<div className="flex gap-2">
				<Chip label={company.ticker} variant="outlined" />
				<Chip label={company.sector} variant="filled" />
			</div>
		</label>
	);
};

export default Investing;
