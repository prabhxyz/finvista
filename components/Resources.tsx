import Link from 'next/link';
import React from 'react';

const res = [
	{
		books: [
			{
				title: 'The Intelligent Investor',
				author: 'Benjamin Graham',
				link: 'https://www.amazon.com/dp/0060555661',
			},
			{
				title: 'Rich Dad Poor Dad',
				author: 'Robert T. Kiyosaki',
				link: 'https://www.amazon.com/dp/1612680194',
			},
			{
				title: 'Your Money or Your Life',
				author: 'Vicki Robin and Joe Dominguez',
				link: 'https://www.amazon.com/dp/0143115766',
			},
			{
				title: 'The Total Money Makeover',
				author: 'Dave Ramsey',
				link: 'https://www.amazon.com/dp/1595555277',
			},
		],
		websites_and_blogs: [
			{
				name: 'Investopedia',
				link: 'https://www.investopedia.com/',
			},
			{
				name: 'The Motley Fool',
				link: 'https://www.fool.com/',
			},
			{
				name: 'NerdWallet',
				link: 'https://www.nerdwallet.com/',
			},
			{
				name: 'Mr. Money Mustache',
				link: 'https://www.mrmoneymustache.com/',
			},
		],
		podcasts: [
			{
				name: 'The Dave Ramsey Show',
				link: 'https://www.ramseysolutions.com/shows/the-dave-ramsey-show',
			},
			{
				name: 'How to Money',
				link: 'https://www.howtomoney.com/podcast/',
			},
			{
				name: 'The BiggerPockets Podcast',
				link: 'https://www.biggerpockets.com/podcast',
			},
			{
				name: 'Planet Money by NPR',
				link: 'https://www.npr.org/sections/money/',
			},
		],
		youtube_channels: [
			{
				name: 'Graham Stephan',
				link: 'https://www.youtube.com/channel/UCV6KDgJskWaEckne5aPA0aQ',
			},
			{
				name: 'Andrei Jikh',
				link: 'https://www.youtube.com/channel/UCGy7SkBjcIAgTiwkXEtPnYg',
			},
			{
				name: 'The Financial Diet',
				link: 'https://www.youtube.com/user/TheFinancialDiet',
			},
		],
		courses_and_online_learning: [
			{
				name: 'Personal & Family Financial Planning by the University of Florida',
				platform: 'Coursera',
				link: 'https://www.coursera.org/learn/personal-finance',
			},
			{
				name: 'Financial Markets by Yale University',
				platform: 'Coursera',
				link: 'https://www.coursera.org/learn/financial-markets-global',
			},
			{
				name: 'Introduction to Investments by IIMBx',
				platform: 'edX',
				link: 'https://www.edx.org/course/introduction-to-investments',
			},
			{
				name: 'Khan Academy Personal Finance',
				platform: 'Khan Academy',
				link: 'https://www.khanacademy.org/college-careers-more/personal-finance',
			},
		],
		financial_tools: [
			{
				name: 'Mint',
				link: 'https://www.mint.com/',
			},
			{
				name: 'YNAB (You Need A Budget)',
				link: 'https://www.youneedabudget.com/',
			},
			{
				name: 'Personal Capital',
				link: 'https://www.personalcapital.com/',
			},
		],
		local_resources: [
			{
				name: 'Certified Financial Planners',
				link: 'https://www.letsmakeaplan.org/',
			},
			{
				name: 'Community Workshops',
				link: 'https://www.usa.gov/local-governments',
			},
		],
	},
];

const Resources = () => {
	return (
		<div className="w-full fc gap-10">
			<div className="fc gap-2">
				<h3 className="text-4xl font-bold">Resources</h3>
				<p className="text-md">to help you on your financial journey</p>
			</div>
			<div className="grid grid-cols-3 gap-3 w-full">
				<div className="px-5 py-4 bg-zinc-700 rounded-2xl border-1 border-zinc-400/30 fc items-start justify-start">
					<h2 className="text-2xl font-bold text-center mb-4">📖 Books 📖</h2>
					{res[0].books.map((book) => (
						<div key={book.title}>
							<Link href={book.link} className="text-blue-500 hover:underline" target="_blank">
								{book.title} by {book.author}
							</Link>
						</div>
					))}
				</div>
				<div className="px-5 py-4 bg-zinc-700 rounded-2xl border-1 border-zinc-400/30 fc items-start justify-start">
					<h2 className="text-2xl font-bold text-center mb-4">🌐 Websites & Blogs 🌐</h2>
					{res[0].websites_and_blogs.map((site) => (
						<div key={site.name}>
							<Link href={site.link} className="text-blue-500 hover:underline" target="_blank">
								{site.name}
							</Link>
						</div>
					))}
				</div>
				<div className="px-5 py-4 bg-zinc-700 rounded-2xl border-1 border-zinc-400/30 fc items-start justify-start">
					<h2 className="text-2xl font-bold text-center mb-4">🎙 Podcasts 🎙</h2>
					{res[0].podcasts.map((podcast) => (
						<div key={podcast.name}>
							<Link href={podcast.link} className="text-blue-500 hover:underline" target="_blank">
								{podcast.name}
							</Link>
						</div>
					))}
				</div>
				<div className="px-5 py-4 bg-zinc-700 rounded-2xl border-1 border-zinc-400/30 fc items-start justify-start">
					<h2 className="text-2xl font-bold text-center mb-4">📺 YouTube Channels 📺</h2>
					{res[0].youtube_channels.map((channel) => (
						<div key={channel.name}>
							<Link href={channel.link} className="text-blue-500 hover:underline" target="_blank">
								{channel.name}
							</Link>
						</div>
					))}
				</div>
				<div className="px-5 py-4 bg-zinc-700 rounded-2xl border-1 border-zinc-400/30 fc items-start justify-start">
					<h2 className="text-2xl font-bold text-center mb-4">📚 Courses & Online Learning 📚</h2>
					{res[0].courses_and_online_learning.map((course) => (
						<div key={course.name}>
							<Link href={course.link} className="text-blue-500 hover:underline" target="_blank">
								{course.name}
							</Link>
						</div>
					))}
				</div>
				<div className="px-5 py-4 bg-zinc-700 rounded-2xl border-1 border-zinc-400/30 fc items-start justify-start">
					<h2 className="text-2xl font-bold text-center mb-4">💸 Financial Tools 💸</h2>
					{res[0].financial_tools.map((tool) => (
						<div key={tool.name}>
							<Link href={tool.link} className="text-blue-500 hover:underline" target="_blank">
								{tool.name}
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Resources;
