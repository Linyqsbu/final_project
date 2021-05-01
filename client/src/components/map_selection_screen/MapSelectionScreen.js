import {WLayout, WLHeader, WLSide, WLMain, WButton, WModal, WMHeader,WMFooter} from 'wt-frontend';
import MapEntry from './MapEntry';
import {useQuery, useMutation} from '@apollo/client';
import * as queries from '../../cache/queries'
import * as mutations from '../../cache/mutations';
import {useState} from "react";
import {useHistory} from 'react-router-dom'
import globe from './globe.jpg';
const MapSelectionScreen = (props) => {
    const history = useHistory();

    let maps=[];
    const {loading, data} = useQuery(queries.GET_DB_MAPS);
    if(loading) return null;
    if(data){
        maps=data.getAllMaps;
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
                        <WButton className="map-selection-button" onClick={props.createNewMap}>
                            Create New Map
                        </WButton>
                    </WLMain>

                    
                </WLayout> 
            </div>
        </div>
    );
};

export default MapSelectionScreen;