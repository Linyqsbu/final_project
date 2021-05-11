import {WRow, WCol, WButton} from 'wt-frontend';
const LandmarkEntry = (props) =>{
    const color = props.landmark.owned? "white":"gray";
    const handleDeleteLandmark = async () => {
        await props.handleDeleteLandmark(props.landmark.name);
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
                    <div style={{float:"left"}}>
                        {props.landmark.name}
                    </div>
                </WCol>
            </WRow>
        </div>);
};
export default LandmarkEntry;