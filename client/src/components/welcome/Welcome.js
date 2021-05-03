import globe from './Globe.PNG';


const Welcome = (props) =>{
    return(
        <div className="welcome-container">
            <img src = {globe} alt= "Globe" />
            Welcome to the World Data Mapper
        </div>
    );
};
export default Welcome;