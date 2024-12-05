import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import LoginFormModal from "../LoginFormModal"
import SignupFormModal from "../SignupFormModal"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { getUserCharactersThunk } from "../../redux/character"
import { getUserCampaignsThunk } from "../../redux/campaign"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import CharacterInfoSimple from "./CharacterInfoSimple"
import CampaignInfoSimple from "./CampaignInfoSimple"


function HomePage() {
    const dispatch = useDispatch()
    const user = useSelector((store) => store.session.user)
    const characters = useSelector(store => store.characters)
    const charList = Object.values(characters).filter(character => character.user_id === user.id)
    const campaigns = useSelector((store) => store.campaigns)
    const campList = Object.values(campaigns)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getUserCharactersThunk())
        dispatch(getUserCampaignsThunk())
    }, [dispatch, user])

    const createChar = () => {
        navigate('/characters/new')
    }

    if(!charList || !campList){
        return (<>Loading...</>)
    }

    return (
        <>
            {user ?
                (<>
                    <div>
                        <h2>Characters</h2>
                        <div>
                            <CharacterInfoSimple charList={charList}/>
                            <button onClick={createChar}>Create New Character</button>
                        </div>
                    </div>
                    <div>
                        <h2>Campaigns</h2>
                        <div>
                            <CampaignInfoSimple campList={campList}/>
                            <button onClick={() => navigate('/campaigns/new')}>Create New Campaign</button>
                        </div>
                    </div>
                </>)
                :
                (<>
                    <h1>Welcome to Campaigns and Characters! A site where you can manage your DnD characters and campaigns digitally.</h1>
                    <h2>Log in or create and account to get started!</h2>
                    <button>
                        <OpenModalMenuItem
                            itemText="Log In"
                            modalComponent={<LoginFormModal />}
                        />
                    </button>
                    <button>
                        <OpenModalMenuItem
                            itemText="Sign Up"
                            modalComponent={<SignupFormModal />}
                        />
                    </button>
                </>)}
        </>
    )
}

export default HomePage