import {WModal, WMHeader, WMMain, WButton} from 'wt-frontend';
const ParentSelectionModal = (props) => {
    const map = props.maps.find(map => map._id==props.parentId);
    const isParentMap = map!==undefined;
    let parentSiblings=[];

    if(isParentMap){
        parentSiblings=props.maps;
    }

    return(
        <WModal visible={true}>
            <WMHeader style={{backgroundColor:"cornflowerblue", color:"black"}} onClose={() => {props.toggleShowSelection(false);}}>
                Change Region Parent
                <br/>
                <div style={{color:"darkred", fontSize:"14px"}}>
                    The new parent can only be a sibling of the current parent region
                </div>
            </WMHeader>
            <WMMain>
                {
                    parentSiblings.map(sibling => (<ParentSiblingEntry 
                                                        sibling={sibling}
                                                        region={props.region}
                                                        changeParentRegion={props.changeParentRegion}
                                                        isParentMap={isParentMap}
                                                        toggleShowSelection={props.toggleShowSelection}
                                                        refetchRegion={props.refetchRegion}
                                                        refetchPath={props.refetchPath}
                                                        refetchMaps={props.refetchMaps}
                                                    />))
                }
            </WMMain>
        </WModal>
    );
}

const ParentSiblingEntry = (props) => {
    const handleChangeParent = async () => {
        props.toggleShowSelection(false);
        await props.changeParentRegion(props.region._id, props.region.parentRegionId, props.sibling._id, props.isParentMap);
        await props.refetchRegion();
        await props.refetchPath();
        await props.refetchMaps();
    }
    
    return(props.sibling._id==props.region.parentRegionId? null:
        <div style={{fontSize:"20px", paddingBottom:"30px"}}>
            {props.sibling.name}
            <WButton onClick={handleChangeParent} style={{float:"right"}}>SELECT</WButton>
        </div>
    );
}

export default ParentSelectionModal