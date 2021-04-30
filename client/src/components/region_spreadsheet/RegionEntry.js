import {WRow, WCol} from 'wt-frontend';
import {useHistory} from 'react-router-dom';
const RegionEntry = (props) => {
    const history = useHistory();
    
    const handleNavigate = () => {
        history.push(`/region_spreadsheet/${props.subregion._id}`)
        
    }

    return(
        <WRow>
            <WCol className="region-entry" onClick = {handleNavigate} size="2">
                {props.subregion.name}
            </WCol>
            <WCol className="region-entry" size="2">
                {props.subregion.capital}
            </WCol>
            <WCol className="region-entry" size="2">
                {props.subregion.leader}
            </WCol>
            <WCol className="region-entry" size="2">
                {props.subregion.flag}
            </WCol>
            <WCol className="region-entry" size="4">
                {props.subregion.landmarks}
            </WCol>
        </WRow>
    );
};

export default RegionEntry;