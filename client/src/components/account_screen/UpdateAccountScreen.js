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

    const handleUpdateAccount = async (e) => {
        console.log({_id:props.user._id,...input});
        console.log(props.user);
        for(let field in input){
            if(!input[field]){
                alert('All fields must be filled out to register');
                return;
            }
        }

        await Update({variables:{_id:props.user._id,...input}});
        await Logout();
        const {data} = await props.fetchUser();
        if(data){
            let reset = await client.resetStore();
            if(reset) history.push('/welcome');
        }
        
    }

    return(
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
                        <WInput className="modal-input" style={{backgroundColor:"white", color:"black"}} name="password" placeholderText = "***********" onBlur={updateInput}/>
                    </WRow>
                </WMMain>

                <WMFooter>
                    <WButton onClick={handleUpdateAccount}>
                        Submit
                    </WButton>
                </WMFooter>
            </WModal>
        </div>
    );
};

export default UpdateAccountScreen;