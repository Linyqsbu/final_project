import {useParams} from 'react-router-dom';
import {WButton, WCol} from 'wt-frontend';
import RegionHeader from './RegionHeader';
import TableContent from './TableContent';
import {GET_REGION_BY_ID, GET_MAP_BY_ID} from '../../cache/queries';
import {useQuery} from '@apollo/client';
import {useState, setState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
const RegionSpreadsheet = (props) => {
    const history = useHistory();
    const{id} = useParams();
    let map = props.maps.find(map => map._id===id);
    const isMap = map!==undefined;
    console.log("id", id);
    console.log("isMap", isMap);
    /*
        let region = props.maps.find(map => map._id==id);
        const[isMap, setIsMap] = useState(region!==null);
        
        const {loading, error, data, refetch} = useQuery(GET_REGION_BY_ID, {variables:{_id:id}});
        if(loading) return null;
        if(error) console.log("error");
        if(data && !region) {
            region = data.getRegionById;
        }
    */

    let region = {};
    let subregions = [];

    
    const{loading:loadingM, data:dataM, refetch:refetchM} = useQuery(GET_MAP_BY_ID, {variables:{_id:id}});
    const{loading:loadingR, data:dataR, refetch:refetchR} = useQuery(GET_REGION_BY_ID, {variables:{_id:id}});
    
    if(dataM || dataR){
        region = isMap? dataM.getMapById : dataR.getRegionById;
        subregions = region.subregions;
    }

      
    const refetchRegion = async (refetch) =>{
        const {loading, data} = await refetch({variables:{_id:id}});
        if(loading) {console.log("loading");}
        if(data){
            if(isMap)
                region = data.getMapById;
            
            else
                region = data.getRegionById;

            
            subregions = region.subregions;
        }

    }

    const handleAddRegion = async () => {
        await props.addRegion(isMap, id);
        console.log("isMap", isMap);
        if(isMap)
            refetchRegion(refetchM);
        else
            refetchRegion(refetchR);
    }

    const clickDisabled = () =>{}

    return(
        <div>
            <div>
                <WButton onClick={handleAddRegion}>
                    <i className = 'material-icons'>
                        add
                    </i>
                </WButton>
                <WButton>
                    <i className = 'material-icons'>
                        undo
                    </i>
                </WButton>
                <WButton>
                    <i className = 'material-icons'>
                        redo
                    </i>
                </WButton>
                <div onClick = {isMap? clickDisabled: () => {history.push(`/region_viewer/${id}`)}}>
                    Region Name: {region.name}
                </div>
            </div>
            <RegionHeader/>
            <TableContent 
                subregions = {subregions}
            />
        </div>
    );
};

export default RegionSpreadsheet;