/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../store/modules/loading';
import { APP_URL, TOKEN } from '../constants/url';

interface IRequestPayload<ResponseType> {
	path: string;
	headers?: {
		[key: string]: string;
	};
	onFetched?: (data: ResponseType) => void;
}

export const useApiRequest = <ParamsType, ResponseType>(
	{ path, headers, onFetched }: IRequestPayload<ResponseType>
) => {
	const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
	const [value, setValue] = useState<ResponseType | null>(null);
	const dispatch = useDispatch();

	const getTokenAuth = (): string => {
		if (TOKEN) {
			return `${TOKEN}`;
		}
		return '';
	};

	const execute = useCallback(async (pathPag: string, params?: ParamsType, ) => {
		setStatus('pending');
		setValue(null);
		const abortController = new AbortController();
		try {
			dispatch(setLoading({ loading: true }));
			const instance = await axios.create({
				baseURL: "/api",
				//method,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'ngrok-skip-browser-warning': true,
					'Content-Type': 'application/json; charset=utf-8',
					Accept: 'text/plain',
					Authorization: getTokenAuth(),
					...headers,
				},
				data: {
					...params,
				},
				signal: abortController.signal,
			});
			const response = await instance.get(pathPag);
			const data = response.data as ResponseType;
			setValue(data);
			if (onFetched) onFetched(data);
			setStatus('success');
		} catch (error: any) {
			console.log("ERROR: ", error);
			if (error?.response?.data) 
				setValue(error?.response?.data);
			
			setStatus('error');
		} finally {
			dispatch(setLoading({ loading: false }));
		}
		return () => abortController.abort();
	}, []);

	useEffect(() => {
		execute(path);
	}, []);

	return { execute, status, value, setStatus };
};
