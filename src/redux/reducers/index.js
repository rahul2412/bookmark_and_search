const initialState = {
    characters: []
}

export default function rootReducer(state = initialState, action ) {
    
    switch (action.type) {
        
        case 'GET_ALL_CHARACTERS':
            return { ...state, characters: action.payload };

        default:
            return state
    }
}
