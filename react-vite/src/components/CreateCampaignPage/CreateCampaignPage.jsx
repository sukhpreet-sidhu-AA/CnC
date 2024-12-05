import { useState } from "react"
import { useDispatch } from "react-redux"
import { createCampaignThunk } from "../../redux/campaign"
import { useNavigate } from "react-router-dom"
import './CCP.css'

function CreateCampaignPage(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()
        const errors = {}
        if(name.length > 60 || name.length === 0)
            errors.name = "Name must be between 1 and 60 characters long"
        if(description.length > 255 || description.length === 0)
            errors.description = "Description must be between 1 and 255 characters long"
        setErrors(errors)

        if(!Object.keys(errors).length){
            const newCmp = {
                name,
                description
            }

            const res = dispatch(createCampaignThunk(newCmp))
            res.then(res => {
                navigate(`/campaigns/${res}`)
            })
        }
    }

    return (
        <form id="camp-edit-form">
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
                <button
                    id="char-edit-button"
                    type="submit"
                    onClick={submitHandler}
                >
                    Create New Campaign
                </button>
        </form>
    )
}

export default CreateCampaignPage