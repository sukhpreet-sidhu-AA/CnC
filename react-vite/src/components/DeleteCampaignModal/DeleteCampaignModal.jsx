import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteCampaignThunk } from "../../redux/campaign"

function DeleteCampaignModal({ id }){
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = () => {
        dispatch(deleteCampaignThunk(id))
        closeModal()
    }

    return (
        <div id="delete-page">
            <h2 className="delete-text">Confirm Delete</h2>
            <p className="delete-text">Are you sure you want to delete this Campaign?</p>
            <button id="delete" onClick={() => handleDelete()}>Yes (Delete Campaign)</button>
            <button id="keep" onClick={() => closeModal()}>No (Keep Campaign)</button>
        </div>

    )
}

export default DeleteCampaignModal