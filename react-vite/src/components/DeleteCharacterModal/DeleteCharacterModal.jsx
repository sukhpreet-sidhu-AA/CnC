import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteCharThunk } from "../../redux/character"

function DeleteCharacterModal({id}){
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = () => {
        dispatch(deleteCharThunk(id))
        closeModal()
    }

    return (
        <div id="delete-page">
            <h2 className="delete-text">Confirm Delete</h2>
            <p className="delete-text">Are you sure you want to delete this character?</p>
            <button id="delete" onClick={() => handleDelete()}>Yes (Delete Character)</button>
            <button id="keep" onClick={() => closeModal()}>No (Keep Character)</button>
        </div>

    )
}

export default DeleteCharacterModal