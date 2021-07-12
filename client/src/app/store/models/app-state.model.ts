// import { Employee } from "./employee.model";
import { EmployeeState } from "../reducers/employee.reducer";

export interface AppState{
    //readonly emp: Array<Employee>
    readonly emp: EmployeeState
}