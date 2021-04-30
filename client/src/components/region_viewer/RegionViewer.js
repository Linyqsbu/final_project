import {useParams} from 'react-router-dom';
import {GET_REGION_BY_ID} from '../../cache/queries';
import {useQuery} from '@apollo/client'
import {WRow} from 'wt-frontend';
const RegionViewer = (props) => {
    const {id} = useParams();
    let map = props.maps.find(map => map._id === id)

    
    let region = {};

    const{loading,data} = useQuery(GET_REGION_BY_ID, {variables:{_id:id}});
    if(loading) return null;
    if(data){
        region = data.getRegionById;
    }

    return(
        <div>
            <WRow>
                Region Name: {region.name}
            </WRow>
            <WRow>
                Parent Region: {region.parentRegionId}
            </WRow>
            <WRow>
                Regional Capital: {region.capital}
            </WRow>
            <WRow>
                Regional Leader: {region.leader}
            </WRow>
            <WRow>
                # of subregions: {region.subregions.length}
            </WRow>
        </div>
    );
};

export default RegionViewer;