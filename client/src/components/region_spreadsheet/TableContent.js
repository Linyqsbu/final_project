import RegionEntry from './RegionEntry';
import {WRow} from 'wt-frontend';

const TableContent = (props) => {
    
    return(
        <div style={{height:"90%", overflowY:"auto", backgroundColor:"gray"}}>
            {
                props.subregions.map(subregion => (
                    <RegionEntry
                        setIsMap = {props.setIsMap}
                        subregion = {subregion}
                        key = {subregion._id}
                    />)
                )
            }
        </div>
    );
};

export default TableContent;