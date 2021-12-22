import React from 'react';

export const EditAdress: React.FC<{handleEditFormChange: any, editFormData: any, handleCancelClick: any}> = ({handleEditFormChange, editFormData, handleCancelClick}) => {
    return(
		<tr key={editFormData.adressId} >
			<td>
                <input 
					name="nameStore"  
					type="text" 
					value={editFormData.nameStore}
					onChange={handleEditFormChange}
				/>
			</td>
            <td>
                <input 
					name="adressStore"  
					type="text" 
					value={editFormData.adressStore}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<button 
					type="submit" 
					className="btn green"
                ><i className="large material-icons">save</i>
				</button>
				<button
					type="button"
					className="btn grey"
					onClick={handleCancelClick}
				><i className="large material-icons">cancel</i>
				</button>
			</td>
		</tr>
	)
}