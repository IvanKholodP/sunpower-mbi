import moment from "moment";
import React from "react";
import Helper from "../../helpers/Helper";
import { IGetMyApps } from "../../interface";

export const TableComponent: React.FC<{app: IGetMyApps, handleEditClick: any}> = ({app, handleEditClick})=> {
	return(
		<tr>						
			<td style={{backgroundColor: Helper.setAppStatusColor(app.status)}}>{app.appId}</td>
			<td>{moment.utc(app.createAt).add(2, 'hours').format('YYYY-MM-DD HH:mm:ss')}</td>
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
					onClick={(event) => {event.preventDefault(); handleEditClick(event, app)}}
				>
					Змінити+{app.status}
				</button>
     		</td>
		</tr>)
}