import {useParams} from 'react-router-dom';
import {WButton, WCol} from 'wt-frontend';
import RegionHeader from './RegionHeader';
import TableContent from './TableContent';
import {GET_REGION_BY_ID, GET_MAP_BY_ID, GET_PATH} from '../../cache/queries';
import {useQuery} from '@apollo/client';
import {useState, setState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
const RegionSpreadsheet = (props) => {

    const history = useHistory();
    const{id} = useParams();

    let map = props.maps.find(map => map._id===id);
    const isMap = map!==undefined;


    let region = {};
    let subregions = [];

    const{loading:loadingM, data:dataM, refetch:refetchM} = useQuery(GET_MAP_BY_ID, {variables:{_id:id}});
    const{loading:loadingR, data:dataR, refetch:refetchR} = useQuery(GET_REGION_BY_ID, {variables:{_id:id}});
    const{data:dataP} = useQuery(GET_PATH, {variables:{_id:id}});

    if(dataP){
        props.setParentRegions(dataP.getPath);
    }

    if(loadingM || loadingR) {console.log("loading");}
    
    if(dataM){
        console.log("this is a map");
        region = dataM.getMapById;
        subregions = region.subregions;
    }
    
    else if(dataR){
        region = dataR.getRegionById;
        subregions=region.subregions;
    }

    

    
      
    const refetchRegion = async (refetch) =>{
        const {loading, data} = await refetch({variables:{_id:id}});
        if(loading) {console.log("loading");}
        if(data){
            if(isMap)
                region = data.getMapById;
            
            else
                region = data.getRegionById;

            
            subregions = region.subregions;
        }

    }

    const handleAddRegion = async () => {
        await props.addRegion(isMap, id);
        console.log("isMap", isMap);
        if(isMap)
            refetchRegion(refetchM);
        else
            refetchRegion(refetchR);
    }

    const clickDisabled = () =>{}

    return(
        <div className="region-spreadsheet-container">
            <div style={{paddingBottom:"15px"}}>
                <WButton style={{color:"green"}} wType="texted" onClick={handleAddRegion}>
                    <i  className = 'material-icons region-spreadsheet-button'>
                        add
                    </i>
                </WButton>
                <WButton style={{color:"white"}} wType="texted">
                    <i className = 'material-icons region-spreadsheet-button'>
                        undo
                    </i>
                </WButton>
                <WButton style={{color:"white"}} wType="texted">
                    <i className = 'material-icons region-spreadsheet-button'>
                        redo
                    </i>
                </WButton>
                <span style={{fontSize:"30px", fontWeight:"bold", paddingLeft:"250px"}}>
                Region Name:
                    <span style={{cursor:"pointer", color:"deepskyblue"}} onClick = {isMap? clickDisabled: () => {history.push(`/region_viewer/${id}`)}}>
                        {region.name}
                    </span>
                </span>
            </div>
            <RegionHeader/>
            <TableContent
                parentRegions={props.parentRegions}
                setParentRegions={props.setParentRegions}
                region={region}
                subregions = {subregions}
                
            />
        </div>
    );
};

export default RegionSpreadsheet;