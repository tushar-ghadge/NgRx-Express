import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { Employee } from '../store/models/employee.model';
import { Observable, Subscription, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { LoadEmployeesAction, SearchEmployeeAction } from '../store/actions/employee.action';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})


export class EmployeeComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'email'];
  public dataSource: MatTableDataSource<Employee>;
  public noData: Employee[] = [<Employee>{}];
  private subscription: Subscription = new Subscription();
  public filterSubject = new Subject<string>();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  
  employees$: Observable<Array<Employee>>
  loading$: Observable<Boolean>
  error$: Observable<Error>

  searchEmployee: string = ""
  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    // this.employees$ = this.store.select(store => store.emp.list)
    // this.loading$ = this.store.select(store => store.emp.loading)
    // this.error$ = this.store.select(store => store.emp.error);
    // this.store.dispatch(new LoadEmployeesAction());
    this.store.select(store => store.emp.list).subscribe(employees => this.initializeData(employees));
    //setTimeout(()=> this.searchEmp(),2000)
    this.dataSource.filterPredicate = function(data: Employee, filter: string): boolean {
      return data.name.toLowerCase().startsWith(filter);
    };
    
  }

  loadEmps(){
    this.store.dispatch(new LoadEmployeesAction())
  }
  searchEmp(){
    //this.store.dispatch(new LoadEmployeesAction("Tu"))
    this.store.dispatch(new SearchEmployeeAction(this.searchEmployee))
  }

  private initializeData(employees: Employee[]): void {
    this.dataSource = new MatTableDataSource(employees);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
