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
    const history = useHistory();
    const client = useApolloClient();
    const[Logout] = useMutation(LOGOUT);

    const handleLogout = async (e) => {
        Logout();
        const {data} = await props.fetchUser();
        console.log(data);
        if(data){
            let reset = await client.resetStore();
            if(reset) history.push('/welcome');
        }

    };
    
    return(
        <WNavItem>
            <WNavItem>
                <WButton onClick={()=>history.push('/update_account')}>
                    {props.user.name}
                </WButton>
            </WNavItem>
            <WNavItem>
                <WButton onClick={handleLogout}>
                    Logout
                </WButton>
            </WNavItem>
        </WNavItem>
    )
}
const NavbarOptions = (props) =>{
    return(
        <div>
            {
                props.auth === false ? <LoggedOut/>:<LoggedIn user={props.user} fetchUser={props.fetchUser}/>
            }
        </div>
    );
};

export default NavbarOptions;