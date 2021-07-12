import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSnackBar} from '@angular/material';
import { Employee } from '../store/models/employee.model';
import { Observable, Subscription, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { LoadEmployeesAction, SearchEmployeeAction } from '../store/actions/employee.action';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

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
  regExpr:any;
  constructor(private store: Store<AppState>, private snackBar: MatSnackBar, private router : Router, private auth: AuthService){}

  ngOnInit(): void {
    this.employees$ = this.store.select(store => store.emp.list)
    this.loading$ = this.store.select(store => store.emp.loading)
    this.error$ = this.store.select(store => store.emp.error);
    this.store.dispatch(new LoadEmployeesAction());
    this.store.select(store => store.emp.list).subscribe(employees => this.initializeData(employees));
    
    // this.dataSource.filterPredicate = function(data: Employee, filter: string): boolean {
    //   return data.name.toLowerCase().startsWith(filter);
    // };
    
  }

  loadEmps(){
    this.store.dispatch(new LoadEmployeesAction())
  }
  // searchEmp(){
  //   this.store.dispatch(new SearchEmployeeAction(this.searchEmployee))
  // }

  private initializeData(employees: Employee[]): void {
    this.dataSource = new MatTableDataSource(employees);
    this.dataSource.filterPredicate =this.regExprFilter()
    this.dataSource.paginator = this.paginator;

  }

  applyFilter(filterValue: string) {
    this.regExpr = new RegExp("^"+filterValue.toLowerCase());
    this.dataSource.filter = filterValue;
  }
  regExprFilter()
  { 
    return (data: any, filter: string) => {
        try {
          return this.regExpr.test(data.name.toLowerCase())
        } catch (e) {
          return false
        }
      }
  }
  // logout(){
  //   sessionStorage.clear();
  //   this.router.navigate(["/"]);
  // }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
