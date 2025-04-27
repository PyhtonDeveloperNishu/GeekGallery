export const initialState = {
    images:[],
    page:1,
    loading:false,
    error:null,
};

export function imageReducer(state,action){
    switch(action.type){
        case "FETCH_START":
            return{...state}
    }
}