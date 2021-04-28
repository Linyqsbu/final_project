import {WRow, WCol} from 'wt-frontend';
import {useHistory} from 'react-router-dom';
const RegionEntry = (props) => {
    const history = useHistory();
    
    const handleNavigate = () => {
        history.push(`/region_spreadsheet/${props.subregion._id}`)
        
    }

    return(
        <WRow>
            <WCol onClick = {handleNavigate} size="2">
                {props.subregion.name}
            </WCol>
            <WCol size="2">
                {props.subregion.capital}
            </WCol>
            <WCol size="2">
                {props.subregion.leader}
            </WCol>
            <WCol size="2">
                {props.subregion.flag}
            </WCol>
            <WCol size="2">
                {props.subregion.landmarks}
            </WCol>
        </WRow>
    );
};

export default RegionEntry;