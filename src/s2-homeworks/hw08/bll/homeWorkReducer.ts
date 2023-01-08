import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: 18 }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort': {

            if (action.payload === 'up')// by name
            {
                let copyState = [...state]
                copyState.sort((a, b) => a.name < b.name ? -1 : 1)
                return copyState
            } else if (action.payload === 'down') {
                let copyState = [...state]
                copyState.sort((a, b) => a.name < b.name ? 1 : -1)
                return copyState
            }
            return state // need to fix
        }
        case 'check': {
            return state.filter(el => el.age >= action.payload) // need to fix
        }
        default:
            return state
    }
}
