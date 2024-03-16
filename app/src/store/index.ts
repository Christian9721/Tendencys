import { configureStore, compose, combineReducers } from '@reduxjs/toolkit';
import loadingReducer from './modules/loading';
import orderReducer from './modules/orders';
import alertReducer from './modules/alert';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}
export const mainReducer = combineReducers({
	loading: loadingReducer,
	orders: orderReducer,
	alert: alertReducer,
});

const store = configureStore({
	reducer: mainReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
