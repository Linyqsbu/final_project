import {WRow, WCol, WInput, WButton, WModal, WMHeader, WMFooter} from 'wt-frontend';
import {useHistory} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {GET_PATH} from '../../cache/queries';
import {useEffect, useState} from 'react';
const RegionEntry = (props) => {
    const history = useHistory();

    //const[editCapital, toggleEditCapital] = useState(false);
    //const[editLeader, toggleEditLeader] = useState(false);
    //const[editName, toggleEditName] = useState(false);
    const[showDelete, toggleShowDelete] = useState(false);

    let flag='';
    try{
        flag=require('../../flags/'+props.subregion.flag+'.png').default;
    }
    catch(error){
        flag=null;
    }
    
    

    const handleNavigate = () => {
        props.setRedoable(false);
        props.setUndoable(false);
        props.tps.clearAllTransactions();
        history.push(`/region_spreadsheet/${props.subregion._id}`);
    }

    const handleCapitalEdit = async (e) => {
        props.setEdit({field:'', index:-1});
        const newCapital = e.target.value;
        const prevCapital = props.subregion.capital;
        if(newCapital!=prevCapital){
            await props.updateRegionField(props.subregion._id, props.region._id, newCapital, prevCapital, "capital");
            await props.refetchRegion();
        }
    }

    const handleLeaderEdit = async (e) => {
        props.setEdit({field:'', index:-1});
        const newLeader = e.target.value;
        const prevLeader = props.subregion.leader;
        if(newLeader != prevLeader){
            await props.updateRegionField(props.subregion._id, props.region._id, newLeader, prevLeader, "leader");
            await props.refetchRegion();
        }
    }

    const handleNameEdit = async (e) => {
        props.setEdit({field:'', index:-1});
        const newName = e.target.value;
        const prevName = props.subregion.name;
        if(newName != prevName) {
            await props.updateRegionField(props.subregion._id, props.region._id, newName, prevName, "name");
            await props.refetchRegion();
        }
    }

    const handleDeleteRegion = async (e) => {
        toggleShowDelete(false);
        await props.deleteRegion(props.subregion._id, props.region._id, props.index, props.subregion, props.isMap);
        await props.refetchRegion();
    }

    return(
        <div>
            <WRow>
                <WCol onClick={() => {toggleShowDelete(true)}} style={{cursor:"pointer", paddingTop:"10px", paddingBottom:"10px", paddingLeft:"40px", borderBottom:"solid",borderColor:"black"}}> 
                    <i className="material-icons region" style={{color:"brown"}}>close</i>
                </WCol>
                <WCol style={{cursor:"pointer"}} className="region-entry" onDoubleClick = {handleNavigate} size="2">
                    {props.edit.field=='name' && props.edit.index==props.index?
                        <WInput style={{color:"black"}} autoFocus={true} onBlur={handleNameEdit} defaultValue={props.subregion.name} type="texted"/>:
                        <div onClick={() => {props.setEdit({field:'name', index:props.index});}}>{props.subregion.name}</div>
                    }
                </WCol>
                
                <WCol className="region-entry" size="2">
                    {props.edit.field=='capital' && props.edit.index==props.index?
                        <WInput style={{color:"black"}} autoFocus={true} onBlur={handleCapitalEdit} defaultValue={props.subregion.capital} type="texted"/>:
                        <div onClick={() => {props.setEdit({field:'capital', index:props.index});}}>{props.subregion.capital}</div>
                    }
                </WCol>
                
                <WCol className="region-entry" size="2">
                    {props.edit.field=='leader' && props.edit.index==props.index?
                        <WInput style={{color:"black"}} autoFocus={true} onBlur={handleLeaderEdit} defaultValue={props.subregion.leader} type="texted"/>:
                        <div onClick={() => {props.setEdit({field:'leader', index:props.index});}}>{props.subregion.leader}</div>
                    }
                </WCol>
                <WCol className="region-entry" size="2">
                    <img style={{height:"35px"}} src={flag} alt={props.subregion.flag}/>
                </WCol>
                <WCol className="region-entry" size="3">
                    <div>{props.subregion.landmarks.length? props.subregion.landmarks[0]+". . .":null}</div>
                </WCol>
            </WRow>
            {
                showDelete && (<div>
                                <WModal visible={true}>
                                    <WMHeader style={{color:"white", fontWeight:"bold", textAlign:"center", fontSize:"20px"}}>
                                    Delete Region
                                    </WMHeader>
                                    <WMFooter>
                                    <WButton color="danger" onClick={handleDeleteRegion}>
                                        Delete
                                    </WButton>
                                    <WButton style={{float:"right"}} onClick={() => {toggleShowDelete(false)}}>
                                        Cancel
                                    </WButton>
                                    </WMFooter>
                                </WModal>
                                </div>)
            }      
        </div>
        
    );
};

export default RegionEntry;