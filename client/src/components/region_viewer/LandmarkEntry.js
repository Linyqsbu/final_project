import {WRow, WCol, WButton, WInput} from 'wt-frontend';
import {useState} from 'react';
const LandmarkEntry = (props) =>{
    const color = props.landmark.owned? "white":"gray";

    const[edit, setEdit] = useState(false);
    const handleDeleteLandmark = async () => {
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
                        <WButton onClick={handleDeleteLandmark} color="danger" wType="texted">
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
        </div>);
};
export default LandmarkEntry;