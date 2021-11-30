import React from "react";

const WorkerUserPage: React.FC = () => {
	// const [user, setUser] = useState([])
	// const {loading, request} = useHttp()
	// const {token} = useContext(AuthContext)

	// const fetchLinks = useCallback(async () => {
	// try {
	// 	const fetched = await request('/api/workers', 'GET', null, {
	// 		Authorization: `Bearer ${token}`
	// 	});
	// 	setUser(fetched);
	// } catch (e) {}
	// }, [token, request]);

	// useEffect(() => {
	// 	fetchLinks()
	// }, [fetchLinks])

	return(
		<div className="col s9" style={{width: '80%'}}>
			<h1>Тут буде інформація про співробітників компанії</h1>
		</div>
	)
}

export default WorkerUserPage;