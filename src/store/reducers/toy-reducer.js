const initialState = {
    toys: [],
    filterBy: {
        name: '',
        inStock: 'all',
        labels: []
    },
    sortBy: 'createdAt',
    user: null
}

export function toyReducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case 'CLEAN_FILTER':
            newState = { ...state, filterBy: initialState.filterBy }
            break;
        case 'SET_TOYS':
            newState = { ...state, toys: action.toys }
            break;
        case 'SET_SORT':
            const { sortBy } = action;
            let sortedToys;
            if (sortBy === 'name') {
                sortedToys = state.toys.sort((t1, t2) => t1.name.localeCompare(t2.name))
            } else if (sortBy === 'price') {
                sortedToys = state.toys.sort((t1, t2) => t1[sortBy] - t2[sortBy])
            } else if (sortBy === 'createdAt') {
                sortedToys = state.toys.sort((t1, t2) => t2[sortBy] - t1[sortBy])
            }
            newState = { ...state, toys: sortedToys, sortBy }
            break;
        case 'SET_FILTER':
            newState = { ...state, filterBy: action.filterBy, toys: action.toys }
            break;
        default:
            newState = state;
    }
    return newState;
}