import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthUserPage from "./pages/user/AuthUserPage";
import HomeUserPage from "./pages/user/HomeUserPage";
import RegisterUserPage from "./pages/user/RegisterUserPage";
import WorkerUserPage from "./pages/user/WorkerUserPage";
import ApplicationsUserPage from "./pages/user/ApplicationsUserPage"
import MyAppsUserPage from "./pages/user/MyAppsUserPage";
import DashboardAdminPage from "./pages/admin/DashbordAdminPage";
import AuthAdminPage from "./pages/admin/AuthAdminPage";

export const useRouter = (isAuthentication: boolean, isAuthenticatedAdmin: boolean) => {
	if (isAuthenticatedAdmin) {
		return(
			<Switch>
				<Route exact path="/dashboard" component={DashboardAdminPage} />
				<Redirect to='/dashboard' />
			</Switch>
		)
	} else if(isAuthentication) {
		return(
			<Switch>
				<Route exact path ='/' component={HomeUserPage} />
				<Route path='/myapps' component={MyAppsUserPage} />
				<Route  path='/workers' component={WorkerUserPage} />
				<Route  path='/applications' component={ApplicationsUserPage} />
				<Redirect to='/' />
			</Switch>
		)
	}
	
	return(
		<Switch>
			<Route exact path="/admin" component={AuthAdminPage} />
			<Route exact path="/registration" component={RegisterUserPage} />
			<Route exact path="/auth" component={AuthUserPage} />
			<Redirect to="/auth" />
		</Switch>
	)
}

