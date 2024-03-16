import { createSlice } from '@reduxjs/toolkit';
import { TTableData } from '../../interfaces/table-data.component';
import { Order } from "../../interfaces/request-response";
import type { PayloadAction } from '@reduxjs/toolkit'
import { uniqueId } from '../../utils/uniqueId';

const initialState: TTableData[] = [];
export const orderSlice = createSlice({
	name: 'orders',
	initialState: initialState,
	reducers: {
		setOrders: (state, action: PayloadAction<Order[]>) => { 

            const orderData:TTableData[] = [];
            action.payload.forEach(order => {
                const { number, items, id } = order;
                items.forEach(item => {
                    orderData.push({
                        id: id,
                        number: number,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        sku: item.sku,
                    });
                });
            })
            return orderData;
        },
        addOrder: (state, action: PayloadAction<TTableData>) => {
            
            const orderData = {
                ...action.payload,
                id: String(uniqueId()),
            };

            return [
                orderData,
                ...state, 
            ]
        }
	},
});

export const { setOrders, addOrder } = orderSlice.actions;

export default orderSlice.reducer;
