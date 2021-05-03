import {WLayout, WLHeader, WLSide, WLMain, WButton, WModal, WMHeader,WMFooter, WMMain, WInput} from 'wt-frontend';
import MapEntry from './MapEntry';
import {useQuery, useMutation} from '@apollo/client';
import * as queries from '../../cache/queries'
import * as mutations from '../../cache/mutations';
import {useState} from "react";
import {useHistory} from 'react-router-dom'
import globe from './globe.jpg';
const MapSelectionScreen = (props) => {
    const history = useHistory();

    const[showModal, toggleShowModal] = useState(false);
    const[mapName, setMapName] = useState('New Map');

    let maps=[];
    const {loading, data} = useQuery(queries.GET_DB_MAPS);
    if(loading) return null;
    if(data){
        maps=data.getAllMaps;
    }

    const updateMapName = (e) => {
        const {value} = e.target;
        const updated = value;
        setMapName(updated);
    }

    const handleSetActiveMap = async (mapId) => {
        const map = maps.find(map => map._id==mapId);
        props.setActiveMap(map);
        history.push(`/region_spreadsheet/${map._id}`)
    }

    return(
        <div>
            <div className="map-selection-container">
                <WLayout wLayout="header-lside" style={{gridTemplateColumns:"50% 50%"}}>
                    <WLHeader style={{backgroundColor:"black", color:"white", textAlign:"center"}} >
                        Your Maps
                    </WLHeader>

                    <WLSide  side="left" style={{ backgroundColor:"pink"}}>
                        {
                            maps.map(map => (
                                <MapEntry 
                                    handleSetActiveMap = {props.handleSetActiveMap}
                                    editMapName={props.editMapName}
                                    toggleShowDelete = {props.toggleShowDelete} 
                                    map={map}
                                    key={map._id}
                                    setActiveMap={props.setActiveMap}
                                    handleSetActiveMap={handleSetActiveMap}
                                />
                            ))
                        }
                    </WLSide>

                    <WLMain style={{backgroundColor:"white"}}>
                        <img src={globe} style={{width:"100%"}} />
                        <WButton className="map-selection-button" onClick={() => {toggleShowModal(true)}}>
                            Create New Map
                        </WButton>
                    </WLMain>
                    {
                        showModal && (<div>
                                <WModal style={{fontWeight:"bold", color:"white"}} visible={true}>
                                    <WMHeader>
                                        Please Enter the Name of the Map
                                    </WMHeader>
                                    <WMMain>
                                        Name:
                                        <WInput autoFocus={true} name="name" onBlur={updateMapName} defaultValue="New Map"/>
                                    </WMMain>
                                    <WMFooter>
                                        <WButton onClick={() => {props.createNewMap(mapName);toggleShowModal(false);}}>
                                            Submit
                                        </WButton>
                                        <WButton onClick={()=>{toggleShowModal(false)}} style={{float:"right"}}>
                                            Cancel
                                        </WButton>
                                    </WMFooter>
                                </WModal>
                        </div>)
                    }

                </WLayout> 
            </div>
        </div>
    );
};

export default MapSelectionScreen;