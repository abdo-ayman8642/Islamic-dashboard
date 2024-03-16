import { create } from 'zustand';

type State = {
	session: any;
};

type Actions = {
	setSession: (payload: any) => void;
};

const useAuthStore = create<State & Actions>((set) => ({
	session: null,
	setSession: (payload: any) => set((state) => ({ ...state, session: payload }))
}));

export default useAuthStore;
