import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import { AddNewAdress } from '../../components/addNewAdressAdminComponent/AddNewAdress';
import { AdressTable } from '../../components/adressTableComponent/AdressTable';
import { EditAdress } from '../../components/editAdressAdminComponent/EditAddres';
import { Loader } from '../../components/loader/Loader';
import { AuthContext } from '../../context/authContext';
import { useHttp } from '../../hooks/httpHook';
import { useMessage } from '../../hooks/messageHook';
import { IAdressProps } from '../../interface';

declare let confirm: (question: string) => boolean;

const AdressAdminPage: React.FC = () => {
    const [adresses, setAdresses] = useState<IAdressProps[]>([])
    const message = useMessage();
    const {loading, request} = useHttp();
	const {tokenAdmin} = useContext(AuthContext);

	const fetchAdress = useCallback(async () => {
	try {
		const fetched = await request('/api/get-storage', 'GET', null, {
			Authorization: `Bearer ${tokenAdmin}`
		});
		setAdresses(fetched);
	} catch (e) {}
	}, [request, tokenAdmin]);

	useEffect(() => {
		fetchAdress()
	}, [fetchAdress])

    const [editAdressId, setEditAdressId] = useState(null);
    const [editFormData, setEditFormData] = useState({
		adressId: '', nameStore: '', adressStore: ''
	  });

	const handleEditClick = (event: React.FormEvent<HTMLFormElement>, adress: any) => {
		event.preventDefault();
		setEditAdressId(adress.adressId);
        
        const formValues = {
			adressId: adress.adressId,
			nameStore: adress.nameStore,
			adressStore: adress.adressStore,
		};
		setEditFormData(formValues);
    };

    const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setEditFormData({ ...editFormData,[event.target.name]: event.target.value });
    };

    const handleEditFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	
		const editedAdress: any = {
			adressId: editAdressId,
			nameStore: editFormData.nameStore,
			adressStore: editFormData.adressStore,
		};
		const newAdress = [...adresses];
	
		const index = adresses.findIndex((adress: IAdressProps) => adress.adressId === editAdressId);
		newAdress[index] = editedAdress;
	
		setAdresses(newAdress);
		setEditAdressId(null);

		try {
			const data = await request('/api/change-storage', 'PUT', {...editedAdress}, {
				Authorization: `Bearer ${tokenAdmin}`
			  })
			message(data.message);
			window.location.reload();
		} catch (error) {
			console.log(error)
		}
    };
    
    const handleCancelClick = () => setEditAdressId(null);

    const handleDeleteClick = async (event: React.FormEvent<HTMLFormElement>, deleteAdressId) => {
		event.preventDefault();
		try {
			const shoudRemove = confirm('Ви дійсно хочете видалити дану адресу?')
			if (shoudRemove) {
				const data = await request('/api/delete-storage', 'PUT', {...deleteAdressId}, {
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
        <div className="container center">
            {!loading && <AddNewAdress />}
            <div className="row">
                <h3>Змінити або видалити адресу адресу</h3>
                <div>
                    <form onSubmit={handleEditFormSubmit}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Назва складу</th>
                                    <th>Адреса складу</th>
                                    <th>Кнопки</th>
                                </tr>
                            </thead>
                            <tbody>
                                {adresses.map((adress)=>{
                                    return (
                                        <Fragment>
                                            {editAdressId === adress.adressId ? <EditAdress 
                                                handleEditFormChange={handleEditFormChange}
                                                editFormData={editFormData}
                                                handleCancelClick={handleCancelClick}
                                            /> : <AdressTable 
                                                adress={adress} 
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
    )
}
export default AdressAdminPage;
