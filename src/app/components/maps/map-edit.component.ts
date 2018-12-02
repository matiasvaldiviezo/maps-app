import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-map-edit',
  templateUrl: './map-edit.component.html',
  styleUrls: ['./map-edit.component.css']
})
export class MapEditComponent {

  form:FormGroup;

  constructor(public fb: FormBuilder, public dialogRef:MatDialogRef<MapEditComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {
    console.log(data);
    this.form=fb.group({
      'title':data.title,
      'desc':data.desc
    });
   }
  
   saveChanges(){
    this.dialogRef.close(this.form.value);
   }

   onNoClick(){
     this.dialogRef.close();
   }

}