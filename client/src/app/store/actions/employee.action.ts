import { Action } from '@ngrx/store';
import { Employee } from './../models/employee.model';

export enum EmployeeActionType{
    LOAD_EMPLOYEES = '[EMPLOYEES] Load Employees',
    LOAD_EMPLOYEES_SUCCESS = '[EMPLOYEES] Load Employees Success',
    LOAD_EMPLOYEES_FAILURE = '[EMPLOYEES] Load Employees Failure',
    SEARCH_EMPLOYEES = '[EMPLOYEES] Search Employees'
}
export class LoadEmployeesAction implements Action{
    readonly type = EmployeeActionType.LOAD_EMPLOYEES;
}

export class LoadEmployeesSuccessAction implements Action{
    readonly type = EmployeeActionType.LOAD_EMPLOYEES_SUCCESS;

    constructor(public payload: Array<Employee>){}
}

export class LoadEmployeesFailureAction implements Action{
    readonly type = EmployeeActionType.LOAD_EMPLOYEES_FAILURE;

    constructor(public payload: Error){}
}

export class SearchEmployeeAction implements Action{
    readonly type = EmployeeActionType.SEARCH_EMPLOYEES;
    constructor(public payload: String){}
}

export type EmployeeAction = LoadEmployeesAction | SearchEmployeeAction | LoadEmployeesSuccessAction | LoadEmployeesFailureAction;
