import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCharThunk } from "../../redux/character"
import { useDispatch, useSelector } from "react-redux"
import { updateHPThunk } from "../../redux/character"


function CharacterPage(){
    const { charId } = useParams()
    const dispatch = useDispatch();
    const character = useSelector((store) => store.characters[charId])
    const userId = useSelector((store) => store.session.user.id)
    const [hpChange, setHpChange] = useState('')
    let validInt = false

    useEffect(() => {
        dispatch(getCharThunk(charId))
    },[dispatch, charId])

    if(!character){
        return (<>Loading...</>)
    }

    let maxHp = Math.floor((character.constitution - 10) / 2) + character.Class.hit_die

    const damage = (e) => {
        e.preventDefault()
        if(parseInt(hpChange) >= character.hp)
            dispatch(updateHPThunk(charId, 0))
        else    
            dispatch(updateHPThunk(charId, character.hp - parseInt(hpChange)))
        setHpChange('')
        
    } 

    const heal = (e) =>{
        e.preventDefault()
        if(parseInt(hpChange) + character.hp >= maxHp){
            dispatch(updateHPThunk(charId, maxHp))
        }
        else
            dispatch(updateHPThunk(charId, character.hp + parseInt(hpChange)))
        setHpChange('')
    } 

    if(parseInt(hpChange) > 0 && hpChange.match(/^[0-9]+$/) && character.user_id === userId){
        validInt = true
    }

    function getModifier(num){
        const modifier = Math.floor((num - 10) / 2)
        if(modifier >= 0)
            return `+${modifier}`
        else
            return modifier
    }
    

    return (
        <div>
            <div>
                <h2>{character.name}</h2>
                <h3>{character.Race.name} {character.Class.name}</h3>
                <p>{character.alignment}</p>
                <img src={`/${character.Class.name.toLowerCase()}.png`} alt={`${character.Class.name}`} />
                {character.description && (
                    <p>{character.description}</p>
                )}
            </div>
            <div>
                <div>
                    <form>
                        <button type="submit" disabled={!validInt} onClick={heal}>Heal</button>
                        <input
                            type="text"
                            name="hpChange"
                            value={hpChange}
                            onChange={(e) => setHpChange(e.target.value)}
                        />
                        <button type="submit" disabled={!validInt} onClick={damage}>Damage</button>
                    </form>
                    <div>
                        <div>
                            <div>
                                <p>current</p>
                                <h3>{character.hp}</h3>
                            </div>
                            <div>
                                <p> / </p>
                            </div>
                            <div>
                                <p>max</p>
                                <h3>{maxHp}</h3>
                            </div>
                        </div>
                        <div>
                            <h3>Hit Points</h3>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Strength</p>
                        <h2>{`${getModifier(character.strength)}`}</h2>
                        <p>{character.strength}</p>
                    </div>
                    <div>
                        <p>Dexterity</p>
                        <h2>{`${getModifier(character.dexterity)}`}</h2>
                        <p>{character.dexterity}</p>
                    </div>
                    <div>
                        <p>Constitution</p>
                        <h2>{`${getModifier(character.constitution)}`}</h2>
                        <p>{character.constitution}</p>
                    </div>
                    <div>
                        <p>Intelligence</p>
                        <h2>{`${getModifier(character.intelligence)}`}</h2>
                        <p>{character.intelligence}</p>
                    </div>
                    <div>
                        <p>Wisdom</p>
                        <h2>{`${getModifier(character.wisdom)}`}</h2>
                        <p>{character.wisdom}</p>
                    </div>
                    <div>
                        <p>Charisma</p>
                        <h2>{`${getModifier(character.charisma)}`}</h2>
                        <p>{character.charisma}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharacterPage