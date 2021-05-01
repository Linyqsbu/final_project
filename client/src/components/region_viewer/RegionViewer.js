import {useParams} from 'react-router-dom';
import {GET_REGION_BY_ID} from '../../cache/queries';
import {useQuery} from '@apollo/client'
import {WRow, WButton, WInput} from 'wt-frontend';
const RegionViewer = (props) => {
    const {id} = useParams();
    let map = props.maps.find(map => map._id === id)

    
    let region = {};

    const{loading,data} = useQuery(GET_REGION_BY_ID, {variables:{_id:id}});
    if(loading) return null;
    if(data){
        region = data.getRegionById;
    }

    return(
        <div className="region-viewer">
            
            <WButton style={{color:"white"}} wType="texted">
                <i className="material-icons region-spreadsheet-button">undo</i>
            </WButton>
            <WButton style={{color:"white"}} wType="texted">
                <i className="material-icons region-spreadsheet-button">
                    redo</i>          
            </WButton>
            <div style={{height:"60%"}}/>
            <WRow style={{paddingLeft:"15px", paddingBottom:"20px"}}>
                <span>Region Name:</span> {region.name}
            </WRow>
            <WRow style={{paddingLeft:"15px", paddingBottom:"20px"}}>
                <span>Parent Region:</span> <span style={{color:"skyblue"}}>{region.parentRegionId}</span>
            </WRow>
            <WRow style={{paddingLeft:"15px", paddingBottom:"20px"}}>
                <span>Regional Capital:</span> {region.capital}
            </WRow>
            <WRow style={{paddingLeft:"15px", paddingBottom:"20px"}}>
                <span>Regional Leader:</span> {region.leader}
            </WRow>
            <WRow style={{paddingLeft:"15px", paddingBottom:"20px"}}>
                <span># of subregions:</span> {region.subregions.length}
            </WRow>
            
            <div className="region-landmark">
                Region Landmarks
                <div className="landmark-container">
                </div>
                <div className="add-region-bar"> 
                    <WButton wType="texted">
                        <i style={{fontSize:"30px", fontWeight:"bold", color:"green"}} className="material-icons">
                            add
                        </i>
                    </WButton>
                    <WInput style={{height:"100%", backgroundColor:"white", color:"black", width:"300px"}}/>
                </div>
            </div>
            
        </div>
    );
};

export default RegionViewer;