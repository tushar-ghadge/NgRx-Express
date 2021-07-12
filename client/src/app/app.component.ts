import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/models/app-state.model';
import { Observable } from 'rxjs';
import { Employee } from './store/models/employee.model';
import { LoadEmployeesAction, EmployeeAction, SearchEmployeeAction } from './store/actions/employee.action';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  employees$: Observable<Array<Employee>>
  loading$: Observable<Boolean>
  error$: Observable<Error>

  searchEmployee: string = ""
  constructor(private store: Store<AppState>,private titleService: Title){}


  ngOnInit(): void {
    this.titleService.setTitle("Employee app")
    // this.employees$ = this.store.select(store => store.emp.list)
    // this.loading$ = this.store.select(store => store.emp.loading)
    // this.error$ = this.store.select(store => store.emp.error);
    // this.store.dispatch(new LoadEmployeesAction());
    //setTimeout(()=> this.searchEmp(),2000)
  }

  loadEmps(){
    this.store.dispatch(new LoadEmployeesAction())
  }
  searchEmp(){
    //this.store.dispatch(new LoadEmployeesAction("Tu"))
    this.store.dispatch(new SearchEmployeeAction(this.searchEmployee))
  }
}
