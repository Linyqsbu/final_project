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
        const{loading, error, data} = await Login({variables:{...input}});
        if(loading){toggleLoading(true)};
        
        if(data.login._id === null){
            displayErrorMsg(true);
            return;
        }

        if(data){
            await props.fetchUser();
            await props.refetchMaps(props.fetchMaps);
            history.push("/map_selection");
        }
    }

    return (
        <WModal className="modal" visible={true}>
            <WMHeader className = "modal-header" onClose={()=>{history.push("/welcome")}}>
                Login
            </WMHeader>

            <WMMain className="modal-main">
                <WRow>
                    Email:
                    <WInput className = "modal-input" style={{backgroundColor:"white", color:"black"}} name="email" onBlur={updateInput}/>                    
                </WRow>

                <WRow>
                    Password:
                    <WInput className = "modal-input" style={{backgroundColor:"white", color:"black"}} name="password" onBlur={updateInput} inputType='password'/>
                </WRow>
            </WMMain>

            <WMFooter className="modal-footer">
                <div className="modal-footer-container">
                    <WButton className="submit-button" onClick={handleLogin}>
                        Submit
                    </WButton>

                    <WButton className="cancel-button" onClick={()=>{history.push('/welcome');}}>
                            Cancel
                    </WButton>
                </div>
            </WMFooter>
        </WModal>
    );
};

export default LogInScreen;