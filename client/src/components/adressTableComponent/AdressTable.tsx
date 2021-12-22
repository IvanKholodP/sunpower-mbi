import React from 'react';
import { IAdressProps } from '../../interface';

export const AdressTable: React.FC<{adress: IAdressProps, handleEditClick: any, handleDeleteClick: any}> = ({adress, handleEditClick, handleDeleteClick}) => {
    return(
        <tr key={adress.adressId} >
            <td>{adress.nameStore}</td>
            <td>{adress.adressStore}</td>
            <td>
				<button
					type="button"
					className="btn"
					onClick={(event: React.BaseSyntheticEvent) => {event.preventDefault(); handleEditClick(event, adress)}}
				><i className="large material-icons">mode_edit</i>
				</button>
				<button
					type="button"
					className="btn red"
					onClick={(event: React.BaseSyntheticEvent) => {event.preventDefault(); handleDeleteClick(event, adress)}}
				><i className="large material-icons">delete_forever</i>	
				</button>
     		</td>
        </tr>
    )
}