import RegionEntry from './RegionEntry';
import {WRow} from 'wt-frontend';
import {useState, useEffect} from 'react';
const TableContent = (props) => {
    const[edit, setEdit] = useState({field:'', index:-1});

    useEffect(() =>{
        document.addEventListener("keydown", handleKeyDown);
        return () => {document.removeEventListener("keydown", handleKeyDown)};
    })

    const handleKeyDown = (event) => {
        if(event.keyCode === 37){//left arrow
            if(edit.field=='capital'){
                setEdit({field:'name', index:edit.index});
            }

            else if(edit.field=='leader'){
                setEdit({field:'capital', index:edit.index});
            }
        }

        else if(event.keyCode==39){//right arrow
            if(edit.field=='name'){
                setEdit({field:'capital', index:edit.index});
            }

            else if(edit.field=='capital'){
                setEdit({field:'leader', index:edit.index});
            }
        }

        else if(event.keyCode==38){//up arrow
            if(edit.index>0){
                setEdit({field:edit.field, index:edit.index-1});
            }
        }

        else if(event.keyCode==40){//down arrow
            if(edit.index<props.subregions.length-1){
                setEdit({field:edit.field, index:edit.index+1});
            }
        }
    }
    
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
                        isMap={props.isMap}
                        edit={edit}
                        setEdit={setEdit}
                    />)
                )
            }
        </div>
    );
};

export default TableContent;