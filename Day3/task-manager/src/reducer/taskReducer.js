export const initialState = {
    tasks: []
}

export function taskReducer(state, action) {
    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, { id: Date.now(), text: action.payload, done: false }]
            }
        case "TOGGLE_TASK":
            return {
                ...state,
                tasks: state.tasks.map((t) =>
                    t.id === action.payload ? { ...t, done: !t.done } : t
                )
            }
        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((t) => t.id !== action.payload)
            };
        default:
            return state
    }
}