import { createStore } from 'zustand/vanilla';

// const [season, setSeason] = useState<number>(0);
// const [episode, setEpisode] = useState<number>(1);
// const [source, setSource] = useState<number>(0);
// const [isInFuture, setIsInFuture] = useState<boolean>(false);
// const [isinDMCA, setIsInDMCA] = useState<boolean>(false);
// const [playerVisibility, setPlayerVisibility] = useState(false);
type Logo = {
	company: string;
	logo: string;
};

export type MainState = {
	startDate: string;
	endDate: string;
	view: 'dashboard' | 'transactions' | 'investing';
	pickedCompanies: string[];
	logos: Logo[];
};

export type MainActions = {
	setStartDate: (startDate: string) => void;
	setEndDate: (endDate: string) => void;
	setView: (view: MainState['view']) => void;
	setPickedCompanies: (pickedCompanies: string[]) => void;
	setLogos: (logos: Logo[]) => void;
};

export type MainStore = MainState & MainActions;

export const defaultInitState: MainState = {
	startDate: 'all',
	endDate: 'all',
	view: 'dashboard',
	pickedCompanies: [],
	logos: [],
};

export const createMainStore = (initState: MainState = defaultInitState) => {
	return createStore<MainStore>()((set) => ({
		...initState,
		setStartDate: (startDate: string) => set({ startDate }),
		setEndDate: (endDate: string) => set({ endDate }),
		setView: (view: MainState['view']) => set({ view }),
		setPickedCompanies: (pickedCompanies: string[]) => set({ pickedCompanies }),
		setLogos: (logos: Logo[]) => set({ logos }),
	}));
};
