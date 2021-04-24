import{useQuery} from '@apollo/client';
import Screen from './Screen';
import * as queries from "./cache/queries";

const App = () => {
    
    const { loading, error, data, refetch} = useQuery(queries.GET_DB_USER);

    let user = null;
    //let transactionStack = new jsTPS();

    if(error) { console.log(error); }
    if(loading) { console.log(loading); }
    if(data) { 
        let { getCurrentUser } = data;
        if(getCurrentUser !== null) { user = getCurrentUser; }
    }

    
    return(
        <div>
            <Screen refetchUser = {refetch} user = {user}/>
        </div>
    )
}

export default App;