export const initialState = {
    images:[],
    page:1,
    loading:false,
    error:null,
};

export function imageReducer(state,action){
    switch(action.type){
        case "FETCH_START":
            return{...state,loading:true,error:null};
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading:false,
                images:[...state.images,...action.payload],
            };
        case "RESET":
            return{...state,images:[],page:1,error:null};
        case "INCREMENT_PAGE":
            return {...state,page:state.page+1};
        default:
            return state;
    }
}