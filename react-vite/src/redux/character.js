const GET_USER_CHARS = 'characters/getUserChars'
const GET_CHAR = 'characters/getChar'
const CREATE_CHAR = 'characters/new'
const UPDATE_HP = 'character/hpChange'
const UPDATE_CHAR = 'character/edit'
const DELETE_CHAR = 'character/delete'

const getUserCharacters = (characters) => ({
    type: GET_USER_CHARS,
    payload: characters
})

const getCharacter = (character) => ({
    type: GET_CHAR,
    payload: character
})

const createCharacter = (character) => ({
    type:CREATE_CHAR,
    payload: character
})

const updateHP = (character) => ({
    type:UPDATE_HP,
    payload: character
})

const updateChar = (character) => ({
    type:UPDATE_CHAR,
    payload: character
})

const deleteChar = (id) => ({
    type:DELETE_CHAR,
    payload: id
})

export const getUserCharactersThunk = () => async (dispatch) => {
    const res = await fetch("/api/characters")
    const data = await res.json();
    if(!data.errors){
        dispatch(getUserCharacters(data))
    }
}

export const getCharThunk = (id) => async (dispatch) => {
    const res  = await fetch(`/api/characters/${id}`)
    const data = await res.json()
    if(!data.errors){
        dispatch(getCharacter(data))
    }
}

export const createCharacterThunk = ({ name, description, strength, dexterity, constitution, intelligence, wisdom, charisma, class_id, race_id, alignment }) => async (dispatch) => {
    const res = await fetch('/api/characters/new', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            description,
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma,
            class_id,
            race_id,
            alignment
        })
    })

    const data = await res.json()
    dispatch(createCharacter(data))
    return data.id
}

export const updateHPThunk = (id, hp) => async (dispatch) => {
    const res = await fetch(`/api/characters/${id}/hp`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            hp: hp
        })
    })
    const data = await res.json()

    dispatch(updateHP(data))
}

export const updateCharThunk = (id, { name, description, alignment}) => async (dispatch) => {
    const res = await fetch(`/api/characters/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            description,
            alignment
        })
    })

    const data = await res.json()
    dispatch(updateChar(data))
    return data.id
}

export const deleteCharThunk = (id) => async (dispatch) => {
    await fetch(`/api/characters/${id}`, {
        method: "DELETE"
    })

    dispatch(deleteChar(id))

}
 
export const updateCharCampaign = (id, campaign_id) => async (dispatch) => {
    const res = await fetch(`/api/characters/${id}/campaign`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            campaign_id
        })
    })
    const data = await res.json()
    dispatch(getCharacter(data))
}


function characterReducer(state = {}, action) {
    switch (action.type) {
        case GET_USER_CHARS:
            return {...state, ...action.payload}
        case GET_CHAR:
            return {...state, [action.payload.id]:action.payload}
        case CREATE_CHAR:
            return {...state, [action.payload.id]:action.payload}
        case UPDATE_HP:
            return {...state, [action.payload.id]:action.payload}
        case DELETE_CHAR:{
            const newState = {...state}
            delete newState[action.payload]
            return newState
        }
        default:
            return state
    }
}

export default characterReducer