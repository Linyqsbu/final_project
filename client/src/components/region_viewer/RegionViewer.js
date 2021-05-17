import {useParams} from 'react-router-dom';
import {GET_REGION_BY_ID, GET_PATH, GET_CHILDREN_LANDMARKS, GET_SIBLING} from '../../cache/queries';
import {useQuery} from '@apollo/client'
import {WRow, WButton, WInput} from 'wt-frontend';
import {useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';
import LandmarkEntry from './LandmarkEntry';
import ParentSelectionModal from './ParentSelectionModal';

const RegionViewer = (props) => {
    const undoColor = props.undoable? "white":"gray";
    const redoColor = props.redoable? "white":"gray";

    const {id} = useParams();
    const history = useHistory();

    const[landmarkInput, setLandmarkInput] = useState('');
    const[showSelection, toggleShowSelection] = useState(false);

    

    
    let region = {};
    let landmarks = [];

    const{loading,data, refetch} = useQuery(GET_REGION_BY_ID, {variables:{_id:id}});
    const{data:dataP, refetch:refetchP} = useQuery(GET_PATH, {variables:{_id:id}, fetchPolicy:"no-cache"});
    const{data:dataL} = useQuery(GET_CHILDREN_LANDMARKS, {variables:{_id:id}, fetchPolicy:"no-cache"});
    const{data:dataPrevSib, refetch:refetchPrev} = useQuery(GET_SIBLING, {variables:{_id:id, direction:-1}});
    const{data:dataNextSib, refetch:refetchNext} = useQuery(GET_SIBLING, {variables:{_id:id, direction:1}});

    let flagPath='';
    
    
    useEffect(() =>{
        
        props.toggleShowArrows(true);
        if(dataP){
            props.setParentRegions(dataP.getPath);
        }

        if(dataPrevSib){
            props.setPrevSibling(dataPrevSib.getSibling);
        }

        if(dataNextSib){
            props.setNextSibling(dataNextSib.getSibling);
        }

        document.addEventListener('keydown', handleKeyDown);

        return(() => {
            props.toggleShowArrows(false);
            props.setParentRegions([]);
            props.setPrevSibling('');
            props.setNextSibling('');
            document.removeEventListener('keydown', handleKeyDown);
        });
    })

    let flag='';
    if(data){
        region = data.getRegionById;
        //landmarks=region.landmarks;
        
        if(dataP){
            let parents=dataP.getPath;
            for(let i=0;i<parents.length;i++){
                flagPath=flagPath+parents[i].name+'/';
            }
            //flagPath=flagPath;
            try{
                flag=require('../../flags/'+flagPath+region.flag+'.png').default;
            }
            catch(e){
                flag=null;
            }
        }
        
        
        let landmarkElements = data.getRegionById.landmarks;
        for(let i=0;i<landmarkElements.length;i++){
            landmarks.push({name:landmarkElements[i], owned:true});
        }
    }
    
    if(dataL) {
        let landmarkElements = dataL.getChildrenLandmarks;        
        for(let i=0;i<landmarkElements.length;i++){
            landmarks.push({name:landmarkElements[i], owned:false});
        }
        
    }

    const handleKeyDown = (e) => {
        if(e.ctrlKey){
			if(e.keyCode===90){
				handleUndo();
			}

			if(e.keyCode===89){
				handleRedo();
				
			}
		}
    }
    
    const handleNavigate = () => {
        const parent = props.parentRegions[props.parentRegions.length-1];
        const newParentRegions = props.parentRegions.slice(0,props.parentRegions.length-1);
        props.setParentRegions(newParentRegions);
        props.tps.clearAllTransactions();
        props.setRedoable(false);
        props.setUndoable(false);
        history.push(`/region_spreadsheet/${parent._id}`);
    }

    const updateLandmarkInput = (e) => {
        const landmark = e.target.value;
        if(landmark != ''){
            setLandmarkInput(landmark);
        }
    }

    const handleAddLandmark = async () => {
        await props.addLandmark(id, landmarkInput, region.parentRegionId);
        await refetch();
    }

    const handleUndo = async () => {
        await props.tpsUndo();
        await refetch();
        await refetchP();
        await refetchNext();
        await refetchPrev();
    }

    const handleRedo = async () => {
        await props.tpsRedo();
        await refetch();
        await refetchP();
        await refetchNext();
        await refetchPrev();
    }

    const handleDeleteLandmark = async (landmark) => {
        await props.deleteLandmark(id, landmark, region.parentRegionId);
        await refetch();
    }

    const handleEditLandmark = async (oldLandmark, newLandmark) => {
        await props.editLandmark(region._id, oldLandmark, newLandmark, region.parentRegionId);
        await refetch();
    }

    if(loading) return null;
    return(
        <div className="region-viewer">
            
            <WButton onClick={handleUndo} style={{color:`${undoColor}`}} wType="texted">
                <i className="material-icons region-spreadsheet-button">undo</i>
            </WButton>
            <WButton onClick={handleRedo} style={{color:`${redoColor}`}} wType="texted">
                <i className="material-icons region-spreadsheet-button">
                    redo</i>          
            </WButton>
            <div style={{height:"60%"}}><img src={flag}/></div>

            <WRow style={{paddingLeft:"15px", paddingBottom:"20px"}}>
                <span>Region Name:</span> {region.name}
            </WRow>
            <WRow style={{paddingLeft:"15px", paddingBottom:"20px"}}>
                <span>Parent Region:</span> <span onClick={handleNavigate} style={{color:"skyblue", cursor:"pointer"}}>{props.parentRegions.length?props.parentRegions[props.parentRegions.length-1].name:null}</span>
                <span><i onClick={() => {toggleShowSelection(true)}} style={{cursor:"pointer", fontSize:"20px", color:"white"}} className="material-icons">edit</i></span>
            </WRow>
            <WRow style={{paddingLeft:"15px", paddingBottom:"20px"}}>
                <span>Regional Capital:</span> {region.capital}
            </WRow>
            <WRow style={{paddingLeft:"15px", paddingBottom:"20px"}}>
                <span>Regional Leader:</span> {region.leader}
            </WRow>
            <WRow style={{paddingLeft:"15px", paddingBottom:"20px"}}>
                <span># of subregions:</span> {region.subregions.length}
            </WRow>
            
            <div className="region-landmark">
                Region Landmarks
                <div className="landmark-container">
                    {
                        landmarks.map(landmark => (<LandmarkEntry
                            landmark={landmark}
                            handleDeleteLandmark={handleDeleteLandmark}
                            key={landmarks.indexOf(landmark)}
                            handleEditLandmark={handleEditLandmark}
                        />))
                    }
                </div>
                <div className="add-region-bar"> 
                    <WButton onClick={handleAddLandmark} wType="texted">
                        <i style={{fontSize:"30px", fontWeight:"bold", color:"green"}} className="material-icons">
                            add
                        </i>
                    </WButton>
                    <WInput onBlur={updateLandmarkInput} style={{height:"100%", backgroundColor:"white", color:"black", width:"300px"}}/>
                </div>
            </div>
            {
                showSelection&&(<ParentSelectionModal 
                                    toggleShowSelection={toggleShowSelection} 
                                    parentId={region.parentRegionId}
                                    maps={props.maps}
                                    region={region}
                                    changeParentRegion={props.changeParentRegion}
                                    refetchRegion={refetch}
                                    refetchPath={refetchP}
                                    refetchMaps={props.refetchMaps}
                                    refetchNext={refetchNext}
                                    refetchPrev={refetchPrev}
                                />)
            }
        </div>
    );
};

export default RegionViewer;