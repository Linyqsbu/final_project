import RegionEntry from './RegionEntry';
import {WRow} from 'wt-frontend';

const TableContent = (props) => {
    
    return(
        <div style={{height:"90%", overflowY:"auto", backgroundColor:"gray"}}>
            {
                props.subregions.map(subregion => (
                    <RegionEntry
                        subregion = {subregion}
                        key = {subregion._id}
                        region={props.region}
                        refetchRegion={props.refetchRegion}
                        updateRegionField={props.updateRegionField}
                        deleteRegion={props.deleteRegion}
                        refetchPath={props.refetchPath}
                        tps={props.tps}
                        setRedoable={props.setRedoable}
                        setUndoable={props.setUndoable}
                        index={props.subregions.indexOf(subregion)}
                    />)
                )
            }
        </div>
    );
};

export default TableContent;