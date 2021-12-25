import React from 'react';
import { IGetProductsProps } from '../../interface';

export const ProductTable: React.FC<{product: IGetProductsProps, handleEditClick: any, handleDeleteClick: any}> = ({product, handleEditClick, handleDeleteClick}) => {
	return(
		<tr key={product.productId}>
			<td>{product.type}</td>
			<td>{product.producer} {product.series}</td>
			<td style={{textAlign: 'center', color: 'blue', fontWeight: 'bold'}}>{product.power}</td>
			<td style={{textAlign: 'center' , color: 'green', fontWeight: 'bold'}}>{product.free}</td>
			<td style={{textAlign: 'center', fontWeight: 'bold'}}>{product.actualy}</td>
			<td style={{textAlign: 'center'}}>{product.comments}</td>
			<td style={{textAlign: 'center', color: 'green', fontWeight: 'bold'}}>{product.kWt}</td>
			<td className='center'>
				<button
					type="button"
					className="btn"
					onClick={(event: React.BaseSyntheticEvent) => {event.preventDefault(); handleEditClick(event, product)}}
				><i className="large material-icons">mode_edit</i>
				</button>
				<button
					type="button"
					className="btn red"
					onClick={(event: React.BaseSyntheticEvent) => {event.preventDefault(); handleDeleteClick(event, product)}}
				><i className="large material-icons">delete_forever</i>	
				</button>
			</td>
		</tr>
	)
}