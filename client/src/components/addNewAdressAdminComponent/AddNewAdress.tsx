import React, { useContext, useState } from 'react';
import { Loader } from '../../components/loader/Loader';
import { AuthContext } from '../../context/authContext';
import { useHttp } from '../../hooks/httpHook';
import { useMessage } from '../../hooks/messageHook';
import { ISetAdressProps } from '../../interface';

export const AddNewAdress: React.FC = () => {
    const [store, setStore] = useState<ISetAdressProps>({ nameStore: '', adressStore: '' })
    const message = useMessage();
    const {tokenAdmin} = useContext(AuthContext);
    const {request, loading} = useHttp();

    const setStoreChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setStore({...store, [event.target.name]: event.target.value});
    }

    const setStoreSubmitHandler = async () => {
        try {
            const data = await request('/api/add-store', 'POST', {...store}, {
                Authorization: `Bearer ${tokenAdmin}`
            });
            message(data.message);
            window.location.reload();
        } catch (error) {
            throw error
        }
    }

    if(loading){
		return <Loader />
	}

    return (
        <div className="row">
            <h3>Добавити адресу</h3>
            <div className='row'>
                <div className="input-field col s3">
                    <input 
                        name="nameStore"
                        id="nameStore" 
                        type="text" 
                        className="validate"
                        onChange={setStoreChangeHandler}
                    />
                    <label  htmlFor="nameStore">Назва складу чи офісу</label>
                </div>
                <div className="input-field col s9">
                    <input 
                        name="adressStore"
                        id="adressStore" 
                        type="text" 
                        className="validate"
                        onChange={setStoreChangeHandler}
                    />
                    <label  htmlFor="adressStore">Адреса складу чи офісу</label>
                </div>
                <div className="card-action center">
					<button 
						className="btn green black-text darken-3"
						onClick={setStoreSubmitHandler}
						disabled={loading}
						>Добавити
					</button>
				</div>
            </div>
        </div>
    )
}