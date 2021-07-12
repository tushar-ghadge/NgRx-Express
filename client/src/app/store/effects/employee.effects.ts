import { Injectable } from '@angular/core'
import { Actions, Effect, ofType} from '@ngrx/effects'
import { LoadEmployeesAction, EmployeeActionType, LoadEmployeesSuccessAction, LoadEmployeesFailureAction } from '../actions/employee.action'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { EmployeeService } from 'src/app/employee.service'
import { of } from 'rxjs'

@Injectable()
export class EmployeeEffects{
    @Effect() loadEmployees$ = this.actions$.pipe(ofType<LoadEmployeesAction>(EmployeeActionType.LOAD_EMPLOYEES),
    mergeMap(
        ()=> this.empService.getEmployeeList()
        .pipe(
            map(data => new LoadEmployeesSuccessAction(data)),
            catchError(error => of(new LoadEmployeesFailureAction(error)))
        )
    ))

    constructor(private actions$: Actions, private empService: EmployeeService){}
}