import { useEffect, useState} from "react"
import { getCharThunk } from "../../redux/character"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { updateCharThunk } from "../../redux/character"
import './CharacterEdit.css'

function CharacterEditPage(){
    const { charId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const character = useSelector((store) => store.characters[charId])
    
    const alignmentList = ["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil"]
    
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [alignment, setAlignment] = useState(alignmentList[0])
    const [errors, setErrors] = useState({})
    
    useEffect(() => {
        dispatch(getCharThunk(charId))    
    },[dispatch, charId])

    useEffect(() => {
        if(character){
            setName(character.name)
            setDescription(character.description)
            setAlignment(alignmentList[alignmentList.indexOf(character.alignment)])
        }
    }, [character])

    if(!character){
        return (<>Loading...</>)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const errors = {}
        if(name.length > 60 || name.length === 0)
            errors.name = "Name must be between 1 and 60 characters long"
        if(description.length > 255 || description.length === 0)
            errors.description = "Description must be between 1 and 255 characters long"
        setErrors(errors)

        if(!Object.keys(errors).length){
            const updatedChar = {
                name,
                description,
                alignment
            }

            const res = dispatch(updateCharThunk(charId, updatedChar))
            res.then(res => {
                navigate(`/characters/${res}`)
            })
        }

    }

    return(
        <form id="char-form-edit">
            <label>
                <span>Name </span>
                <input 
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (<div className="errors">{errors.name}</div>)}
            </label>
            <label>
                <p>Description</p>
                <textarea 
                    className="description-box"
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && (<div className="errors">{errors.description}</div>)}
            </label>
            <label>
                    <span>Alignment </span>
                    <select 
                        onChange={(e) => setAlignment(e.target.value)}
                        value={alignment}
                    >
                        {alignmentList.map((align, id) => (
                            <option key={id}>{align}</option>
                        ))}
                    </select>
            </label>
            <button id="char-edit-button" type="submit" onClick={submitHandler}>Update Character</button>
        </form>
    )

}

export default CharacterEditPage