import React 			from 'react';
import { useQuery } 	from '@apollo/client';
//import * as queries 	from './cache/queries';
//import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { WNavbar, WSidebar, WNavItem, WModal } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import NavbarOptions from './components/navbar/NavbarOptions';
import Logo from './components/navbar/Logo'
import Welcome from './components/welcome/Welcome';
import CreateAccountScreen from './components/account_screens/CreateAccountScreen';
const App = () => {
  /*
	let user = null;
  //let transactionStack = new jsTPS();
	
  const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);
s
  if(error) { console.log(error); }
	if(loading) { console.log(loading); }
	if(data) { 
		let { getCurrentUser } = data;
		if(getCurrentUser !== null) { user = getCurrentUser; }
  }
  */


  return(
    <WLayout wLayout="header">
      <BrowserRouter>
        <WNavbar style={{backgroundColor:'black'}}>
          <ul>
            <WNavItem>
              <Logo/>
            </WNavItem>
          </ul>

          <ul>
              <NavbarOptions/>
          </ul>
        </WNavbar>

      
        <Switch>
          <Redirect exact from="/" to={{pathname:"/welcome"}}/>
          <Route path="/welcome" name="welcome">
            <Welcome/>
          </Route>

          <Route path="/create_account" name="create_account">
            <CreateAccountScreen/>
          </Route>

        </Switch>
      </BrowserRouter>
    </WLayout>
  );

}


export default App;
