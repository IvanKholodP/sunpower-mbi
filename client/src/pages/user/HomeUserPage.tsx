import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHook";
import { useMessage } from "../../hooks/messageHook";
import { IAdressProps } from "../../interface";
import qr from '../../../src/qr-code.svg'


const WorkerUserPage: React.FC = () => {

	const [adresses, setAdresses] = useState<IAdressProps[]>([]);
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

    return(
		<div className='row'>
			<div className="col s12"><h4 className='center'>Тут розміщено основну інформацію</h4></div>
			<div className='col s6 red center'>
				<h4>Наявність товару на складі ДСВ</h4>
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