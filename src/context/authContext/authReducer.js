import { LOGOUT, LOAD_USER_FAIL, LOAD_USER_SUCCESS } from "../constansts"

const authReducer = (state, action) => {
    switch (action.type) {

        case LOAD_USER_SUCCESS:
            return {
                user: action.payload?.user,
                token:action.payload?.token
            }
        case LOGOUT:
        case LOAD_USER_FAIL:
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            return {
                user: null,
                token:null,
            }
        default:
            return state;
    }

}

export default authReducer;