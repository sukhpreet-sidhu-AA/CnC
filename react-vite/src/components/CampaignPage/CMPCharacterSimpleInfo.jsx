import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { updateCharCampaign } from "../../redux/character"
import { getCampaignThunk } from "../../redux/campaign"
import './CampaignPage.css'

function CMPCharacterInfoSimple({charList}){
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const remove = (e) => {
        e.preventDefault()
        dispatch(updateCharCampaign(e.target.value[0], 0)).then(() => dispatch(getCampaignThunk(e.target.value[2])))
    }

    return(
        <div>
            {charList.map(({id, name, Race, Class, user_id, campaign_id}) => (
                <div className="char-info" key={id}>
                    <NavLink to={`/characters/${id}`}>
                        <h3 className="name">{name}</h3>
                        <p id="race-class">{`${Race.name} ${Class.name}`}</p>
                    </NavLink>
                    {user.id !== user_id && (
                        <button value={[id, campaign_id]} onClick={remove}>Remove from Campaign</button>
                    )}
                </div>
            ))}
        </div>
    )
}

export default CMPCharacterInfoSimple