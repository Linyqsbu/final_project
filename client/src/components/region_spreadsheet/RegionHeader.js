import {WRow, WCol, WButton} from 'wt-frontend';
const RegionHeader = (props) => {
    
    return(
        <WRow>
            <WCol size = "2">
                <WButton color="danger">Name</WButton>
            </WCol>
            <WCol size = "2">
                <WButton color="danger">Capital</WButton>
            </WCol>
            <WCol size = "2">
                <WButton color="danger">Leader</WButton>
            </WCol>
            <WCol size = "2">
                <WButton color="danger">Flag</WButton>
            </WCol>
            <WCol size = "2">
                <WButton color="danger">Landmarks</WButton>
            </WCol>
        </WRow>
    );
};

export default RegionHeader;