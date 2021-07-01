const initialState = {
    roomId: "",
}

const Reducer = (state = initialState, action) => {

    if (action.type === "ROOM_ID") {
        state = {
            ...state, roomId: action.value
        }
    }
    return state;
}

export default Reducer;