import React 			from 'react';
import { useQuery } 	from '@apollo/client';
//import * as queries 	from './cache/queries';
//import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { WNavbar, WSidebar, WNavItem, WModal } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import Logo from './components/navbar/Logo';
import Welcome from './components/welcome/Welcome';
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
          <WNavbar color = "colored">  
            <Logo/>
          </WNavbar>
    </WLayout>
  );

}


export default App;
