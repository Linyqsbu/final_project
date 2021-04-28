import {WLayout, WLHeader, WLSide, WLMain, WButton, WModal, WMHeader,WMFooter} from 'wt-frontend';
import MapEntry from './MapEntry';
import {useQuery, useMutation} from '@apollo/client';
import * as queries from '../../cache/queries'
import * as mutations from '../../cache/mutations';
import {useState} from "react";
import {useHistory} from 'react-router-dom'
const MapSelectionScreen = (props) => {
    const history = useHistory();

    const handleSetActiveMap = async (mapId) => {
        const map = props.maps.find(map => map._id==mapId);
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
                            props.maps.map(map => (
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
                        <WButton onClick={props.createNewMap}>
                            Create New Map
                        </WButton>
                    </WLMain>

                    
                </WLayout> 
            </div>
        </div>
    );
};

export default MapSelectionScreen;