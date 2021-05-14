import {WNavItem, WButton} from 'wt-frontend';
import {useHistory} from 'react-router-dom';
const Arrows = (props) => {
    const history=useHistory();
    const hasPrev = props.prevSibling!="invalid id";
    const hasNext = props.nextSibling!="invalid id"
    const prevColor = hasPrev? "white":"gray";
    const nextColor = hasNext? "white":"gray";

    const clickDisabled = () => {}

    const handleNavigate = (_id) => {
        props.tps.clearAllTransactions();
        props.setUndoable(false);
        props.setRedoable(false);
        history.push(`/region_viewer/${_id}`);
    }

    return(
    <WNavItem style={{paddingRight:"220px"}}>
        <WButton onClick={hasPrev? ()=>{handleNavigate(props.prevSibling);}:clickDisabled} wType="texted" style={{color:`${prevColor}`}}><i className="material-icons">arrow_back</i></WButton>
        <WButton onClick={hasNext? ()=>{handleNavigate(props.nextSibling);}:clickDisabled} wType="texted" style={{color:`${nextColor}`}}><i className="material-icons">arrow_forward</i></WButton>
    </WNavItem>);
}

export default Arrows;