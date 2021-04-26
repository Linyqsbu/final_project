import {WRow, WCol} from 'wt-frontend';

const RegionEntry = (props) => {
    return(
        <WRow>
            <WCol size="2">
                {props.subregion.name}
            </WCol>
            <WCol size="2">
                {props.subregion.capital}
            </WCol>
            <WCol size="2">
                {props.subregion.leader}
            </WCol>
            <WCol size="2">
                {props.subregion.flag}
            </WCol>
            <WCol size="2">
                {props.subregion.landmarks}
            </WCol>
        </WRow>
    );
};

export default RegionEntry;