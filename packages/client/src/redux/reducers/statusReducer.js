import { GLOBALTYPES } from "../actions/globalTypes";

const statusReducer = (state = null, action)=>{
    switch (action.type) {
        case GLOBALTYPES.STATUS:
            
            return action.payload;
    
        default:
            return state;
    }
}

export default statusReducer;