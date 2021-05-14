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
    const{data:dataP, refetch:refetchP} = useQuery(GET_PATH, {variables:{_id:id}, fetchPolicy:"no-cache"});
    

    if(loadingM || loadingR) {console.log("loading");}
    
    if(dataM){
        region = dataM.getMapById;
        subregions = region.subregions;
    }
    
    else if(dataR){
        region = dataR.getRegionById;
        subregions=region.subregions;
    }

    let redoButtonColor=props.redoable? "white":"gray";
    let undoButtonColor=props.undoable? "white":"gray";

    useEffect(() => {
        //let isMounted = true;
        if(dataP){
            props.setParentRegions(dataP.getPath);
        }
        return (() => {
            //isMounted=false;
            props.setParentRegions([]);
        });
    })
    
      
    const refetchRegion = async () =>{
        if(isMap){
            const {data} = await refetchM({variables:{_id:id}});
            if(data){
                region = data.getMapById;
                subregions = region.subregions;
            }
        }

        else{
            const{data} = await refetchR({variables:{_id:id}});
            if(data){
                region = data.getRegionById;
                subregions = region.subregions;
            }
        }
    }

    const refetchPath = async(_id) => {
        const {data} = await refetchP({variables:{_id:_id}})
        if(data){
            props.setParentRegions(dataP.getPath);
        }
    }

    const handleAddRegion = async () => {
        await props.addRegion(isMap, id);
        console.log("isMap", isMap);
        await refetchRegion();
    }

    const handleUndo = async () => {
        await props.tpsUndo();
        await refetchRegion();
    }

    const handleRedo = async ()=> {
        await props.tpsRedo();
        await refetchRegion();
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
                <WButton onClick={handleUndo} style={{color:`${undoButtonColor}`}} wType="texted">
                    <i className = 'material-icons region-spreadsheet-button'>
                        undo
                    </i>
                </WButton>
                <WButton onClick={handleRedo} style={{color:`${redoButtonColor}`}} wType="texted">
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
            <RegionHeader
                sortRegions={props.sortRegions}
                region={region}
                isMap={isMap}
                refetchRegion={refetchRegion}
            />
            <TableContent
                region={region}
                subregions = {subregions}
                refetchRegion = {refetchRegion} 
                updateRegionField={props.updateRegionField}
                deleteRegion={props.deleteRegion}
                refetchPath={refetchPath}
                tps={props.tps}
                setRedoable={props.setRedoable}
                setUndoable={props.setUndoable}
                isMap={isMap}
                parentRegions={props.parentRegions}
            />
        </div>
    );
};

export default RegionSpreadsheet;