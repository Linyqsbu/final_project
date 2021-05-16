import {WRow, WCol, WButton, WInput, WModal, WMHeader, WMFooter} from 'wt-frontend';
import {useState} from 'react';
const LandmarkEntry = (props) =>{
    const color = props.landmark.owned? "white":"gray";

    const[edit, setEdit] = useState(false);
    const[showDelete, toggleShowDelete] = useState(false);

    const handleDeleteLandmark = async () => {
        toggleShowDelete(false);
        await props.handleDeleteLandmark(props.landmark.name);
    }

    const handleEditLandmark = async (e) => {
        setEdit(false);
        const oldLandmark = props.landmark.name;
        const newLandmark = e.target.value;
        if(oldLandmark!=newLandmark&&newLandmark!='')
            await props.handleEditLandmark(oldLandmark, newLandmark);
    }

    return(<div className="landmark-entry">
            <WRow>
                <WCol size="2">
                    {props.landmark.owned? 
                        <WButton onClick={() => {toggleShowDelete(true)}} color="danger" wType="texted">
                            <i className="material-icons">close</i>
                        </WButton>:
                        <span/>
                    }
                </WCol>
            
            
                <WCol size="10" style={{color:`${color}`, float:"left", paddingTop:"9px"}}>
                    {edit?
                        <WInput defaultValue={props.landmark.name} onBlur={handleEditLandmark} autoFocus={true} type="text"/>:
                        <div onClick={props.landmark.owned?() => {setEdit(true)}:null} style={{float:"left"}}>
                            {props.landmark.name}
                        </div>
                    }
                </WCol>
            </WRow>
            {
                showDelete && (<div>
                                <WModal visible={true}>
                                    <WMHeader style={{color:"white", fontWeight:"bold", fontSize:"20px"}}>
                                    Delete Landmark
                                    </WMHeader>
                                    <WMFooter>
                                        <WButton style={{float:'left'}} color="danger" onClick={handleDeleteLandmark}>
                                            Delete
                                        </WButton>
                                        <WButton style={{float:"right"}} onClick={() => {toggleShowDelete(false)}}>
                                            Cancel
                                        </WButton>
                                    </WMFooter>
                                </WModal>
                                </div>)
            }
        </div>);
};
export default LandmarkEntry;