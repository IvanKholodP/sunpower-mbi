import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/httpHook";
import { useMessage } from "../../hooks/messageHook";
import {AuthContext} from "../../context/authContext";

const AuthUserPage: React.FC = () => {
	const auth = useContext(AuthContext);
	const message = useMessage();
	const {request, loading, error, clearError} = useHttp();
	const [form, setForm] = useState({
		email: '', password: ''
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
				const data: any = await request('/api/auth', 'POST', {...form});
				auth.login(data.token, data.userId);
			} catch(e){
				return e;
			}
		}
	}
	const authHandler = async ()=> {
		try{
			const data: any = await request('/api/auth', 'POST', {...form});
			auth.login(data.token, data.userId);
		} catch(e){
			return e;
		}
	}


	return(
		<div className="row">
			<div className="col s6 offset-s3">
				<div className="card teal darken-2">
					<div className="card-content white-text center">
						<span className="card-title">Authorization</span>
						<div className="row">
							<div className="input-field col s12">
								<input 
									name="email"
									id="email" 
									type="email" 
									className="validate"
									onChange={changeHandler}
								/>
								<label  htmlFor="email">Email</label>
								<span className="helper-text" data-error="wrong"></span>
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
						<a href="/registration" className="btn blue darken-5">Register</a>
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

export default AuthUserPage;