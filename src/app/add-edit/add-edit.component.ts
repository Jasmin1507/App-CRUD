import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  empForm: FormGroup;

  education: string[] = [
    "Matric",
    "Diploma",
    "Intermediate",
    "Graduate",
    "Post Graduate",
  ];

  constructor(
    private _fb: FormBuilder, 
    private _empService: EmployeeService, 
    private _dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    ) {
    this.empForm = this._fb.group({
      firstName : "",
      lastName : "",
      email : "",
      dob : "",
      gender : "",
      education : "",
      company : "",
      experience : "",
    });

  }

  ngOnInit() {

    this.empForm.patchValue(this.data);
    
    this.empForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      dob: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      education: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      experience : new FormControl('', Validators.required), 
    });

    if(this.data) {
      this.empForm.patchValue(this.data);
    }
  }

  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Podaci zaposlenika uspješno ispravljeni!', 'done');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      } else{
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => { 
            this._coreService.openSnackBar('Uspješno ste dodali zaposlenika!', 'done');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      } 
    }
  }
}
