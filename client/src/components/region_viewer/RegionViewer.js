import {useParams} from 'react-router-dom';
import {GET_REGION_BY_ID, GET_PATH, GET_CHILDREN_LANDMARKS, GET_SIBLING} from '../../cache/queries';
import {useQuery} from '@apollo/client'
import {WRow, WButton, WInput} from 'wt-frontend';
import {useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';
import LandmarkEntry from './LandmarkEntry';

const RegionViewer = (props) => {
    const undoColor = props.undoable? "white":"gray";
    const redoColor = props.redoable? "white":"gray";

    const {id} = useParams();
    const history = useHistory();

    const[landmarkInput, setLandmarkInput] = useState('');

    
    
    
    let region = {};
    let landmarks = [];

    const{loading,data, refetch} = useQuery(GET_REGION_BY_ID, {variables:{_id:id}});
    const{data:dataP} = useQuery(GET_PATH, {variables:{_id:id}, fetchPolicy:"no-cache"});
    const{data:dataL} = useQuery(GET_CHILDREN_LANDMARKS, {variables:{_id:id}, fetchPolicy:"no-cache"});
    const{data:dataPrevSib} = useQuery(GET_SIBLING, {variables:{_id:id, direction:-1}});
    const{data:dataNextSib} = useQuery(GET_SIBLING, {variables:{_id:id, direction:1}});
    
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

        return(() => {
            props.toggleShowArrows(false);
            props.setParentRegions([]);
            props.setPrevSibling('');
            props.setNextSibling('');
        });
    })

    if(data){
        region = data.getRegionById;
        //landmarks=region.landmarks;
        
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

    
    
    const handleNavigate = () => {
        const parent = props.parentRegions[props.parentRegions.length-1];
        const newParentRegions = props.parentRegions.slice(0,props.parentRegions.length-1);
        props.setParentRegions(newParentRegions);
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
    }

    const handleRedo = async () => {
        await props.tpsRedo();
        await refetch();
    }

    const handleDeleteLandmark = async (landmark) => {
        await props.deleteLandmark(id, landmark, region.parentRegionId);
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
            <div style={{height:"60%"}}/>
            <WRow style={{paddingLeft:"15px", paddingBottom:"20px"}}>
                <span>Region Name:</span> {region.name}
            </WRow>
            <WRow style={{paddingLeft:"15px", paddingBottom:"20px"}}>
                <span>Parent Region:</span> <span onClick={handleNavigate} style={{color:"skyblue", cursor:"pointer"}}>{props.parentRegions.length?props.parentRegions[props.parentRegions.length-1].name:null}</span>
                <span><i style={{cursor:"pointer", fontSize:"20px", color:"white"}} className="material-icons">edit</i></span>
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
            
        </div>
    );
};

export default RegionViewer;