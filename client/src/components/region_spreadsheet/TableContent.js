import RegionEntry from './RegionEntry';
import {WRow} from 'wt-frontend';

const TableContent = (props) => {
    
    return(
        <div style={{height:"90%", overflowY:"auto", backgroundColor:"gray"}}>
            {
                props.subregions.map(subregion => (
                    <RegionEntry
                        parentRegions={props.parentRegions}
                        setParentRegions={props.setParentRegions}
                        subregion = {subregion}
                        key = {subregion._id}
                        region={props.region}
                    />)
                )
            }
        </div>
    );
};

export default TableContent;