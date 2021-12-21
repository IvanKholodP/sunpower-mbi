import React, {useEffect, useCallback, useState, useContext} from "react";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHook";
import { IAdminProps } from "../../interface";
import { Loader } from "../loader/Loader";
import { AdminData } from "../adminData/AdminData";

export const SideNavAdmin: React.FC = () => {
	const [admin, setAdmin] = useState<IAdminProps>();
	const {loading, request} = useHttp();
	const {tokenAdmin} = useContext(AuthContext);

	const fetchAdmin = useCallback(async () => {
	try {
		const fetched = await request('/api/dashboard', 'GET', null, {
			Authorization: `Bearer ${tokenAdmin}`
		});
		setAdmin(fetched);
	} catch (e) {}
	}, [request, tokenAdmin]);

	useEffect(() => {
		fetchAdmin()
	}, [fetchAdmin])

	if(loading){
		return <Loader />
	}
	return(
		<>
			{!loading && admin &&  <AdminData admin={admin} />}
		</>
	)
}