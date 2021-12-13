import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthUserPage from "./pages/user/AuthUserPage";
import HomeUserPage from "./pages/user/HomeUserPage";
import RegisterUserPage from "./pages/user/RegisterUserPage";
import WorkerUserPage from "./pages/user/WorkerUserPage";
import ApplicationsUserPage from "./pages/user/ApplicationsUserPage"
import MyAppsUserPage from "./pages/user/MyAppsUserPage";
import DashboardAdminPage from "./pages/admin/DashbordAdminPage";

export const useRouter = (isAuthentication: boolean, admin: boolean) => {
	if (isAuthentication && admin) {
		return(
			<Switch>
				<Route exact path="dashboard" component={DashboardAdminPage} />
				<Redirect to='/'/>
			</Switch>
		)
	}
	if(isAuthentication){
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
			<Route exact path="/registration" component={RegisterUserPage} />
			<Route exact path="/auth" component={AuthUserPage} />
			<Redirect to="/auth" />
		</Switch>
	)
}

