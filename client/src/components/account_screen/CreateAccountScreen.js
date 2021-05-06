import{WInput, WModal, WMHeader, WMMain, WMFooter, WRow, WButton} from 'wt-frontend';
import {useState} from 'react';
import {REGISTER} from '../../cache/mutations';
import { useMutation } from '@apollo/client';
import {useHistory} from 'react-router-dom';
const CreateAccountScreen = (props) =>{
    const history = useHistory();
    const[input, setInput] = useState({email:'', password:'', name:''});
    const[loading, toggleLoading] = useState(false);
    const[Register] = useMutation(REGISTER);
    
    const updateInput = (e) => { 
        const {name, value} = e.target;
        const updated = {...input, [name]:value};
        setInput(updated);
    }

    const handleCreateAccount = async (e) => {
        console.log(input);
        for(let field in input){
            if(!input[field]){
                alert('All fileds must be filled out to register');
                return;
            }
        }

        const{loading, error, data} = await Register({variables:{...input}});
        if(loading){toggleLoading(true)};
        if(error){return `Error: ${error.message}`};
        if(data){
            console.log(data);
            toggleLoading(false);

            if(data.register.email === 'already exists') {
				alert('User with that email already registered');
                history.push('/welcome');
			}
			else {
				const{data} = await props.fetchUser();
                history.push('/map_selection');
			}
        }
        
     
    }

    return(
        <div>
            <WModal className = "modal" visible={true}>
                <WMHeader className = "modal-header" onClose={()=>{history.push('/welcome');}}>
                    Create a New Account
                </WMHeader>
                <WMMain className="modal-main">
                    <WRow>
                        Name: 
                        <WInput className="modal-input" style={{backgroundColor:"white", color:"black"}} onBlur={updateInput} name="name"/>
                    </WRow>
                    <WRow>
                        Email: 
                        <WInput className="modal-input" style={{backgroundColor:"white", color:"black"}} onBlur={updateInput} name="email"/>
                    </WRow>
                    <WRow>
                        Password: 
                        <WInput className="modal-input" style={{backgroundColor:"white", color:"black"}} onBlur={updateInput} inputType = "password" name="password"/>
                    </WRow>
                </WMMain>
                <WMFooter className="modal-footer">
                    <div className="modal-footer-container">

                        <WButton className = "submit-button" onClick={handleCreateAccount}>
                            Create Account
                        </WButton>                      
                        
                        <WButton className="cancel-button" onClick={()=>{history.push('/welcome');}}>
                            Cancel
                        </WButton>
                    </div>
                </WMFooter>
            </WModal>
        </div>
    );
};

export default CreateAccountScreen;