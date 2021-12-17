import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { useHttp } from '../../hooks/httpHook';
import { useMessage } from '../../hooks/messageHook';

const AuthAdminPage: React.FC = () => {
    const auth = useContext(AuthContext);
	const message = useMessage();
	const {request, loading, error, clearError} = useHttp();
    const [form, setForm] = useState({
		phoneNumber: '', password: ''
    });

    useEffect(()=>{
		message(error);
		clearError();
	}, [error, message, clearError]);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setForm({...form, [event.target.name]: event.target.value});
    }
    
    const pressHandler = async (event: React.KeyboardEvent) => {
		if(event.key === 'Enter') {
			try{
				const data: any = await request('/api/authAdmin', 'POST', {...form});
                auth.loginAdmin(data.tokenAdmin, data.adminId);
			} catch(e){
				return e;
			}
		}
	}
	const authHandler = async ()=> {
		try{
			const data: any = await request('/api/authAdmin', 'POST', {...form});
            auth.loginAdmin(data.tokenAdmin, data.adminId);
		} catch(e){
			return e;
		}
	}
    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card purple darken-4">
                    <div className="card-content white-text center">
                        <span className="card-title">Authorization Admin</span>
                        <div className="row">
                            <div className="input-field col s12">
                                <input 
                                    name="phoneNumber"
                                    id="phoneNumber" 
                                    type="text" 
                                    className="validate"
                                    onChange={changeHandler}
                                />
                                <label  htmlFor="phoneNumber">Phone Number</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    name="password"
                                    id="password" 
                                    type="password" 
                                    className="validate"
                                    onChange={changeHandler}
                                    onKeyPress={pressHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action center">
                        <button 
                            className="btn yellow black-text darken-5"
                            onClick={authHandler}
                            disabled={loading}
                            >Log in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthAdminPage;