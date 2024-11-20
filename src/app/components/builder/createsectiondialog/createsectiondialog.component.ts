
import { Component, Inject, model } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {

  MatDialog,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-createsectiondialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './createsectiondialog.component.html',
  styleUrl: './createsectiondialog.component.css'
})
export class CreatesectiondialogComponent {
  sectionName: string = '';
  

  constructor(
    public dialogRef: MatDialogRef<CreatesectiondialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.sectionName);
  }
}
