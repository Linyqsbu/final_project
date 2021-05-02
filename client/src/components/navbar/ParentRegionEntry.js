import {useHistory} from 'react-router-dom';
const ParentRegionEntry = (props) => {
    const history = useHistory();
    const handleNavigate = () => {
        const newParentRegions = props.parentRegions.slice(0, props.index);
        props.setParentRegions(newParentRegions);
        history.push(`/region_spreadsheet/${props.parentRegion._id}`)

    }

    console.log(props);
    return(
        <span style={{paddingLeft:"30px", cursor:"pointer"}} onClick={handleNavigate}>
            {props.parentRegion.name}
        </span>
    );
};

export default ParentRegionEntry;