const GET_USER_CAMPAIGNS = 'campaigns/getUserCampaigns'
const GET_CAMPAIGN = 'campaign/getCampaign'
const CREATE_CAMPAIGN = 'campaign/new'
const DELETE_CAMPAIGN = 'campaing/delete'

const getUserCampaigns = (campaign) => ({
    type:GET_USER_CAMPAIGNS,
    payload: campaign
})

const getCampaign = (campaign) => ({
    type:GET_CAMPAIGN,
    payload: campaign
})

const createCampaign = (campaign) => ({
    type:CREATE_CAMPAIGN,
    payload: campaign
})

const deleteCampaign = (id) => ({
    type:DELETE_CAMPAIGN,
    payload: id
})

export const getUserCampaignsThunk = () => async (dispatch) => {
    const res = await fetch(`/api/campaigns`)
    const data = await res.json()
    dispatch(getUserCampaigns(data))
}

export const getCampaignThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/campaigns/${id}`)
    const data = await res.json()
    dispatch(getCampaign(data))
}

export const createCampaignThunk = ({ name, description }) => async (dispatch) => {
    const res = await fetch('/api/campaigns/new', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            description
        })
    })
    const data = await res.json()
    dispatch(createCampaign(data))
    return data.id
}

export const deleteCampaignThunk = (id) => async (dispatch) => {
    await fetch(`/api/campaigns/${id}`, {
        method: "DELETE"
    })

    dispatch(deleteCampaign(id))
}

export const userSearchThunk = (username) => async () => {
    const res = await fetch(`/api/users/${username}`)
    const data = await res.json()
    return data
}

function campaignReducer(state = {}, action){
    switch(action.type){
        case GET_USER_CAMPAIGNS:
            return {...state, ...action.payload}
        case GET_CAMPAIGN:
            return {...state, [action.payload.id]:action.payload}
        case CREATE_CAMPAIGN:
            return {...state, [action.payload.id]:action.payload}
        case DELETE_CAMPAIGN:{
            const newState = {...state}
            delete newState[action.payload]
            return newState
        }
        default:
            return state
    }
}

export default campaignReducer