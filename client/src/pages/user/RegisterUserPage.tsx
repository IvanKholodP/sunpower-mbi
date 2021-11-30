import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/httpHook";
import { useMessage } from "../../hooks/messageHook";

const RegisterUserPage: React.FC = () => {
	const message = useMessage();
	const {request, loading, error, clearError} = useHttp();
	const [form, setForm] = useState({
		firstName: '', lastName: '', email: '', phoneNumber: '', password: '', retryPassword: '',
	});

	useEffect(()=>{
		message(error)
		clearError()
	}, [error, message, clearError]);

	const changeHandler = (event: any) => {
		setForm({...form, [event.target.name]: event.target.value})
	}

	const registrationHandler = async ()=> {
		try{
			await request('/api/registration', 'POST', {...form})
		} catch(e){
			return e
		}
	}

	return(
		<div className="row">
			<div className="col s6 offset-s3">
				<div className="card light-green darken-4">
					<div className="card-content white-text center">
						<span className="card-title">Registration</span>
						<div className="row">
							<div className="input-field col s6">
								<input 
									name="firstName"
									id="firstName" 
									type="text" 
									className="validate"
									onChange={changeHandler}
								/>
								<label htmlFor="firstName">First Name</label>
							</div>
							<div className="input-field col s6">
								<input 
									name="lastName"
									id="lastName" 
									type="text" 
									className="validate"
									onChange={changeHandler}
								/>
								<label htmlFor="lastName">Last Name</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s6">
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
							<div className="input-field col s6">
								<input 
									name="phoneNumber"
									id="telephone" 
									type="tel" 
									className="validate"
									onChange={changeHandler}
								/>
								<label htmlFor="telephone">Phone number</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s6">
								<input
									name="password"
									id="password" 
									type="password" 
									className="validate"
									onChange={changeHandler}
								/>
								<label htmlFor="password">Password</label>
							</div>
							<div className="input-field col s6">
								<input 
									name="retryPassword"
									id="retryPassword" 
									type="password" 
									className="validate"
									onChange={changeHandler}
								/>
								<label htmlFor="retryPassword">Retry password</label>
							</div>
						</div>
					</div>
					<div className="card-action center">
						<a href="/auth" className="btn blue darken-5">Back</a>
						<button 
							className="btn yellow black-text darken-5" 
							onClick={registrationHandler} 
							disabled={loading}
							>Register
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RegisterUserPage;