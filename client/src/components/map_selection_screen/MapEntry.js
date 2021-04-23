import {WButton} from 'wt-frontend';
const MapEntry = (props) =>{
    
    return(
        <div>
            {props.map.name}
            <WButton onClick = {() => {props.setActiveMap(props.map); props.toggleShowDelete(true);}}>
                <i className="material-icons">
                    delete_outline
                </i>
            </WButton>
        </div>
    );
};

export default MapEntry;