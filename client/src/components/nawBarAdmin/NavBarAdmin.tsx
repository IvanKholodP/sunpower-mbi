import React, { useContext } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import './navBarAdmin.css';

export const NavBarAdmin: React.FC = () => {
	const history = useHistory();
	const auth = useContext(AuthContext);
	const logoutHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		auth.logout();
		history.push('/')
	};

	return(
		<div className='navbar-fixed' style={{zIndex: 1000}}>
			<nav className='navbar-fixed' >
				<div className="nav-wrapper blue darken-4">
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li>
							<a href="!#" data-target='slide-out-admin' className="sidenav-trigger" style={{display: "block"}}><i className="material-icons">menu</i></a>
							<NavLink className="brand-logo" to='/dashboard'>MBI Development</NavLink>
						</li>
						<li>
							<NavLink to="/" onClick={logoutHandler}>Logout</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	)
}