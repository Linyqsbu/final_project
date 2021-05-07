import {WRow, WCol, WInput, WButton, WModal, WMHeader, WMFooter} from 'wt-frontend';
import {useHistory} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {GET_PATH} from '../../cache/queries';
import {useState} from 'react';
const RegionEntry = (props) => {
    const history = useHistory();

    const[editCapital, toggleEditCapital] = useState(false);
    const[editLeader, toggleEditLeader] = useState(false);
    const[editName, toggleEditName] = useState(false);
    const[showDelete, toggleShowDelete] = useState(false);

    const handleNavigate = () => {
        props.setRedoable(false);
        props.setUndoable(false);
        props.tps.clearAllTransactions();
        history.push(`/region_spreadsheet/${props.subregion._id}`);
    }

    const handleCapitalEdit = async (e) => {
        toggleEditCapital(false);
        const newCapital = e.target.value;
        const prevCapital = props.subregion.capital;
        if(newCapital!=prevCapital){
            await props.updateRegionField(props.subregion._id, props.region._id, newCapital, prevCapital, "capital");
            await props.refetchRegion();
        }
    }

    const handleLeaderEdit = async (e) => {
        toggleEditLeader(false);
        const newLeader = e.target.value;
        const prevLeader = props.subregion.leader;
        if(newLeader != prevLeader){
            await props.updateRegionField(props.subregion._id, props.region._id, newLeader, prevLeader, "leader");
            await props.refetchRegion();
        }
    }

    const handleNameEdit = async (e) => {
        toggleEditName(false);
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
                    {editName?
                        <WInput autoFocus={true} onBlur={handleNameEdit} defaultValue={props.subregion.name} type="texted"/>:
                        <div onClick={() => {toggleEditName(true)}}>{props.subregion.name}</div>
                    }
                </WCol>
                
                <WCol className="region-entry" size="2">
                    {editCapital?
                        <WInput autoFocus={true} onBlur={handleCapitalEdit} defaultValue={props.subregion.capital} type="texted"/>:
                        <div onClick={() => {toggleEditCapital(true)}}>{props.subregion.capital}</div>
                    }
                </WCol>
                
                <WCol className="region-entry" size="2">
                    {editLeader?
                        <WInput autoFocus={true} onBlur={handleLeaderEdit} defaultValue={props.subregion.leader} type="texted"/>:
                        <div onClick={() => {toggleEditLeader(true)}}>{props.subregion.leader}</div>
                    }
                </WCol>
                <WCol className="region-entry" size="2">
                    <div>{props.subregion.flag}</div>
                </WCol>
                <WCol className="region-entry" size="3">
                    <div>{props.subregion.landmarks}</div>
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