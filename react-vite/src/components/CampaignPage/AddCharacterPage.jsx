import { useState } from "react"
import { userSearchThunk } from "../../redux/campaign"
import { useDispatch } from "react-redux"
import { updateCharCampaign } from "../../redux/character"
import { useModal } from "../../context/Modal"
import { getCampaignThunk } from "../../redux/campaign"

function AddCharacterPage({ campId }){

    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [characters, setCharacters] = useState([])
    const [error, setError] = useState('')

    const search = (e) => {
        e.preventDefault()
        const res = dispatch(userSearchThunk(username))
        res.then(res => {
            if(res.error){
                setCharacters([])
                setError(res.error)
            }
            else{
                setCharacters(res.Characters)
                setError('')
            }
        })
    }

    const add = (e) => {
        e.preventDefault()
        dispatch(updateCharCampaign(e.target.value, campId)).then(() => dispatch(getCampaignThunk(campId)))
        closeModal()
        
    }

    return (
        <div>
            <input 
                type="text"
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={search} disabled={!username}>Search</button>
            {error && (<div className="errors">{error}</div>)}
            {characters.map(({name, id}) => (
                <div key={id}>
                    <p>{name}</p>
                    <button value={id} onClick={add}>Add Character</button>
                </div>
            ))}
        </div>
    )
}

export default AddCharacterPage