const INITIAL_STATE = {
    jenis: '',
    jam: -1,
    biaya: 0
}

var countReducer = (state = INITIAL_STATE, action) => {
    if (action.type === 'Bayar') {
        return { ...state, jenis: action.payload[0], jam: action.payload[1], biaya: action.payload[2] }
    } else {
        return state
    }
}

export default countReducer