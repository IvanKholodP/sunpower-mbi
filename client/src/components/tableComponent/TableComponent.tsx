import moment from "moment";
import React from "react";
import Helper from "../../helpers/Helper";
import { IGetMyApps } from "../../interface";

export const TableComponent: React.FC<{app: IGetMyApps, handleEditClick: any, handleDeleteClick: any}> = ({app, handleEditClick, handleDeleteClick})=> {
	return(
		<tr key={app.appId} >	
			<td style={{textAlign: 'center'}}>{app.appId}</td>					
			<td style={{backgroundColor: Helper.setAppStatusColor(app.status)}}>{app.commentsLogist}</td>
			<td>{moment.utc(app.createAt).add(2, 'hours').format('DD.MM.YYYY HH:mm:ss')}</td>
			<td>{app.deliverPlaning}</td>
			<td>{app.goods}</td>
			<td>{app.sendMethod}</td>
			<td>{app.city}</td>	
			<td>{app.recipientData}</td>
			<td>{app.payer}</td>
			<td>{app.commentsSales}</td>
			<td>
				<button
					type="button"
					className="btn"
					onClick={(event: React.BaseSyntheticEvent) => {event.preventDefault(); handleEditClick(event, app)}}
				><i className="large material-icons">mode_edit</i>
				</button>
				<button
					type="button"
					className="btn red darken-3"
					onClick={(event: React.BaseSyntheticEvent) => {event.preventDefault(); handleDeleteClick(event, app)}}
				><i className="large material-icons">delete_forever</i>
				</button>
			</td>
		</tr>
	)
}