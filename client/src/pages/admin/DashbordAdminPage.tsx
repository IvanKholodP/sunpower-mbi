import moment from 'moment';
import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import { DashboardTableComponent } from '../../components/DashboardTableComponent/DashboardTableComponent';
import { EditAdminApp } from '../../components/editAdminApp/EditAdminApp';
import { Loader } from '../../components/loader/Loader';
import { AuthContext } from '../../context/authContext';
import { useHttp } from '../../hooks/httpHook';
import { useMessage } from '../../hooks/messageHook';
import { IGetAllApp, IGetMyApps } from '../../interface';

const monthNow = (moment().month() + 1).toString();
const yearNow = moment().year().toString();

declare let confirm: (question: string) => boolean;

const DashboardAdminPage: React.FC = () => {
    const auth = useContext(AuthContext);
	const message = useMessage();
	const [apps, setApps] = useState<IGetAllApp[]>([]);
	const [selectedOptionMonth, setSelectedOptionMonth] = useState<String>(monthNow);
	const [selectedOptionYear, setSelectedOptionYear] = useState<String>(yearNow);
	const [editFormData, setEditFormData] = useState({
		deliverPlaning: '', goods: '', sendMethod: '', city: '', recipientData: '', payer: '', commentsSales: '', updateAt: '', year: '', month: '', appId: '', commentsLogist: '', status: ''
	  });
	const [editAppId, setEditAppId] = useState(null);  
	const {loading, request} = useHttp();
	const {tokenAdmin} = useContext(AuthContext);

	const fetcMyApps = useCallback(async () => {
		try {
			const fetched = await request('/api/dashboard-apps', 'GET', null, {
				Authorization: `Bearer ${tokenAdmin}`
			});
			setApps(fetched);
		} catch (e) {}
		}, [request, tokenAdmin]);

	useEffect(() => {
		fetcMyApps()
	}, [fetcMyApps])

	const uniqeMonths: number[] = Array.from(new Set(apps.map((app) => app.month))).sort((a: number, b: number)=> {return a - b});
	const uniqeYears: number[] = Array.from(new Set(apps.map((app) => app.year))).sort((a: number, b: number)=> {return a - b});

	
	const selectChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedOptionMonth(event.target.value);

	const selectChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedOptionYear(event.target.value);

	const handleEditClick = (event: React.FormEvent<HTMLFormElement>, app: any) => {
		event.preventDefault();
		setEditAppId(app.appId);

		if (app.status < 4) {
			const formValues = {
				appId: app.appId,
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
				commentsLogist: app.commentsLogist,
				status: app.status
			};
		
			setEditFormData(formValues);
		} else {
			message("Заявку в процесі не можливо змінити");
		}
	

	  };


	const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setEditFormData({ ...editFormData,[event.target.name]: event.target.value });
	  };


	const handleEditFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	
		const editedApp: any = {
			appId: editAppId,
			status: editFormData.status,
			commentsLogist: editFormData.commentsLogist,
		};
		const newApps = [...apps];
	
		const index = apps.findIndex((app: IGetMyApps) => app.appId === editAppId);
		newApps[index] = editedApp;
	
		setApps(newApps);
		setEditAppId(null);

		try {
			const data = await request('/api/dashboard-change-app', 'PUT', {...editedApp}, {
				Authorization: `Bearer ${auth.tokenAdmin}`
			  })
			message(data.message);
			window.location.reload()
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
					const data = await request('/api/dashboard-delete_app', 'PUT', {...deleteAppId}, {
						Authorization: `Bearer ${auth.tokenAdmin}`
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
		<div className="col s12">
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
								<th>№ заявки</th>
								<th>Статус відправки</th>
								<th>Коментар логіста</th>
								<th>Дата створення</th>
								<th>Планова дата доставки</th>
								<th>Вантаж</th>
								<th>Метод відправки</th>
								<th>Місто</th>
								<th>Дані отримувача</th>
								<th>Платник</th>
								<th>Коментар менеджера</th>
								<th>Кнопки</th>
							</tr>
						</thead>
						<tbody>
							{apps.map((app: IGetMyApps) => {
								if (selectedOptionMonth === app.month + '' && selectedOptionYear === app.year + '') {
									console.log(app.year)
									return (
										<Fragment>
											{editAppId === app.appId && app.status === 1? 
												(<EditAdminApp
													editFormData={editFormData} 
													handleEditFormChange={handleEditFormChange}
													handleCancelClick={handleCancelClick}
												/>
													) : (
												<DashboardTableComponent 
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

export default DashboardAdminPage;