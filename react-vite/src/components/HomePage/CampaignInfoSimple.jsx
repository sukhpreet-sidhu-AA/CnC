import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import DeleteCampaignModal from "../DeleteCampaignModal"

function CampaignInfoSimple({ campList }){
    const user = useSelector(store => store.session.user)
    // const navigate = useNavigate()
    return (
        <div>
            {campList.map(({ id, name, user_id}) => (
                <div key={id}>
                    <NavLink to={`/campaigns/${id}`}>
                        <h3>{name}</h3>
                        {/* <p>Campaign Started {created.split(" ").slice(1,4).join(" ")}</p> */}
                    </NavLink>
                    {user.id === user_id && (
                        <button>
                            <OpenModalMenuItem
                                itemText="Delete"
                                modalComponent={<DeleteCampaignModal id={id}/>}
                            />
                        </button>
                    )}
                </div>
            ))}
        </div>
    )
}

export default CampaignInfoSimple