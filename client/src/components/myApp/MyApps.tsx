import moment from "moment";
import React, { useCallback, useRef, useState } from "react";
// import { AuthContext } from "../../context/authContext";
import Helper from "../../helpers/Helper";
// import { useHttp } from "../../hooks/httpHook";
import { IGetMyApps } from "../../interface";
// import { MyAppModal } from "../myAppModal/MyAppModal";
import { useMessage } from "../../hooks/messageHook";
import { Modal, Button, TextInput  } from "react-materialize";


const monthNow = (moment().month() + 1).toString();
const yearNow = moment().year().toString();

export const GetMyApps: React.FC<{apps: IGetMyApps[]}> = ({apps}) => {
	const [selectedOptionMonth, setSelectedOptionMonth] = useState<String>(monthNow);
	const [selectedOptionYear, setSelectedOptionYear] = useState<String>(yearNow);
	// const [putApp, setPutApp] = useState()
	// const {request} = useHttp();
	// const {token} = useContext(AuthContext);
	const message = useMessage();

	// const putMyApp = useCallback(async () => {
	// 	try {
	// 		const fetched = await request('/api/change_my_app', 'PUT', null, {
	// 			Authorization: `Bearer ${token}`
	// 		});
	// 		setPutApp(fetched);
	// 	} catch (e) {}
	// 	}, [request, token]);
	
	// useEffect(() => {
	// 	putMyApp()
	// }, [putMyApp]);

	const selectChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedOptionMonth(event.target.value);
	const selectChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedOptionYear(event.target.value);
	const uniqeMonths: number[] = Array.from(new Set(apps.map((app) => app.month))).sort((a: number, b: number)=> {return a - b});
	const uniqeYears: number[] = Array.from(new Set(apps.map((app: any) => app.year))).sort((a: number, b: number)=> {return a - b});

	const blabla: any = useRef()

	const pressHandler = useCallback((e)=>{
		e.preventDefault()
		console.log(blabla.current)
	}, [blabla])

	// useEffect(() => {
	// 	window.M.AutoInit();
	// });

	return (
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
									<tr key={app.appId.toString()} >
										<td>
											<Modal id={app.appId.toString()} trigger={<Button node="button">MODAL</Button>}>
												<form  onSubmit={pressHandler}>
													<input id={app.appId.toString()} type='text' ref={blabla} defaultValue={app.deliverPlaning}></input>
													<button type='submit'>Submit</button>
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
	)
}
