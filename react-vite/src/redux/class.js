const GET_CLASSES = 'classes/getAll'

const getClasses = (classes) => ({
    type:GET_CLASSES,
    payload: classes
})

export const getClassesThunk = () => async (dispatch) => {
    const res = await fetch('/api/classes')
    const data = await res.json()
    dispatch(getClasses(data))
}

function classReducer(state = {}, action) {
    switch (action.type) {
        case GET_CLASSES:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default classReducer