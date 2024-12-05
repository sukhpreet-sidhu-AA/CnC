import { useEffect, useState } from "react"
import { useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getRacesThunk } from "../../redux/race"
import { createCharacterThunk } from "../../redux/character"
import './CreateCharacterPage.css'


function CreateCharacterPage(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const alignmentList = ["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil"]
    const classList = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard']
    const raceList = ["Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", "Half-Orc", "Halfling" , "Human" ,"Tiefling" ]

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [alignment, setAlignment] = useState(alignmentList[0])
    const [class_id, setClass_id] = useState(classList[0])
    const [race_id, setRace_id] = useState(raceList[0])
    const [strength, setStrength] = useState(8)
    const [dexterity, setDexterity] = useState(8)
    const [constitution, setConstitution] = useState(8)
    const [intelligence, setIntelligence] = useState(8)
    const [wisdom, setWisdom] = useState(8)
    const [charisma, setCharisma] = useState(8)
    const [points, setPoints] = useState(27)
    const [raceModifier, setRaceModifier] = useState([2,0,0,0,0,1])
    const [errors, setErrors] = useState({})
    const races = useSelector(state => state.races)
    

    useEffect(() => {
        dispatch(getRacesThunk())
    },[dispatch])

    useEffect(() => {
        if(Object.keys(races).length > 0)
        {
            const raceMods = Object.values(races).find((race) => race.name === race_id);
            const newArr = [raceMods.strength_modifier, raceMods.dexterity_modifier, raceMods.constitution_modifier, raceMods.intelligence_modifier, raceMods.wisdom_modifier, raceMods.charisma_modifier]
            setRaceModifier(newArr)
        }
    },[race_id, races])


    const minusOne = (e) =>{
        e.preventDefault()
        if (e.target.value == "strength" && strength > 8)
            {
                setStrength(strength - 1)
                setPoints(points + 1)
            }
        else if (e.target.value == "dexterity" && dexterity > 8)
            {
                setDexterity(dexterity - 1)
                setPoints(points + 1)
            }
        else if (e.target.value == "constitution" && constitution > 8)
            {
                setConstitution(constitution - 1)
                setPoints(points + 1)
            }
        else if (e.target.value == "intelligence" && intelligence > 8)
            {
                setIntelligence(intelligence - 1)
                setPoints(points + 1)
            }
        else if (e.target.value == "wisdom" && wisdom > 8)
            {
                setWisdom(wisdom - 1)
                setPoints(points + 1)
            }
        else if (e.target.value == "charisma" && charisma > 8)
            {
                setCharisma(charisma - 1)
                setPoints(points + 1)
            }
    }

    const plusOne = (e) =>{
        e.preventDefault()
        if(points > 0){
            if (e.target.value == "strength" && strength < 15)
                {
                    setStrength(strength + 1)
                    setPoints(points - 1)
                }
            else if (e.target.value == "dexterity" && dexterity < 15)
                {
                    setDexterity(dexterity + 1)
                    setPoints(points - 1)
                }
            else if (e.target.value == "constitution" && constitution < 15)
                {
                    setConstitution(constitution + 1)
                    setPoints(points - 1)
                }
            else if (e.target.value == "intelligence" && intelligence < 15)
                {
                    setIntelligence(intelligence + 1)
                    setPoints(points - 1)
                }
            else if (e.target.value == "wisdom" && wisdom < 15)
                {
                    setWisdom(wisdom + 1)
                    setPoints(points - 1)
                }
            else if (e.target.value == "charisma" && charisma < 15)
                {
                    setCharisma(charisma + 1)
                    setPoints(points - 1)
                }
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const errors = {}
        if(name.length > 60 || name.length === 0)
            errors.name = "Name must be between 1 and 60 characters long"
        if(description.length > 255 || description.length === 0)
            errors.description = "Description must be between 1 and 255 characters long"
        if(points !== 0)
            errors.points = "All points must be allocated"
        setErrors(errors)

        if(!Object.keys(errors).length){
            const newChar = {
                name,
                description,
                class_id: classList.indexOf(class_id) + 1,
                race_id: raceList.indexOf(race_id) + 1,
                alignment,
                strength: strength + raceModifier[0],
                dexterity: dexterity + raceModifier[1],
                constitution: constitution + raceModifier[2],
                intelligence: intelligence + raceModifier[3],
                wisdom: wisdom + raceModifier[4],
                charisma: charisma + raceModifier[5],
            }

            const res = dispatch(createCharacterThunk(newChar))
            res.then(res => {
                navigate(`/characters/${res}`)
            })
        }

    }

    return (
        <div id="form-wrapper">
            <form id="create-character-form">
                <h1>Create a New Character</h1>
                <div id="char-create-info">
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
                        <span>Class </span>
                        <select 
                            onChange={(e) => setClass_id(e.target.value)}
                            defaultValue={class_id}
                        >
                            {classList.map((cls, id) => (
                                <option key={id}>{cls}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span>Race </span>
                        <select 
                            onChange={(e) => setRace_id(e.target.value)}
                            defaultValue={race_id}
                        >
                            {raceList.map((race, id) => (
                                <option key={id}>{race}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span>Alignment </span>
                        <select 
                            onChange={(e) => setAlignment(e.target.value)}
                            defaultValue={alignment}
                        >
                            {alignmentList.map((align, id) => (
                                <option key={id}>{align}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <h2>Assign Points</h2>
                    <p>Each trait may have a maximum of 15 points and a minimum of 8 points</p>
                    <h3>Points Remaining: {points}/27</h3>
                    {errors.points && (<div className="errors">{errors.points}</div>)}
                    
                    <div id="points">
                        <div id="points-side">
                            <p>Race Bonus:</p>
                            <p>Total:</p>
                        </div>
                        <div id="point-assignment">
                            <div className="stat-adjust">
                                <h3>Strength</h3>
                                <button value="strength" onClick={plusOne}>+1</button>
                                <p>{strength}</p>
                                <button value="strength" onClick={minusOne}>-1</button>
                                <p>+{raceModifier[0]}</p>
                                <p>{strength + raceModifier[0]}</p>
                            </div>
                            <div className="stat-adjust">
                                <h3>Dexterity</h3>
                                <button value="dexterity" onClick={plusOne}>+1</button>
                                <p>{dexterity}</p>
                                <button value="dexterity" onClick={minusOne}>-1</button>
                                <p>+{raceModifier[1]}</p>
                                <p>{dexterity + raceModifier[1]}</p>
                            </div>
                            <div className="stat-adjust">
                                <h3>Constitution</h3>
                                <button value="constitution" onClick={plusOne}>+1</button>
                                <p>{constitution}</p>
                                <button value="constitution" onClick={minusOne}>-1</button>
                                <p>+{raceModifier[2]}</p>
                                <p>{constitution + raceModifier[2]}</p>
                            </div>
                            <div className="stat-adjust">
                                <h3>Intelligence</h3>
                                <button value="intelligence" onClick={plusOne}>+1</button>
                                <p>{intelligence}</p>
                                <button value="intelligence" onClick={minusOne}>-1</button>
                                <p>+{raceModifier[3]}</p>
                                <p>{intelligence + raceModifier[3]}</p>
                            </div>
                            <div className="stat-adjust">
                                <h3>Wisdom</h3>
                                <button value="wisdom" onClick={plusOne}>+1</button>
                                <p>{wisdom}</p>
                                <button value="wisdom" onClick={minusOne}>-1</button>
                                <p>+{raceModifier[4]}</p>
                                <p>{wisdom + raceModifier[4]}</p>
                            </div>
                            <div className="stat-adjust">
                                <h3>Charisma</h3>
                                <button value="charisma" onClick={plusOne}>+1</button>
                                <p>{charisma}</p>
                                <button value="charisma" onClick={minusOne}>-1</button>
                                <p>+{raceModifier[5]}</p>
                                <p>{charisma + raceModifier[5]}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    id="submit-button"
                    type="submit"
                    onClick={submitHandler}
                >
                    Create New Character
                </button>
                    
            </form>
        </div>
    )
}

export default CreateCharacterPage