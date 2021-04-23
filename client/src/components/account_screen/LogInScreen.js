import {WModal, WMHeader, WMMain, WMFooter, WInput, WRow, WButton} from 'wt-frontend';
import{useHistory} from 'react-router-dom';
import {LOGIN} from '../../cache/mutations';
import {useMutation} from '@apollo/client';
import {useState} from 'react'
const LogInScreen = (props) => {
    const history = useHistory();
    
    const[input, setInput] = useState({email:'', password:''});
    const[loading, toggleLoading] = useState(false);
    const[showErr, displayErrorMsg] = useState(false);
    const errorMsg = "Email/Password not found.";
    const [Login] = useMutation(LOGIN);
    
    const updateInput = (e) => {
        const {name, value} = e.target;
        const updated = {...input, [name]: value};
        setInput(updated);
    }

    const handleLogin = async (e) => {
        console.log(input);
        const{loading, error, data} = await Login({variables:{...input}});
        if(loading){toggleLoading(true)};
        console.log(data);
        if(data.login._id === null){
            displayErrorMsg(true);
            return;
        }

        if(data){
            props.fetchUser();
            history.push("/map_selection");
        }
    }

    return (
        <WModal visible={true}>
            <WMHeader onClose={()=>{history.push("/welcome")}}>
                Login
            </WMHeader>

            <WMMain>
                <WRow>
                    Email:
                    <WInput name="email" onBlur={updateInput}/>                    
                </WRow>

                <WRow>
                    Password:
                    <WInput name="password" onBlur={updateInput}/>
                </WRow>
            </WMMain>

            <WMFooter>
                <WButton onClick={handleLogin}>
                    Submit
                </WButton>
            </WMFooter>
        </WModal>
    );
};

export default LogInScreen;