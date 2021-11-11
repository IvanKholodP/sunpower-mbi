import React from "react";
import { NavLink } from "react-router-dom";
import { UserProps } from "../../interface";

export const UserData: React.FC<{user: UserProps}> = ({user}) => {
	return(
		<ul id="slide-out" className="sidenav sidenav-fixed blue-grey lighten-1" style={{paddingTop: '50px'}}>
			<li>
				<div className="user-view" >
					<span className="black-text name">{user.firstName}  {user.lastName}</span>
					<span className="black-text email">{user.email}</span>
				</div>
			</li>
			<li><div className="divider"></div></li>
			<li><NavLink className="waves-effect waves-light" to="/applications">Applications</NavLink></li>
			<li><div className="divider"></div></li>
			<li><NavLink className="waves-effect waves-light" to="/workers">Workers</NavLink></li>
			<li><div className="divider"></div></li>
			<li><NavLink className="subheader" to="/">Subheader</NavLink></li>
			<li><NavLink className="waves-effect" to="/">Third Link With Waves</NavLink></li>
		</ul>
	)
}