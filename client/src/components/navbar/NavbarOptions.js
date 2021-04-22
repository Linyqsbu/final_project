import {WButton, WNavItem} from 'wt-frontend';
import{useHistory} from 'react-router-dom';

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
                <WButton>
                    Login
                </WButton>
            </WNavItem>
        </div>
    );
};

const NavbarOptions = (props) =>{
    return(
        <LoggedOut/>
    );
};

export default NavbarOptions;