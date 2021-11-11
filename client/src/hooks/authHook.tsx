import {useState, useCallback, useEffect} from 'react';

const storage: string = 'DataUser';
const myStorage: Storage = localStorage;

export const useAuth = () => {
	const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null);
	const [ready, setReady] = useState(false);


	const login = useCallback((jwt, id) => {
		setToken(jwt);
		setUserId(id);
		myStorage.setItem(storage, JSON.stringify({ token: jwt ,userId: id }))
	}, []);

	const logout = useCallback(()=> {
		setToken(null);
		setUserId(null);
		myStorage.removeItem(storage);
	}, []);

	useEffect(()=> {
		const data = JSON.parse(myStorage.getItem(storage) || '{}');
		if (data && data.token) {
			login(data.token, data.userId);
		}
		setReady(true);
	}, [login]);

	return {login, logout, token, userId, ready}
}