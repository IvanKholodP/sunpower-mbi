import React from "react";
import {Switch, Route, Redirect,  BrowserRouter} from 'react-router-dom';
import AuthUserPage from "./pages/user/AuthUserPage";
import HomeUserPage from "./pages/user/HomeUserPage";
import RegisterUserPage from "./pages/user/RegisterUserPage";
import WorkerUserPage from "./pages/user/WorkerUserPage";
import ApplicationsUserPage from "./pages/user/ApplicationsUserPage"

export const useRouter = (isAuthentication: boolean) => {
	if(isAuthentication){
		return(
			// <Router>
				<Switch>
					<Route exact path ='/' component={HomeUserPage}></Route>
					<Route  path='/workers' component={WorkerUserPage}></Route>
					<Route  path='/applications' component={ApplicationsUserPage} />
					<Redirect to='/' />
				</Switch>
			// </Router>
		)
	}
	
	return(
		<Switch>
			<Route exact path="/registration" component={RegisterUserPage}></Route>
			<Route exact path="/auth" component={AuthUserPage}></Route>
			<Redirect to="/auth" />
		</Switch>
	)
}

