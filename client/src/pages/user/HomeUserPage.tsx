import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHook";
import { useMessage } from "../../hooks/messageHook";
import { IAdressProps, IGetProductsProps } from "../../interface";
import qr from '../../../src/qr-code.svg'
import Helper from "../../helpers/Helper";


const WorkerUserPage: React.FC = () => {
	const [adresses, setAdresses] = useState<IAdressProps[]>([]);
	const [products, setProducts] = useState<IGetProductsProps[]>([]);
    const message = useMessage();
    const {loading, request} = useHttp();
	const {token} = useContext(AuthContext);
    const fetchAdress = useCallback(async () => {
        try {
            const fetched = await request('/api/get-storage-user', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setAdresses(fetched);
        } catch (e) {}
    }, [request, token]);
    
    useEffect(() => {
        fetchAdress()
	}, [fetchAdress])
	
	const fetchProduct = useCallback(async () => {
        try {
            const fetched = await request('/api/get-user-products', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setProducts(fetched);
        } catch (e) {}
    }, [request, token]);
    
    useEffect(() => {
        fetchProduct()
    }, [fetchProduct])

    return(
		<div className='row'>
			<div className="col s12"><h4 className='center'>Тут розміщено основну інформацію</h4></div>
			<div className='col s6 center'>
				<h4>Наявність товару на складі ДСВ</h4>
				<div>
					<table>
						<thead>
							<tr>
								<th>Тип</th>
								<th>Назва</th>
								<th style={{textAlign: 'center'}}>Потужність</th>
								<th style={{textAlign: 'center'}}>Вільно</th>
								<th style={{textAlign: 'center'}}>Фактично на складі</th>
								<th style={{textAlign: 'center'}}>Коментар</th>
								<th style={{textAlign: 'center'}}>Вільно kWt</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product)=>{
								return(
									<tr key={product.productId}>
										<td>{Helper.setNameProduct(product.type)}</td>
										<td>{product.producer} {product.series}</td>
										<td style={{textAlign: 'center'}}>{product.power}</td>
										<td style={{textAlign: 'center', color: 'green'}}>{product.free}</td>
										<td style={{textAlign: 'center', fontWeight: 'bold'}}>{product.actualy}</td>
										<td style={{textAlign: 'center'}}>{product.comments}</td>
										<td style={{textAlign: 'center', color: 'green'}}>{product.kWt}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>
			<div className='col s3 center'>
				<h4>Telegram bot</h4>
				<img src={qr} alt="" width='200'/>
			</div>
			<div className='col s3 center'>
				<h2>Адреси</h2>
				<ul>
					{adresses.map((adress)=> {
						return(
							<li>
								<h4>{adress.nameStore}</h4>
								<h6>{adress.adressStore}</h6>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
    )
}

export default WorkerUserPage;