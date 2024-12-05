import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getCampaignThunk } from "../../redux/campaign"
// import CharacterInfoSimple from "../HomePage/CharacterInfoSimple"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import AddCharacterPage from "./AddCharacterPage"
import CMPCharacterInfoSimple from "./CMPCharacterSimpleInfo"

function CampaignPage(){
    const { campId } = useParams()
    const dispatch = useDispatch()
    const campaign = useSelector((state) => state.campaigns[campId])


    useEffect(() => {
        dispatch(getCampaignThunk(campId))
    }, [dispatch, campId])

    if(!campaign)
        return (<>Loading...</>)

    const charList = Object.values(campaign.Characters)

    return (
        <div>
            <h2>{campaign.name}</h2>
            <h3>{campaign.description}</h3>
            <div>
                <h4>Characters</h4>
                {Object.values(charList).length ? 
                (
                    <CMPCharacterInfoSimple charList={charList} />
                )
                :
                (
                    <p>No characters in this Campaign yet</p>
                )}
                <button>
                    <OpenModalMenuItem 
                        itemText="Add Characters"
                        modalComponent={<AddCharacterPage campId={campId}/>}
                    />
                </button>
            </div>
        </div>
    )
}

export default CampaignPage