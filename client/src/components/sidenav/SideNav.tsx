import React, {useEffect, useCallback, useState, useContext} from "react";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHook";
import { IUserProps } from "../../interface";
import { Loader } from "../loader/Loader";
import { UserData } from "../userData/UserData";

export const SideNav: React.FC = () => {
	const [user, setUser] = useState<IUserProps>();
	const {loading, request} = useHttp();
	const {token} = useContext(AuthContext);

	const fetchUser = useCallback(async () => {
	try {
		const fetched = await request('/api/', 'GET', null, {
			Authorization: `Bearer ${token}`
		});
		setUser(fetched);
	} catch (e) {}
	}, [request, token]);

	useEffect(() => {
		fetchUser()
	}, [fetchUser])

	if(loading){
		return <Loader />
	}
	return(
		<>
			{!loading && user &&  <UserData user={user} />}
		</>
	)
}