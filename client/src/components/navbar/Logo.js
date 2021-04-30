import React from 'react';
import {useHistory} from 'react-router-dom';
import {WButton} from 'wt-frontend';
const Logo = (props) => {
    const history = useHistory();

    return (
        <div>
            {!props.user? <div className="logo"> The World Data Mapper </div>:
                <div className = "logo-button" onClick = {() => {history.push('/map_selection');}}>
                    The World Data Mapper
                </div>
            }
        </div>
    );
};

export default Logo;