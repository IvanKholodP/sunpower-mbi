import React, {useRef, useEffect, useCallback, useContext, useState} from "react";
import { AuthContext } from "../../context/authContext";
import { IGetMyApps } from "../../interface";

import { useMessage } from "../../hooks/messageHook";

export const MyAppModal: React.FC<{apps: IGetMyApps[]}> = ({apps})=> {
	const message = useMessage();
	const deliverPlaning = useRef<HTMLInputElement>(null);
	const {token} = useContext(AuthContext)
	let [form, setForm] = useState<string|object>()

	const pressHandler = (event:  React.BaseSyntheticEvent) => {
		try {
			event.preventDefault()
			console.log(deliverPlaning.current)
		} catch(e) {}
	}

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		// setForm(form, [event.target.name: event.target.value);
		console.log(event.target.defaultValue)
	}

	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	// useEffect(() => {
	// 	window.M.AutoInit();
	// });

	return(
		<><h1>sdljcnsdjncjsdn</h1></>
		// <>
		// {apps.map((app: IGetMyApps) => {
		// 	form = {
		// 		deliverPlaning: app.deliverPlaning
		// 	}
		// 	if (app.status === 1) {
				
		// 		return (
		// 			<div id={app.appId.toString()} className="modal" style={{background: "green"}}>
		// 				<div className="modal-content" style={{ color: "black", background: "#eeeeee"}}>
		// 					<h4 style={{textAlign: 'center', fontWeight: 500}}>Enter the application data</h4>
		// 					<form className="col s12">
		// 						<div className="row">
		// 							<div className="input-field col s6">
		// 								<input 
		// 									name='deliverPlaning'
		// 									type="text"
		// 									// value={app.deliverPlaning}
		// 									className="validate sky-input"
		// 									ref={deliverPlaning}
		// 									defaultValue={app.deliverPlaning}
		// 									// onChange={changeHandler}
		// 								/>
		// 								{/* {form.errors.deliverPlaning.length > 0 && (
		// 								<span className="error">{form.errors.deliverPlaning}</span>
		// 								)} */}
		// 								<label className="active" htmlFor="deliverPlaning">Deliver planing</label>
		// 							</div>
		// 							<div className="input-field col s6">
		// 								<input
		// 									name='goods'
		// 									id="goods" 
		// 									type="text" 
		// 									className="validate sky-input"
		// 									defaultValue={app.goods}
		// 									// onChange={changeHandler}
		// 									/>
		// 								<label htmlFor="goods">Goods</label>
		// 								{/* {form.errors.goods.length > 0 && (
		// 								<span className="error">{form.errors.goods}</span>
		// 								)} */}
		// 							</div>
		// 						</div>
		// 						<div className="row">
		// 							<div className="input-field col s6">
		// 								<input
		// 									name='sendMethod'
		// 									id="sendMethod" 
		// 									type="text" 
		// 									className="validate sky-input"
		// 									defaultValue={app.sendMethod}
		// 									// onChange={changeHandler}
		// 								/>
		// 								<label htmlFor="sendMethod">Send method</label>
		// 								{/* {form.errors.sendMethod.length > 0 && (
		// 								<span className="error">{form.errors.sendMethod}</span>
		// 								)} */}
		// 							</div>
		// 							<div className="input-field col s6">
		// 								<input
		// 									name='city'
		// 									id="city"
		// 									type="text"
		// 									className="validate sky-input"
		// 									defaultValue={app.city}
		// 									// onChange={changeHandler}
		// 								/>
		// 								<label htmlFor="city">City</label>
		// 								{/* {form.errors.city.length > 0 && (
		// 								<span className="error">{form.errors.city}</span>
		// 								)} */}
		// 							</div>
		// 						</div>
		// 						<div className="row">
		// 							<div className="input-field col s6">
		// 								<input
		// 									name='recipientData'
		// 									id="recipientData" 
		// 									type="text" 
		// 									className="validate sky-input"
		// 									defaultValue={app.recipientData}
		// 									// onChange={changeHandler}
		// 								/>
		// 								<label htmlFor="recipientData">Recipient data</label>
		// 								{/* {form.errors.recipientData.length > 0 && (
		// 									<span className="error">{form.errors.recipientData}</span>
		// 								)} */}
		// 							</div>
		// 							<div className="input-field col s6">
		// 								<select
		// 									name='payer'
		// 									id="payer"
		// 									className="validate sky-input"
		// 									defaultValue={app.payer}
		// 									// onChange={changeHandler}
		// 									>
		// 										<option value="recipient">Recipient</option>
		// 										<option value="sender">Sender</option>
		// 								</select>
		// 							</div>
		// 						</div>
		// 						<div className="row">
		// 							<div className="input-field col s12">
		// 								<input
		// 									name='commentsSales'
		// 									id="commentsSales"
		// 									type="email"
		// 									className="validate sky-input"
		// 									defaultValue={app.commentsSales}
		// 									// onChange={changeHandler}
		// 								/>
		// 								<label htmlFor="commentsSales">Comments sales</label>
		// 							</div>
		// 						</div>
		// 					</form>
		// 				</div>
		// 				<div className="modal-footer">
		// 					<button
		// 						className="red waves-effect waves-green btn-flat">
		// 						reset
		// 					</button>
		// 					<button
		// 						className="btn green black-text darken-5 waves-effect waves-green btn-flat"
		// 						onClick={pressHandler}
		// 						>
		// 						Submit
		// 					</button>
		// 				</div>
		// 			</div>
		// 		);
		// 	} else {
		// 		return <>
		// 			{message('ajh')}
		// 		</>
		// 	}
		// })}
		// </>
	)
}