import React from "react";
import { NavLink } from "react-router-dom";
import { IUserProps } from "../../interface";

export const UserData: React.FC<{user: IUserProps}> = ({user}) => {
	return(
		<div className="col s3" style={{width: "20%"}}>
			<ul id="slide-out" className="sidenav sidenav-fixed blue-grey lighten-1 " style={{paddingTop: '50px'}}>
				<li>
					<div className="user-view" >
						<span className="black-text name">{user.firstName}  {user.lastName}</span>
						<span className="black-text email">{user.email}</span>
					</div>
				</li>
				<li><div className="divider"></div></li>
				<li><NavLink className="waves-effect waves-light" to="/myapps">My App</NavLink></li>
				<li><div className="divider"></div></li>
				<li><NavLink className="waves-effect waves-light" to="/applications">Applications</NavLink></li>
				<li><div className="divider"></div></li>
				<li><NavLink className="waves-effect waves-light" to="/workers">Workers</NavLink></li>
				<li><div className="divider"></div></li>
			</ul>
		</div>
	)
}