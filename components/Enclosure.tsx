import React from 'react';

const Enclosure = ({ children }: { children: React.ReactNode }) => {
	return <div className="bg-zinc-800 border border-zinc-400/40 rounded-2xl px-3 py-2 fc justify-start">{children}</div>;
};

export default Enclosure;
