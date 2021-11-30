import React, { createRef, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Loader } from "../../components/loader/Loader";
// import { GetMyApps } from "../../components/myApp/MyApps";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHook";
import { IGetMyApps } from "../../interface";
import moment from "moment";
import { useMessage } from "../../hooks/messageHook";
import { Modal, Button, TextInput  } from "react-materialize";
import Helper from "../../helpers/Helper";


const monthNow = (moment().month() + 1).toString();
const yearNow = moment().year().toString();

const MyAppsUserPage: React.FC = (props) => {
	const [apps, setApps] = useState<IGetMyApps[]>([]);
	const [selectedOptionMonth, setSelectedOptionMonth] = useState<String>(monthNow);
	const [selectedOptionYear, setSelectedOptionYear] = useState<String>(yearNow);
	const {loading, request} = useHttp();
	const {token} = useContext(AuthContext);
	const message = useMessage();

	const fetcMyApps = useCallback(async ([]) => {
		try {
			const fetched = await request('/api/myapps', 'GET', null, {
				Authorization: `Bearer ${token}`
			});
			setApps(fetched);
		} catch (e) {}
		}, [request, token]);

		
	useEffect(() => {
		fetcMyApps([])
	}, [fetcMyApps])

	if(apps){
		console.log('bla', apps)
	}
	
	const selectChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedOptionMonth(event.target.value);
	const selectChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedOptionYear(event.target.value);
	const uniqeMonths: number[] = Array.from(new Set(apps.map((app) => app.month))).sort((a: number, b: number)=> {return a - b});
	const uniqeYears: number[] = Array.from(new Set(apps.map((app: any) => app.year))).sort((a: number, b: number)=> {return a - b});

	const blabla: any = createRef();

	const pressHandler = useCallback(async(event)=> {
		event.preventDefault()
		console.log('bla', blabla.current.id)
	},[blabla])


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
								<option value={year}>{year}</option>
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
							<th>Goods</th>
							<th>Send Method</th>
							<th>City</th>
							<th>Recipient Data</th>
							<th>Payer</th>
							<th>Comments Sales</th>
						</tr>
					</thead>
					<tbody>
						{apps.map((app: IGetMyApps) => {
							if (selectedOptionMonth === app.month.toString() && selectedOptionYear === app.year.toString()) {
								return (
									<tr key={app.appId}>
										
										<td>
											
											<Modal id={app.appId.toString()} trigger={<Button node="button">MODAL</Button>}>
												{console.log('myId', app.appId)}
													<form onSubmit={pressHandler}>
														<input id={app.appId.toString()} type='text' ref={blabla} defaultValue={app.deliverPlaning}></input>
														<button >Submit</button>
													</form>
												
											</Modal>
										</td>
										<td style={{backgroundColor: Helper.setAppStatusColor(app.status)}}>{app.appId}</td>
										<td>{moment.utc(app.createAt).add(2, 'hours').format('YYYY-MM-DD HH:mm:ss')}</td>
										<td>{app.deliverPlaning}</td>
										<td>{app.goods}</td>
										<td>{app.sendMethod}</td>
										<td>{app.city}</td>	
										<td>{app.recipientData}</td>
										<td>{app.payer}</td>
										<td>{app.commentsSales}</td>
									</tr>
								);
							} else {
								return <>
									{message('problem')}
								</>
							}
						})}
					</tbody>
				</table>
				{/* { apps && <MyAppModal apps={apps} />} */}
			</div>
		</div>
		// <>
		// 	{!loading && apps && <GetMyApps apps={apps} />}
		// </>
	)
}

export default MyAppsUserPage;