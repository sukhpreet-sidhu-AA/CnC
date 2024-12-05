const GET_RACES = 'races/getAll'

const getRaces = (races) => ({
    type: GET_RACES,
    payload: races
})

export const getRacesThunk = () => async (dispatch) => {
    const res = await fetch("/api/races")
    const data = await res.json();
    dispatch(getRaces(data))
}

function raceReducer(state = {}, action){
    switch(action.type) {
        case GET_RACES:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default raceReducer