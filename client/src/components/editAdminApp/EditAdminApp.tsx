import React from "react";


export const EditAdminApp: React.FC<{editFormData: any, handleEditFormChange: any, handleCancelClick: any}> = ({editFormData, handleEditFormChange, handleCancelClick}) => {
	return(
		<tr key={editFormData.appId} >
            <td>
				<span>{editFormData.appId}</span>
			</td>
			<td>
                <input 
					name="commentsLogist"  
					type="text" 
					value={editFormData.commentsLogist}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<span>{editFormData.updateAt}</span>
			</td>
			<td>
                <span>{editFormData.deliverPlaning}</span>
			</td>
			<td>
                <span>{editFormData.goods}</span>
			</td>
			<td>
                <span>{editFormData.sendMethod}</span>
			</td>
			<td>
                <span>{editFormData.city}</span>
			</td>
			<td>
                 <span>{editFormData.recipientData}</span>
			</td>
			<td>
                <span>{editFormData.payer}</span>
			</td>
			<td>
                <span>{editFormData.commentsSales}</span>
			</td>
			<td>
				<button 
					type="submit" 
					className="btn">
						Зберегти
				</button>
				<button
					type="button"
					className="btn"
					onClick={handleCancelClick}
				>
					Назад
				</button>
			</td>
		</tr>
	)
}
