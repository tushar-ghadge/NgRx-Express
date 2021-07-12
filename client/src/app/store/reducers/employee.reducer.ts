import { Employee } from "../models/employee.model";
import { EmployeeAction, EmployeeActionType } from "../actions/employee.action";

export interface EmployeeState{
    list: Employee[],
    loading: boolean,
    error: Error
}

const initialState: EmployeeState = {
    list: [],
    loading: false,
    error: undefined
}

export function employeeReducer(
    state: EmployeeState,
    action: EmployeeAction
){
    switch(action.type){
        case EmployeeActionType.LOAD_EMPLOYEES:
            return {...state, loading: true}

        case EmployeeActionType.LOAD_EMPLOYEES_SUCCESS:
            return {...state, list: action.payload, loading: false}

        case EmployeeActionType.LOAD_EMPLOYEES_FAILURE:
            return {...state, error: action.payload, loading: false}
            
        case EmployeeActionType.SEARCH_EMPLOYEES:
            return state.list.filter(function(el){return el.name.toLowerCase().startsWith(action.payload.toLowerCase())})    
        default:
            return state;
    }
}

// const initialState: Array<Employee> = [
//     {
//         id: 1,
//         name: 'Tushar Ghadge',
//         email: 'tushar@gmail.com'
//     },
//     {
//         id: 2,
//         name: 'Rohan Sawant',
//         email: 'rohan@gmail.com'
//     }
// ];

// export function employeeReducer(state: Array<Employee> = initialState, action: EmployeeAction){
//     switch(action.type){
//         case EmployeeActionType.LOAD_EMPLOYEES:
//             return [...state];
//         case EmployeeActionType.SEARCH_EMPLOYEES:
//             return state.filter(function(el){return el.name.toLowerCase().startsWith(action.payload.toLowerCase())})    
//         default:
//             return state;
//     }
// }