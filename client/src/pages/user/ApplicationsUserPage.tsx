import React, { useCallback, useContext, useState, useEffect } from "react";
import { GetAllApplications } from "../../components/applications/Applications";
import { Loader } from "../../components/loader/Loader";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHook";
import { IGetAllApp } from "../../interface";


const ApplicationsUserPage: React.FC = () => {
	const [applications, setApplications] = useState<IGetAllApp[]>()
	const {loading, request} = useHttp();
	const {token} = useContext(AuthContext);

	const fetchApplications = useCallback(async()=>{
		try {
			const fetched = await request('/api/applications', 'GET', null, {
				Authorization: `Bearer ${token}`
			});
			setApplications(fetched);
			console.log('fetched',fetched)
		} catch (error) {}
	}, [request, token]);

	useEffect(() => {
		fetchApplications()
	}, [fetchApplications])

	if(loading){
		return <Loader />
	}

	return(
		<>
			{!loading && applications && <GetAllApplications applications={applications} />}
		</>
	)
}

export default ApplicationsUserPage;