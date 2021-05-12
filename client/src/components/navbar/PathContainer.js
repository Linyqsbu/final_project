import ParentRegionEntry from './ParentRegionEntry';
import {useParams} from 'react-router-dom';
const PathContainer = (props) => {

    return(props.parentRegions?
        <div className="path-container">
            {
                props.parentRegions.map(parentRegion => (
                <span>
                    {props.parentRegions.indexOf(parentRegion)==0?null:
                        <span className="arrow">&gt;</span>
                    }   
                    <ParentRegionEntry
                        parentRegion={parentRegion}
                        parentRegions={props.parentRegions}
                        setParentRegions={props.setParentRegions}
                        key={props.parentRegions.indexOf(parentRegion)}
                        index={props.parentRegions.indexOf(parentRegion)}
                    />
                </span>))
            }
            
        </div>:null
    );
};

export default PathContainer;