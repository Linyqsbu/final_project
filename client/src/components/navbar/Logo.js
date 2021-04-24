import React from 'react';
import {useHistory} from 'react-router-dom';
import {WButton} from 'wt-frontend';
const Logo = (props) => {
    const history = useHistory();

    return (
        <div>
            {!props.user? <div> World Data Mapper </div>:
                <WButton color="accent" wType = "texted" onClick = {() => {history.push('/map_selection');}}>
                    World Data Mapper
                </WButton>
            }
        </div>
    );
};

export default Logo;