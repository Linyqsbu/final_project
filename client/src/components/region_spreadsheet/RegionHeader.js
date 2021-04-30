import {WRow, WCol, WButton} from 'wt-frontend';
const RegionHeader = (props) => {
    
    return(
        <WRow >
            <WCol className="header-col" size = "2">
                <WButton  style={{color:"white"}} wType="texted" color="danger">Name</WButton>
            </WCol>
            <WCol className="header-col" size = "2">
                <WButton  style={{color:"white"}} wType="texted" color="danger">Capital</WButton>
            </WCol>
            <WCol className="header-col" size = "2">
                <WButton style={{color:"white"}} wType="texted" color="danger">Leader</WButton>
            </WCol>
            <WCol className="header-col" size = "2">
                <WButton style={{color:"white"}} wType="texted" color="danger">Flag</WButton>
            </WCol>
            <WCol className="header-col" size = "4">
                <WButton style={{color:"white"}} wType="texted" color="danger">Landmarks</WButton>
            </WCol>
        </WRow>
    );
};

export default RegionHeader;