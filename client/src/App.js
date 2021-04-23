import React 			from 'react';
import {useMutation, useQuery } 	from '@apollo/client';
import {useState} from 'react';
import * as queries 	from './cache/queries';
//import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { WNavbar, WLayout, WNavItem, WModal, WMHeader, WMFooter, WButton } 	from 'wt-frontend';
import NavbarOptions from './components/navbar/NavbarOptions';
import Logo from './components/navbar/Logo'
import Welcome from './components/welcome/Welcome';
import CreateAccountScreen from './components/account_screen/CreateAccountScreen';
import MapSelectionScreen from './components/map_selection_screen/MapSelectionScreen';
import LogInScreen from './components/account_screen/LogInScreen';
import UpdateAccountScreen from './components/account_screen/UpdateAccountScreen';
import * as mutations from './cache/mutations';

const App = () => {
  const[AddNewMap] = useMutation(mutations.ADDMAP);
  const[DeleteMap] = useMutation(mutations.DELETEMAP);
  const[EditMapName] = useMutation(mutations.EDITMAPNAME);

  const[showDelete, toggleShowDelete] = useState(false);
  const[activeMap, setActiveMap] = useState({});

	let user = null;
  //let transactionStack = new jsTPS();
	
  const { loading, error, data, refetch:refetchUser } = useQuery(queries.GET_DB_USER);

  if(error) { console.log(error); }
	if(loading) { console.log(loading); }
	if(data) { 
		let { getCurrentUser } = data;
		if(getCurrentUser !== null) { user = getCurrentUser; }
  }
  
  let maps=[];

  const {loading:loadingM, error: errorM, data: dataM, refetch: fetchMaps} = useQuery(queries.GET_DB_MAPS);
  if(loadingM){console.log(loadingM, 'loading');}
  if(errorM){console.log(errorM, 'error');}
  if(dataM) {maps = dataM.getAllMaps;}

  const refetchMaps = async (refetch) => {
    const {data} = await refetch();
    console.log("data ", data);
    if(data){
      maps = data.getAllmaps;
    }
  }
  
  

  const createNewMap = async () => {
    console.log("create new map");
    
    let newMap = {
      _id:'',
      name:"New Map",
      owner: user._id,
      subregions:[],
    };

    const {data} = await AddNewMap({variables:{map:newMap}})
    console.log(data);
    refetchMaps(fetchMaps);
  }
  
  const deleteMap = async () => {
    const{data} = await DeleteMap({variables:{_id: activeMap._id}});
    refetchMaps(fetchMaps);
    toggleShowDelete(false);
  }

  const editMapName = async (mapId, name) => {
    const{data} = await EditMapName({variables:{_id:mapId, newName:name}});
    refetchMaps(fetchMaps);
  }
  

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
              <NavbarOptions fetchUser={refetchUser} user={user} auth = {user===null? false: true}/>
          </ul>
        </WNavbar>

      
        <Switch>
          <Redirect exact from="/" to={{pathname:"/welcome"}}/>
          <Route path="/welcome" name="welcome">
            <Welcome/>
          </Route>

          <Route path="/create_account" name="create_account">
            <CreateAccountScreen fetchUser={refetchUser}/>
          </Route>

          <Route path="/log_in" name="log_in">
            <LogInScreen fetchUser={refetchUser}/>
          </Route>

          <Route path="/map_selection" name="map_selection">
            <MapSelectionScreen 
              editMapName={editMapName}
              toggleShowDelete={toggleShowDelete}
              maps={maps} 
              createNewMap={createNewMap}
              setActiveMap={setActiveMap}
            />
          </Route>

          <Route path="/update_account" name="update_account">
            <UpdateAccountScreen fetchUser={refetchUser} user={user}/>
          </Route>
        </Switch>   

        {
          showDelete && (<div>
                          <WModal visible={true}>
                              <WMHeader>
                              Delete
                              </WMHeader>
                              <WMFooter>
                              <WButton onClick = {deleteMap}>
                                  Delete
                              </WButton>
                              <WButton onClick={() => {toggleShowDelete(false)}}>
                                  Cancel
                              </WButton>
                              </WMFooter>
                          </WModal>
                          </div>)
        }      
      </BrowserRouter>
    </WLayout>
  );

}


export default App;
