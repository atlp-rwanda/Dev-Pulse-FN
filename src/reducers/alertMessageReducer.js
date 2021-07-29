
import * as actionType from '../actions/actionType'


export function alertMessageReducer(state = {}, action) {
    switch (action.type) {
        case actionType.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message
            };
        case actionType.ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            };
        case actionType.CLEAR:
            return {};
        default:
            return state
    }
}