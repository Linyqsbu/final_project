import {useParams} from 'react-router-dom';
import {WButton, WCol} from 'wt-frontend';
import RegionHeader from './RegionHeader';
import TableContent from './TableContent';
const RegionSpreadsheet = (props) => {
    const{id} = useParams();
    const map = props.maps.find(map => map._id==id);
    const subregions = map.subregions;

    return(
        <div>
            <div>
                <WButton onClick={props.addRegion}>
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
                <div>
                    Region Name: {map.name}
                </div>
            </div>
            <RegionHeader/>
            <TableContent subregions = {subregions}/>
        </div>
    );
};

export default RegionSpreadsheet;