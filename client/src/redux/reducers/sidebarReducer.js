import { GLOBALTYPES } from "../actions/globalTypes";

const sidebarReducer = (state = null, action)=>{
    switch (action.type) {
        case GLOBALTYPES.SIDEBAR:
            
            return action.payload;
    
        default:
            return state;
    }
}

export default sidebarReducer