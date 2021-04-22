import {WButton, WNavItem} from 'wt-frontend';
import{useHistory} from 'react-router-dom';
import {useMutation, useApolloClient} from '@apollo/client';
import {LOGOUT} from '../../cache/mutations';

const LoggedOut = (props) =>{
    const history = useHistory();
    return(
        <div>
            <WNavItem>
                <WButton onClick={()=>{history.push('/create_account');}}>
                    Create Account
                </WButton>
            </WNavItem>
            <WNavItem>
                <WButton onClick={()=>{history.push('/log_in');}}>
                    Login
                </WButton>
            </WNavItem>
        </div>
    );
};

const LoggedIn = (props) => {
    const client = useApolloClient();
    const[Logout] = useMutation(LOGOUT);

    const handleLogout = async (e) => {
        Logout();
    };
    
    return(
        <WNavItem>
            <WButton>
                Logout
            </WButton>
        </WNavItem>
    )
}
const NavbarOptions = (props) =>{
    return(
        <div>
            {
                props.auth === false ? <LoggedOut/>:<LoggedIn/>
            }
        </div>
    );
};

export default NavbarOptions;