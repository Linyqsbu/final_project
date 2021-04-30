import {WButton, WInput} from 'wt-frontend';
import {useState} from 'react';

const MapEntry = (props) =>{
    const[nameEdit, toggleNameEdit] = useState(false);

    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        const newName = e.target.value;
        props.editMapName(props.map._id, newName);
    }

    return(
        <div className="map-entry">
            <span className="map-entry-name">
            {
                nameEdit
                ? <WInput autoFocus={true} onBlur = {handleNameEdit} defaultValue={props.map.name} type="text"/>
                : <span  onClick = {() => (props.handleSetActiveMap(props.map._id))}>{props.map.name}</span>
            }
            </span>
            
            

            <WButton className="map-entry-button" onClick={() => toggleNameEdit(true)}>
                <i className="material-icons">
                    edit
                </i>
            </WButton>

            <WButton className="map-entry-button" onClick = {() => {props.setActiveMap(props.map); props.toggleShowDelete(true);}}>
                <i className="material-icons">
                    delete
                </i>
            </WButton>
        </div>
    );
};

export default MapEntry;