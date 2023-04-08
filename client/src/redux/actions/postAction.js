import { GLOBALTYPES } from "./globalTypes";

export const createPost = (data) => async (dispatch) => {
    try {

    } catch (error) {
        console.log(error.response);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const editPost = (data) => async (dispatch) =>{
    try{

    }catch(error){
        console.log(error.response);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const likePost =(data)=>async (dispatch)=>{
    try{

    }catch(error){
        console.log(error.response);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}