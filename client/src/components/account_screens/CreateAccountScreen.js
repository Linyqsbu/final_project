import{WInput, WModal, WMHeader, WMMain, WMFooter, WRow, WButton} from 'wt-frontend';
import {useState} from 'react';
import {REGISTER} from '../../cache/mutations';
import { useMutation } from '@apollo/client';

const CreateAccountScreen = (props) =>{
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
        }
    }

    return(
        <div>
            <WModal visible={true}>
                <WMHeader>
                    Create a New Account
                </WMHeader>
                <WMMain>
                    <WRow>
                        Name:
                        <WInput onBlur={updateInput} name="name"/>
                    </WRow>
                    <WRow>
                        Email:
                        <WInput onBlur={updateInput} name="email"/>
                    </WRow>
                    <WRow>
                        Password:
                        <WInput onBlur={updateInput} name="password"/>
                    </WRow>
                </WMMain>
                <WMFooter>
                    <WButton onClick={handleCreateAccount}>
                        Submit
                    </WButton>
                </WMFooter>
            </WModal>
        </div>
    );
};

export default CreateAccountScreen;