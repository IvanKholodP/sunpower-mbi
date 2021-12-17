import {useState, useCallback, useEffect} from 'react';

const storage: string = 'DataUser';
const storageAdmin: string = 'DataAdmin';
const myStorage: Storage = localStorage;

export const useAuth = () => {
	const [token, setToken] = useState(null);
	const [tokenAdmin, setTokenAdmin] = useState(null);
	const [userId, setUserId] = useState(null);
	const [adminId, setAdminId] = useState(null);
	const [ready, setReady] = useState(false);


	const loginAdmin = useCallback((jwt, id) => {
		setTokenAdmin(jwt);
		setAdminId(id);
		myStorage.setItem(storageAdmin, JSON.stringify({ tokenAdmin: jwt, adminId: id }))
	}, []);

	const login = useCallback((jwt, id) => {
		setToken(jwt);
		setUserId(id);
		myStorage.setItem(storage, JSON.stringify({ token: jwt, userId: id }))
	}, []);

	const logout = useCallback(()=> {
		setToken(null);
		setUserId(null);
		setAdminId(null);
		setTokenAdmin(null);
		myStorage.removeItem(storage);
		myStorage.removeItem(storageAdmin);
	}, []);

	useEffect(()=> {
		const data = JSON.parse(myStorage.getItem(storageAdmin) || '{}');
		if (data && data.tokenAdmin) {
			loginAdmin(data.tokenAdmin, data.adminId);
		}
		setReady(true);
	}, [loginAdmin]);
	
	useEffect(()=> {
		const data = JSON.parse(myStorage.getItem(storage) || '{}');
		if (data && data.token) {
			login(data.token, data.userId);
		}
		setReady(true);
	}, [login]);



	return {login, logout, token, userId, ready, adminId, loginAdmin, tokenAdmin}
}