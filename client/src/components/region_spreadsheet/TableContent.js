import RegionEntry from './RegionEntry';
import {WRow} from 'wt-frontend';

const TableContent = (props) => {
    
    return(
        <div>
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