import React 			from 'react';
import {useMutation, useQuery } 	from '@apollo/client';
import {useState} from 'react';
import * as queries 	from './cache/queries';
//import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { WNavbar, WLayout, WNavItem, WModal, WMHeader, WMFooter, WButton } 	from 'wt-frontend';
import NavbarOptions from './components/navbar/NavbarOptions';
import Logo from './components/navbar/Logo'
import PathContainer from './components/navbar/PathContainer'
import Welcome from './components/welcome/Welcome';
import CreateAccountScreen from './components/account_screen/CreateAccountScreen';
import MapSelectionScreen from './components/map_selection_screen/MapSelectionScreen';
import LogInScreen from './components/account_screen/LogInScreen';
import UpdateAccountScreen from './components/account_screen/UpdateAccountScreen';
import RegionSpreadsheet from './components/region_spreadsheet/RegionSpreadsheet';
import RegionViewer from './components/region_viewer/RegionViewer';
import * as mutations from './cache/mutations';
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';

const Screen = (props) => {

  const[AddNewMap] = useMutation(mutations.ADDMAP);
  const[DeleteMap] = useMutation(mutations.DELETEMAP);
  const[EditMapName] = useMutation(mutations.EDITMAPNAME);
  const[AddRegion]  = useMutation(mutations.ADDREGION);
  const[UpdateRegionField] = useMutation(mutations.UPDATE_REGION_FIELD);


  const[activeMap, setActiveMap] = useState({});
  const[showDelete, toggleShowDelete] = useState(false);
  const[parentRegions, setParentRegions] = useState([]);

  
  let maps=[];
  const {loading:loadingM, error: errorM, data: dataM, refetch: fetchMaps} = useQuery(queries.GET_DB_MAPS);
  if(loadingM){return null;}
  if(errorM){console.log(errorM, 'error');}
  if(dataM) {maps = dataM.getAllMaps;}
  
  let subregions = [];
  let path = [];



  const refetchMaps = async (refetch) => {
    const {loading, error, data} = await refetch();
    if(data){maps=data.getAllMaps;}
  }

  const createNewMap = async (name) => {
    
    let newMap = {
      _id:'',
      name:name,
      owner: props.user._id,
      subregions:[],
    };

    const {data} = await AddNewMap({variables:{map:newMap}})
    refetchMaps(fetchMaps);
  }

  const editMapName = async (mapId, name) => {
    const{data} = await EditMapName({variables:{_id:mapId, newName:name}});
    refetchMaps(fetchMaps);
  }
  
  const deleteMap = async () =>{
    const {data} = await DeleteMap({variables:{_id: activeMap._id}});
    refetchMaps(fetchMaps);
    toggleShowDelete(false);
  }

  const addRegion = async (isMap, id) => {

    const newRegion = {
      _id:"",
      name:"New Region",
      capital:"Capital",
      leader:"Leader",
      flag:"Flag",
      parentRegionId: id,
      landmarks:[]
    }

    await AddRegion({variables:{region:newRegion, _id:id, isMap: isMap}});
  }

  const updateRegionField = async (_id, parentId, newValue, prevValue, field) => {
    await UpdateRegionField({variables:{_id:_id, parentId:parentId, value:newValue, field:field}});
  }

  
  

  return(
    <WLayout wLayout="header">
      <BrowserRouter>
        <WNavbar style={{backgroundColor:'black'}}>
          <ul>
            <WNavItem>
              <Logo setParentRegions={setParentRegions} user={props.user}/>
            </WNavItem>
          </ul>
          <ul>
            <WNavItem className="parent-entry" style={{position:"absolute", left:"10%"}}>
              <PathContainer
                path={path}
                parentRegions={parentRegions}
                setParentRegions={setParentRegions}
              />
            </WNavItem>
          </ul>
          <ul>
              <NavbarOptions setParentRegions={setParentRegions} fetchUser={props.refetchUser} user={props.user} auth = {props.user===null? false: true}/>
          </ul>
        </WNavbar>

      
        <Switch>
          <Redirect exact from="/" to={{pathname:`${props.user === null? "welcome":"/map_selection"}`}}/>
          <Route path="/welcome" name="welcome">
            <Welcome/>
          </Route>

          <Route path="/create_account" name="create_account">
            <CreateAccountScreen  user={props.user} fetchUser={props.refetchUser}/>
          </Route>

          <Route path="/log_in" name="log_in">
            <LogInScreen 
              fetchUser={props.refetchUser}
              fetchMaps={fetchMaps}
              refetchMaps={refetchMaps}
            />
          </Route>

          <Route path="/map_selection" name="map_selection">
            <MapSelectionScreen 
              user={props.user}
              maps={maps}
              createNewMap = {createNewMap}
              editMapName = {editMapName}
              deleteMap = {deleteMap}
              toggleShowDelete = {toggleShowDelete}
              setActiveMap = {setActiveMap}
            />
          </Route>

          <Route path="/update_account" name="update_account">
            <UpdateAccountScreen setParentRegions={setParentRegions} fetchUser={props.refetchUser} user={props.user}/>
          </Route>

          <Route path="/region_spreadsheet/:id">
            <RegionSpreadsheet
              user={props.user}
              maps={maps}
              addRegion = {addRegion}
              subregions={subregions}
              setParentRegions={setParentRegions}
              parentRegions={parentRegions}
              updateRegionField={updateRegionField}
            />
          </Route>

          <Route path = "/region_viewer/:id">
            <RegionViewer
              maps={maps}
              parentRegions={parentRegions}
              setParentRegions={setParentRegions}
            />
          </Route>

        </Switch>   
        {
          showDelete && (<div>
                          <WModal visible={true}>
                              <WMHeader style={{color:"white", fontWeight:"bold", textAlign:"center", fontSize:"20px"}}>
                              Delete
                              </WMHeader>
                              <WMFooter>
                              <WButton color="danger" onClick = {deleteMap}>
                                  Delete
                              </WButton>
                              <WButton style={{float:"right"}} onClick={() => {toggleShowDelete(false)}}>
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


export default Screen;
