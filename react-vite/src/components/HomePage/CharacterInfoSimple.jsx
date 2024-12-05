import { NavLink } from "react-router-dom"
import { useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import DeleteCharacterModal from "../DeleteCharacterModal/DeleteCharacterModal"
// import { updateCharCampaign } from "../../redux/character"
// import { getCampaignThunk } from "../../redux/campaign"

function CharacterInfoSimple({charList}){
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()

    return(
        <div>
            {charList.map(({id, name, Race, Class, user_id}) => (
                <div key={id}>
                    <NavLink to={`/characters/${id}`}>
                        <h3>{name}</h3>
                        <p>{Race.name}</p>
                        <p>{Class.name}</p>
                    </NavLink>
                    {user.id === user_id && (
                        <div>
                            <button onClick={() => navigate(`/characters/${id}/edit`)}>Edit</button>
                            <button>
                                <OpenModalMenuItem
                                    itemText="Delete"
                                    modalComponent={<DeleteCharacterModal id={id}/>}
                                />
                            </button>
                        </div>
                    )}
                    {/* {user.id !== user_id && (
                        <button value={[id, campaign_id]} onClick={remove}>Remove from Campaign</button>
                    )} */}
                </div>
            ))}
        </div>
    )
}

export default CharacterInfoSimple