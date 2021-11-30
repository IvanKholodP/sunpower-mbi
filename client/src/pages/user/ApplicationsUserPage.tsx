import React, { useCallback, useContext, useState, useEffect } from "react";
// import { GetAllApplications } from "../../components/applications/Applications";
import { Loader } from "../../components/loader/Loader";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHook";
import { IGetAllApp } from "../../interface";
import Helper from '../../helpers/Helper';
import moment from 'moment';

const monthNow = (moment().month() + 1).toString();
const yearNow = moment().year().toString();


const ApplicationsUserPage: React.FC = () => {
	const [applications, setApplications] = useState<IGetAllApp[]>([])
	const {loading, request} = useHttp();
	const {token} = useContext(AuthContext);

	const [selectedOptionMonth, setSelectedOptionMonth] = useState<String>(monthNow);
	const [selectedOptionYear, setSelectedOptionYear] = useState<String>(yearNow);

	const selectChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedOptionMonth(event.target.value);
	const selectChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedOptionYear(event.target.value);
	const uniqeMonths: number[] = Array.from(new Set(applications.map((app: any) => app.month))).sort((a: number, b: number)=> {return a - b});
	const uniqeYears: number[] = Array.from(new Set(applications.map((app: any) => app.year))).sort((a: number, b: number)=> {return a - b});
	console.log('uniqeMonths', uniqeMonths)
	console.log('uniqeYears', uniqeYears)

	const fetchApplications = useCallback(async([])=>{
		try {
			const fetched = await request('/api/applications', 'GET', null, {
				Authorization: `Bearer ${token}`
			});
			setApplications(fetched);
		} catch (error) {}
	}, [request, token]);

	useEffect(() => {
		fetchApplications([])
	}, [fetchApplications])

	if(loading){
		return <Loader />
	}

	return(
		<div className="col s9" style={{width: '80%'}}>
		<div className="input-field col s3">
			<select onChange={selectChangeMonth} defaultValue={moment().month() + 1}>
				{uniqeMonths.map((month: number) => {
					return (
						<>
							<option value={month} >
								{moment().month(month - 1).format("MMMM")}
							</option>
						</>
					);
				})}
			</select>
			<label>Choose the Month</label>
			</div>
			<div className="input-field col s3">
				<select onChange={selectChangeYear} defaultValue={moment().year()}>
					{uniqeYears.map((year: number) => {
						return (
							<>
								<option value={year}>
									{year}
								</option>
							</>
						);
					})}
				</select>
				<label>Choose one Year</label>
			</div>
		<div>
			<table>
				<thead>
					<tr>
						<th>Comments Logist</th>
						<th>Create App</th>
						<th>deliverPlaning</th>
						<th>Manager</th>
						<th>Goods</th>
						<th>Send Method</th>
						<th>City</th>
						<th>Recipient Data</th>
						<th>Payer</th>
						<th>Comments Sales</th>
					</tr>
				</thead>
				<tbody>
					{applications.map((app: IGetAllApp) => {
						if (selectedOptionMonth === app.month.toString() && selectedOptionYear === app.year.toString()) {
							return (
								<tr key={app.appId} >
									<td style={{backgroundColor: Helper.setAppStatusColor(app.status)}}>{app.appId}</td>
									<td>{moment.utc(app.createAt).add(2, 'hours').format('YYYY-MM-DD HH:mm:ss')}</td>
									<td>{app.deliverPlaning}</td>
									<td>{`${app.firstName} ${app.lastName}`}</td>
									<td>{app.goods}</td>
									<td>{app.sendMethod}</td>
									<td>{app.city}</td>
									<td>{app.recipientData}</td>
									<td>{app.payer}</td>
									<td>{app.commentsSales}</td>
								</tr>
							);
						} else {
							return <></>;
						}
					})}
				</tbody>
			</table>
		</div>
	</div>

		// <>
		// 	{!loading && applications && <GetAllApplications applications={applications} />}
		// </>
	)
}

export default ApplicationsUserPage;