import {WLayout, WLHeader, WLSide, WLMain, WButton} from 'wt-frontend';
import MapEntry from './MapEntry';
const MapSelectionScreen = (props) => {


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
                                editMapName={props.editMapName}
                                toggleShowDelete = {props.toggleShowDelete} 
                                map={map} 
                                key={map._id}
                                setActiveMap={props.setActiveMap}
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