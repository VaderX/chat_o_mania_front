const initialState = {
    roomId: sessionStorage.getItem("roomId"),
    currentUser: sessionStorage.getItem("userName")
}

const Reducer = (state = initialState, action) => {

    if (action.type === "ROOM_ID") {
        sessionStorage.setItem("roomId", action.value)
        state = {
            ...state, roomId: action.value
        }
    }
    else if (action.type === "DEL_ROOM") {
        sessionStorage.removeItem("roomId");
        state = {
            ...state, roomId: undefined
        }
    }
    else if (action.type === "USER") {
        sessionStorage.setItem("userName", action.value)
        state = {
            ...state, currentUser: action.value
        }
    }
    else if (action.type === "DEL_USER") {
        sessionStorage.removeItem("userName");
        state = {
            ...state, currentUser: undefined
        }
    }
    // console.log("this is romid", state.roomId)
    return state;
}

export default Reducer;