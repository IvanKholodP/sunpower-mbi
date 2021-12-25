import React from "react";
import Helper from "../../helpers/Helper";


export const EditProduct: React.FC<{editFormData: any, handleEditFormChange: any, handleCancelClick: any}> = ({editFormData, handleEditFormChange, handleCancelClick}) => {
	return(
		<tr key={editFormData.productId} >
			<td>
				<span>{Helper.setNameProduct(editFormData.type)}</span>
			</td>
			<td>
				<span>{editFormData.producer} {editFormData.series}</span>
			</td>
			<td style={{textAlign: 'center'}}>
				<span>{editFormData.power}</span>
			</td>
			<td>
				<input 
					name="free"  
					type="number" 
					value={editFormData.free}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input 
					name="actualy"  
					type="number" 
					value={editFormData.actualy}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input 
					name="comments"  
					type="text" 
					value={editFormData.comments}
					onChange={handleEditFormChange}
				/>
			</td>
			<td style={{textAlign: 'center'}}>
				<span>{editFormData.kWt}</span>
			</td>
			<td className='center'>
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
