import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = [
    'id', 
    'firstName', 
    'lastName', 
    'email',
    'dob' , 
    'gender', 
    'education', 
    'company', 
    'experience', 
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
     private _dialog: MatDialog, 
     private _empService: EmployeeService,
     private _coreService: CoreService
     ){

     }
  
  
  
  ngOnInit(): void { 
    this.getEmployeeList();
  }

  openAddEditForm (){
    const dialogRef = this._dialog.open(AddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getEmployeeList();
        }
      },
    })
  }
  
  getEmployeeList(){
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number): void {
    const confirmDelete = confirm('Da li ste sigurni da želite izbrisati zaposlenika?');
    if (confirmDelete) {
      this._empService.deleteEmployee(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('Uposlenik izbrisan!', 'done');
          this.getEmployeeList();
        },
        error: console.log,
      });
    }
  }

  openEditForm (employee: any){
    const dialogRef = this._dialog.open(AddEditComponent, {
      data: employee,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getEmployeeList();
        }
      },
    })
    
  }

}



