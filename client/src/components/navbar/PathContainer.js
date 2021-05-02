import ParentRegionEntry from './ParentRegionEntry';

const PathContainer = (props) => {

    return(
        <div className="path-container">
            {
                props.parentRegions[0]?
                    <ParentRegionEntry
                            parentRegion={props.parentRegions[0]}
                            parentRegions={props.parentRegions}
                            setParentRegions={props.setParentRegions}
                            key={0}
                            index={0}
                        />:null
                    
            }
            {
                props.parentRegions.slice(1).map(parentRegion => (
                <span><span className="arrow">&gt;</span>
                <ParentRegionEntry
                    parentRegion={parentRegion}
                    parentRegions={props.parentRegions}
                    setParentRegions={props.setParentRegions}
                    key={props.parentRegions.indexOf(parentRegion)}
                    index={props.parentRegions.indexOf(parentRegion)}
                />
                </span>))
            }
            
        </div>
    );
};

export default PathContainer;