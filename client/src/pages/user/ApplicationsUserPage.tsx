import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHook";
import { ApplicationsProps } from "../../interface";

const ApplicationsUserPage: React.FC = () => {
	const [applications, setApplications] = useState<ApplicationsProps>()
	const {loading, request} = useHttp();
	const {token} = useContext(AuthContext);

	
	return(
		<></>
	)
}

export default ApplicationsUserPage;