import React, { useCallback, useContext, useState, useEffect } from "react";
import { Loader } from "../../components/loader/Loader";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHook";
import { IGetAllApp } from "../../interface";
import Helper from '../../helpers/Helper';
import moment from 'moment';

const monthNow = (moment().month() + 1).toString();
const yearNow = moment().year().toString();
const monthNowNumberType = moment().month() + 1;


const ApplicationsUserPage: React.FC = () => {
	const [applications, setApplications] = useState<IGetAllApp[]>([])
	const {loading, request} = useHttp();
	const {token} = useContext(AuthContext);

	const [selectedOptionMonth, setSelectedOptionMonth] = useState<String>(monthNow);
	const [selectedOptionYear, setSelectedOptionYear] = useState<String>(yearNow);

	const uniqeMonths: number[] = Array.from(new Set(applications.map((app: any) => app.month))).sort((a: number, b: number)=> {return a - b});
	const uniqeYears: number[] = Array.from(new Set(applications.map((app: any) => app.year))).sort((a: number, b: number)=> {return a - b});

	const selectChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) =>{event.preventDefault(); setSelectedOptionMonth(event.target.value)};
	const selectChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedOptionYear(event.target.value);

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

	useEffect(() => {
		window.M.AutoInit();
	}, [uniqeMonths]);



	if(loading){
		return <Loader />
	}

	return(
		<div className="col s12">
			<div className="input-field col s3">
				<select onChange={selectChangeMonth} defaultValue={monthNow.toString()} >
					{uniqeMonths.map((month: number) => {
						return (
							<>
								<option value={month.toString()} selected={(monthNowNumberType === month) ? true : false}  >
									{moment().month(month - 1).format("MMMM")}
								</option>
							</>
						);
					})}
				</select>
				<label>Виберіть місяць</label>
			</div>
				<div className="input-field col s3">
					<select onChange={selectChangeYear} defaultValue={yearNow}>
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
					<label>Виберіть рік</label>
				</div>
			<div>
				<table className="highlight">
					<thead>
						<tr>
							<th>№ заявки</th>
							<th>Коментар логіста</th>
							<th>Дата створення</th>
							<th>Планова дата доставки</th>
							<th>Менеджер</th>
							<th>Вантаж</th>
							<th>Метод відправки</th>
							<th>Місто</th>
							<th>Дані отримувача</th>
							<th>Платник</th>
							<th>Коментар менеджера</th>
						</tr>
					</thead>
					<tbody>
						{applications.map((app: IGetAllApp) => {
							if (selectedOptionMonth === app.month.toString() && selectedOptionYear === app.year.toString()) {
								return (
									<tr key={app.appId} >
										<td style={{textAlign:'center', backgroundColor: Helper.setAppStatusColor(app.status)}}>{app.appId}</td>
										<td>{app.commentsLogist}</td>
										<td>{moment.utc(app.createAt).add(2, 'hours').format('DD.MM.YYYY HH:mm:ss')}</td>
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
	)
}

export default ApplicationsUserPage;