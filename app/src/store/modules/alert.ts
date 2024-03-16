import { createSlice } from '@reduxjs/toolkit';
import { TTableData } from '../../interfaces/table-data.component';
import { Order } from "../../interfaces/request-response";
import type { PayloadAction } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
	name: 'alert',
	initialState: false,
	reducers: {
		setAlert: (_, action: PayloadAction<boolean>) => { 
			return action.payload;
        },
	},
});

export const { setAlert } = alertSlice.actions;

export default alertSlice.reducer;
