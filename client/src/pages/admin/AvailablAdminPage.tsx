import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import { AddNewProduct } from '../../components/addNewProduct/AddNewProduct';
import { EditProduct } from '../../components/EditAdminProduct/EditProduct';
import { Loader } from '../../components/loader/Loader';
import { ProductTable } from '../../components/ProductTableComponent/ProductTable';
import { AuthContext } from '../../context/authContext';
import { useHttp } from '../../hooks/httpHook';
import { useMessage } from '../../hooks/messageHook';
import { IGetProductsProps } from '../../interface';

declare let confirm: (question: string) => boolean;

const AvailablAdminPage: React.FC = () => {
	const [products, setProducts] = useState<IGetProductsProps[]>([])
	const message = useMessage();
	const {loading, request} = useHttp();
	const {tokenAdmin} = useContext(AuthContext);

	const fetchProducts = useCallback(async () => {
	try {
		const fetched = await request('/api/get-admin-products', 'GET', null, {
			Authorization: `Bearer ${tokenAdmin}`
		});
		setProducts(fetched);
	} catch (e) {}
	}, [request, tokenAdmin]);

	useEffect(() => {
		fetchProducts()
	}, [fetchProducts])

	const [editProductId, setEditProductId] = useState(null);
	const [editFormData, setEditFormData] = useState({
		productId: '', type: '',  producer: '', series: '', power: '', free: '', actualy: '', comments: '', kWt: '', status: ''
	});

	const handleEditClick = (event: React.FormEvent<HTMLFormElement>, product: any) => {
		event.preventDefault();
		setEditProductId(product.productId);
		
		const formValues = {
			productId: product.productId,
            type: product.type,
            producer: product.producer,
            series: product.series,
            power: product.power,
			free: product.free,
			actualy: product.actualy,
            comments: product.comments,
            kWt: product.kWt,
			status: product.status
		};
		setEditFormData(formValues);
	};

	const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setEditFormData({ ...editFormData,[event.target.name]: event.target.value });
	};

	const handleEditFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	
		const editedProduct: any = {
			productId: editProductId,
			free: editFormData.free,
			actualy: editFormData.actualy,
            comments: editFormData.comments,
		};
		const newProduct = [...products];
	
		const index = products.findIndex((product: IGetProductsProps) => product.productId === editProductId);
		newProduct[index] = editedProduct;
	
		setProducts(newProduct);
		setEditProductId(null);

		try {
			const data = await request('/api/change-admin-product', 'PUT', {...editedProduct}, {
				Authorization: `Bearer ${tokenAdmin}`
			})
			message(data.message);
			window.location.reload();
		} catch (error) {
			console.log(error)
		}
	};

	const handleCancelClick = () => setEditProductId(null);

	const handleDeleteClick = async (event: React.FormEvent<HTMLFormElement>, deleteProductId) => {
		event.preventDefault();
		try {
			const shoudRemove = confirm('Ви дійсно хочете видалити даний продукт?')
			if (shoudRemove) {
				const data = await request('/api/delete-admin-product', 'PUT', {...deleteProductId}, {
					Authorization: `Bearer ${tokenAdmin}`
				});
				message(data.message);
				window.location.reload();
			}
		} catch (error) {
			console.log(error)
		}
	}

	if(loading){
		return <Loader />
	}

	return(
		<div className='row'>
			<div>
				{<AddNewProduct />}
			</div>
			<div className='container'>
				<div className='col s12 center'>
					<h3>Змінити або видалити продукт</h3>
					<div>
						<form onSubmit={handleEditFormSubmit}>
							<table className="highlight">
								<thead>
									<tr>
										<th>Тип</th>
										<th style={{textAlign: 'center'}}>Назва</th>
										<th style={{textAlign: 'center'}}>Потужність</th>
										<th style={{textAlign: 'center'}}>Вільно</th>
										<th style={{textAlign: 'center'}}>Фактично на складі</th>
										<th style={{textAlign: 'center'}}>Коментар</th>
										<th style={{textAlign: 'center'}}>Вільно kWt</th>
										<th style={{textAlign: 'center'}}>Кнопки</th>
									</tr>
								</thead>
								<tbody>
									{products.map((product)=>{
										return (
											<Fragment>
												{editProductId === product.productId ? <EditProduct 
													handleEditFormChange={handleEditFormChange}
													editFormData={editFormData}
													handleCancelClick={handleCancelClick}
												/> : <ProductTable 
													product={product} 
													handleEditClick={handleEditClick}
													handleDeleteClick={handleDeleteClick}
												/>}
											</Fragment>
										);
									})}
								</tbody>
							</table>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AvailablAdminPage;