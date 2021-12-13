import React, { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../../components/loader/Loader";
import {TableComponent} from '../../components/tableComponent/TableComponent'
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHook";
import { IGetMyApps } from "../../interface";
import moment from "moment";
import { EditMyApp } from "../../components/editMyApp/EditMyApp";
import { useMessage } from "../../hooks/messageHook";

const monthNow = (moment().month() + 1).toString();
console.log(monthNow)
const yearNow = moment().year().toString();

declare let confirm: (question: string) => boolean;

const MyAppsUserPage: React.FC = () => {
	const auth = useContext(AuthContext);
	const message = useMessage();
	const [apps, setApps] = useState<IGetMyApps[]>([]);
	const [selectedOptionMonth, setSelectedOptionMonth] = useState<String>(monthNow);
	const [selectedOptionYear, setSelectedOptionYear] = useState<String>(yearNow);
	const [editFormData, setEditFormData] = useState({
		deliverPlaning: '', goods: '', sendMethod: '', city: '', recipientData: '', payer: '', commentsSales: '', updateAt: '', year: '', month: ''
	  });
	const [editAppId, setEditAppId] = useState(null);  
	const {loading, request} = useHttp();
	const {token} = useContext(AuthContext);

	const fetcMyApps = useCallback(async () => {
		try {
			const fetched = await request('/api/myapps', 'GET', null, {
				Authorization: `Bearer ${token}`
			});
			setApps(fetched);
		} catch (e) {}
		}, [request, token]);

	useEffect(() => {
		fetcMyApps()
	}, [fetcMyApps])

	const uniqeMonths: number[] = Array.from(new Set(apps.map((app) => app.month))).sort((a: number, b: number)=> {return a - b});
	const uniqeYears: number[] = Array.from(new Set(apps.map((app) => app.year))).sort((a: number, b: number)=> {return a - b});

	
	const selectChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
		//event.preventDefault()
		setSelectedOptionMonth(event.target.value);
		console.log(event.target.value)
	} 

	const selectChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
		// event.preventDefault()
		setSelectedOptionYear(event.target.value);
		console.log(event.target.value)
	}

	const handleEditClick = (event: React.FormEvent<HTMLFormElement>, app: any) => {
		event.preventDefault();
		setEditAppId(app.appId);
	
		const formValues = {
			deliverPlaning: app.deliverPlaning,
			goods: app.goods,
			sendMethod: app.sendMethod,
			city: app.city,
			recipientData: app.recipientData,
			payer: app.payer,
			commentsSales: app.commentsSales,
			updateAt: app.updateAt,
			year: app.year,
			month: app.month,
		};
	
		setEditFormData(formValues);
	  };


	const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setEditFormData({ ...editFormData,[event.target.name]: event.target.value });
	  };


	const handleEditFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	
		const editedApp: any = {
			appId: editAppId,
			deliverPlaning: editFormData.deliverPlaning,
			goods: editFormData.goods,
			sendMethod: editFormData.sendMethod,
			city: editFormData.city,
			recipientData: editFormData.recipientData,
			payer: editFormData.payer,
			commentsSales: editFormData.commentsSales,
			updateAt: moment().format(),
			year: editFormData.year,
			month: editFormData.month,
		};
	
		const newApps = [...apps];
	
		const index = apps.findIndex((app: IGetMyApps) => app.appId === editAppId);
		newApps[index] = editedApp;
	
		setApps(newApps);
		setEditAppId(null);

		try {
			const data = await request('/api/change_myApp', 'PUT', {...editedApp}, {
				Authorization: `Bearer ${auth.token}`
			  })
			message(data.message);
		} catch (error) {
			console.log(error)
		}
	};

	const handleCancelClick = () => {
		setEditAppId(null)
	}

	const handleDeleteClick = async (event: React.FormEvent<HTMLFormElement>, deleteAppId) => {
		event.preventDefault();
		try {
			if (deleteAppId.status > 1) {
				message('Заявку в процесі не можливо видалити')
			} else {
					const shoudRemove = confirm('Ви дійсно хочете видалити дану заявку?')
					if (shoudRemove) {
					const data = await request('/api/delete_myApp', 'PUT', {...deleteAppId}, {
						Authorization: `Bearer ${auth.token}`
					});
					message(data.message);
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		window.M.AutoInit();
	});
	
	if(loading){
		return <Loader />
	}

	return(
		<div className="col s9" style={{width: '80%'}}>
			<div className="input-field col s3">
				<select defaultValue={monthNow} onChange={selectChangeMonth} >
					{uniqeMonths.map((month: number) => {
						return (
							<option value={month}>
								{moment().month(month - 1).format("MMMM")}
							</option>
						);
					})}
				</select>
				<label>Choose the Month</label>
			</div>
			<div className="input-field col s3">
				<select defaultValue={yearNow} onChange={selectChangeYear}>
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
				<form onSubmit={handleEditFormSubmit}> 
					<table>
						<thead>
							<tr key={Math.random()}>
								<th>Comments Logist</th>
								<th>Create App</th>
								<th>deliverPlaning</th>
								<th>Goods</th>
								<th>Send Method</th>
								<th>City</th>
								<th>Recipient Data</th>
								<th>Payer</th>
								<th>Comments Sales</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{apps.map((app: IGetMyApps) => {
								if (selectedOptionMonth === app.month + '' && selectedOptionYear === app.year + '') {
									console.log(app.year)
									return (
										<Fragment>
											{editAppId === app.appId && app.status === 1? 
												(<EditMyApp
													editFormData={editFormData} 
													handleEditFormChange={handleEditFormChange}
													handleCancelClick={handleCancelClick}
												/>
													) : (
												<TableComponent 
													app={app} 
													key={app.appId} 
													handleEditClick={handleEditClick}
													handleDeleteClick={handleDeleteClick}
												/>
												)
											}
										</Fragment>
									);
								} else {
									return <></>
								}
							})}
						</tbody>
					</table>
				</form>
			</div>
		</div>
	)
}

export default MyAppsUserPage;