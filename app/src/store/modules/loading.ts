import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
	name: 'utils',
	initialState: { loading: false },
	reducers: {
		setLoading: (state, action) => ({ ...state, ...action.payload }),
		//stopLoading: () => ({ loading: false }),
	},
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
