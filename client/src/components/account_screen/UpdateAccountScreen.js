import{WModal, WMHeader, WMMain, WMFooter, WRow, WInput, WButton} from "wt-frontend";
import{useHistory} from 'react-router-dom';
import {UPDATE} from '../../cache/mutations';
import {useState} from 'react';
import {useMutation, useApolloClient} from '@apollo/client';
import {LOGOUT} from '../../cache/mutations';


const UpdateAccountScreen = (props) => {
    const history=useHistory();
    const[input, setInput] = useState({email:'', password:'', name:''});
    const[loading, toggleLoading] = useState(false);
    const[Update] = useMutation(UPDATE);
    const[Logout] = useMutation(LOGOUT);
    const client = useApolloClient();

    const updateInput = (e) => {
        const{name, value} = e.target;
        const updated = {...input, [name]: value};
        setInput(updated);
    }

    const handleUpdateAccount = async () => {
        console.log({_id:props.user._id,...input});
        console.log(props.user);
        for(let field in input){
            if(!input[field]){
                alert('All fields must be filled out to register');
                return;
            }
        }

        const {data:message} = await Update({variables:{_id:props.user._id,...input}});
        if(message){
            if(message.update === 'Email already exist'){
                alert('User with that email already exist');
            }
        }
        await Logout();
        const {data} = await props.fetchUser();
        if(data){
            let reset = await client.clearStore();
        }
        props.setParentRegions([]);
        history.push('/welcome');
        
    }

    return(
        props.user?(
        <div>
            <WModal className = "modal" visible={true}>
                <WMHeader className="modal-header" onClose={()=> history.push('/map_selection')}> 
                    Enter Updated Information
                </WMHeader>

                <WMMain>
                    <WRow>
                        Name:
                        <WInput className="modal-input" style={{backgroundColor:"white", color:"black"}} name="name" placeholderText = {props.user.name} onBlur={updateInput}/>    
                    </WRow>
                    <WRow>
                        Email:
                        <WInput className="modal-input" style={{backgroundColor:"white", color:"black"}} name="email" placeholderText = {props.user.email} onBlur={updateInput}/>
                    </WRow>
                    <WRow>
                        Password:
                        <WInput className="modal-input" style={{backgroundColor:"white", color:"black"}} name="password" inputType="password" placeholderText = "***********" onBlur={updateInput}/>
                    </WRow>
                </WMMain>

                <WMFooter>
                    <WButton style={{float:"left"}} onClick={handleUpdateAccount}>
                        Submit
                    </WButton>
                    <WButton style={{float:"right"}} onClick={() => {history.push('/map_selection')}}>
                        Cancel
                    </WButton>
                </WMFooter>
            </WModal>
        </div>):null
    );
};

export default UpdateAccountScreen;