import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";
import { IAdminProps } from "../../interface";


export const AdminData: React.FC<{admin: IAdminProps}> = ({admin}) => {

	useEffect(() => {
		window.M.AutoInit();
	   });
	return(
		<div className="col s3" style={{width: "20%"}}>
			<ul id="slide-out-admin" className="sidenav green darken-4" style={{paddingTop: '50px'}}>
				<li>
					<div className="user-view" >
						<span className="black-text name">{admin.firstName}  {admin.lastName}</span>
						<span className="black-text email">{admin.phoneNumber}</span>
					</div>
				</li>
				<li><div className="divider"></div></li>
				<li><NavLink className="waves-effect waves-light" to="/adress">Адреси</NavLink></li>
				<li><div className="divider"></div></li>
				<li><NavLink className="waves-effect waves-light" to="/workers">Workers</NavLink></li>
				<li><div className="divider"></div></li>
			</ul>
		</div>
	)
}