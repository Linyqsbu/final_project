import {WRow, WCol} from 'wt-frontend';
import {useHistory} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {GET_PATH} from '../../cache/queries';
const RegionEntry = (props) => {
    const history = useHistory();

    const handleNavigate = () => {
        history.push(`/region_spreadsheet/${props.subregion._id}`);
        
    }

    return(
        <WRow>
            <WCol style={{paddingTop:"10px", paddingBottom:"10px", paddingLeft:"40px", borderBottom:"solid",borderColor:"black"}}> 
                <i className="material-icons region" style={{color:"brown"}}>close</i>
            </WCol>
            <WCol className="region-entry" onClick = {handleNavigate} size="2">
                <div>{props.subregion.name}</div>
            </WCol>
            <WCol className="region-entry" size="2">
                <div>{props.subregion.capital}</div>
            </WCol>
            <WCol className="region-entry" size="2">
                <div>{props.subregion.leader}</div>
            </WCol>
            <WCol className="region-entry" size="2">
                <div>{props.subregion.flag}</div>
            </WCol>
            <WCol className="region-entry" size="3">
                <div>{props.subregion.landmarks}</div>
            </WCol>
        </WRow>
    );
};

export default RegionEntry;