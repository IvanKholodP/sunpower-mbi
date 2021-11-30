import React, { useContext } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { AppModal } from "../applicationModal/AppModal";
import './navbar.css';

export const NavBar: React.FC = () => {
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
				<div className="nav-wrapper green darken-4">
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li>
							<NavLink className="brand-logo" to='/'>MBI Development</NavLink>
						</li>
						<li>
							<AppModal />
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