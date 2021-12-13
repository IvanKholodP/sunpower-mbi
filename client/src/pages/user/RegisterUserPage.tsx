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

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setForm({...form, [event.target.name]: event.target.value})
	}

	const numberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const re = /^[0-9\b]+$/;
		if (event.target.value === "" || re.test(event.target.value)) {
			setForm({ ...form, [event.target.name]: event.target.value });
		}
	  };
	const registrationHandler = async (event: React.FormEvent<HTMLFormElement> | React.BaseSyntheticEvent)=> {
		try{
			event.preventDefault();
			await request('/api/registration', 'POST', {...form})
			event.target.reset()
		} catch(e){
			return e
		}
	}

	useEffect(() => {
   		 window.M.updateTextFields()
  	}, [])

	return(
		<div className="row">
			<div className="col s6 offset-s3">
				<div className="card light-green darken-4">
					<form onSubmit={registrationHandler}>
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
										required
										minLength={3}
										maxLength={30}
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
										required
										minLength={3}
										maxLength={30}
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
										required
									/>
									<label  htmlFor="email">Email</label>
									<span className="helper-text" data-error="wrong"></span>
								</div>
								<div className="input-field col s6">
									<input 
										name="phoneNumber"
										id="telephone" 
										type="text" 
										className="validate"
										value={form.phoneNumber}
										onChange={numberChange}
										required
										onClick={(event: React.BaseSyntheticEvent) => event.target.value = 380}
										onFocus={(event: React.BaseSyntheticEvent) => event.target.value = 380}
										minLength={12}
										maxLength={12}
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
										required
										minLength={5}
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
										required
										minLength={5}
									/>
									<label htmlFor="retryPassword">Retry password</label>
								</div>
							</div>
						</div>
						<div className="card-action center">
							<a href="/auth" className="btn blue darken-5">Back</a>
							<button 
								type='submit'
								className="btn yellow black-text darken-5" 
								disabled={loading}
							>Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default RegisterUserPage;