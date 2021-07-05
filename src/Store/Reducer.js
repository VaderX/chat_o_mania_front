const initialState = {
    roomId: sessionStorage.getItem("roomId"),
    currentUser: sessionStorage.getItem("userName"),
    admin: sessionStorage.getItem("admin")
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
            ...state, roomId: null
        }
    }
    else if (action.type === "ADMIN") {
        sessionStorage.setItem("admin", action.value)
        state = {
            ...state, admin: action.value
        }
    }
    else if (action.type === "DEL_ADMIN") {
        sessionStorage.removeItem("admin")
        state = {
            ...state, currentUser: null
        }
    }
    else if (action.type === "USER") {
        sessionStorage.setItem("userName", action.value)
        state = {
            ...state, currentUser: action.value
        }
    }
    // console.log("this is romid", state.admin)
    return state;
}

export default Reducer;