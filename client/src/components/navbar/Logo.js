import React from 'react';
import {useHistory} from 'react-router-dom';
import {WButton} from 'wt-frontend';
const Logo = (props) => {
    const history = useHistory();

    const handleNavigate = () => {
        history.push('/map_selection');
        props.setParentRegions([]);
        props.tps.clearAllTransactions();
        props.setUndoable(false);
        props.setRedoable(false);
        
    }

    return (
        <div>
            {!props.user? <div className="logo"> The World Data Mapper </div>:
                <div className = "logo-button" onClick = {handleNavigate}>
                    The World Data Mapper
                </div>
            }
        </div>
    );
};

export default Logo;