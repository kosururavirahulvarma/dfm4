import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SectionList } from '../../../../models/elements.model';
import { ToastrService } from 'ngx-toastr';
import { rule } from '../../../../models/rules.model';
@Component({
  selector: 'app-assignforms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assignforms.component.html',
  styleUrls: ['./assignforms.component.css'],
})
export class AssignformsComponent implements OnInit {

  constructor(private toastr: ToastrService) {
  }

  viewMode: boolean = true;
  rules: rule = localStorage.getItem('rules')
    ? JSON.parse(localStorage.getItem('rules') as string)
    : { conditions: [], dos: [], option: '' };
  openForm:boolean = false;
  sectionList: any[] = localStorage.getItem('selectionList')
  ? JSON.parse(localStorage.getItem('selectionList') as string)
  : [
      {
        label: 'Drag Here or Click from the Sidenav to add Elements',
        value: `<div style="display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;"><label for="dropdown" style=" margin-bottom: 5px; font-size: 14px;">Drop elements here or click from the Sidenav to add!</label></div>`,
      },
    ];
  formFields: any[] = [];
  formData: any[] = localStorage.getItem('formData')
  ? JSON.parse(localStorage.getItem('formData') as string)
  :  []; 
  ngOnInit(): void {
    this.formFields = this.sectionList[1]?.elements || [];
    this.initializeFormData();
  }
  selectedOption: string = ''; // Stores the selected option ('Yes' or 'No')

  selectOption(option: string): void {
    this.selectedOption = option;
  }
initializeFormData() {
  if (this.formData.length === 0) {
    this.formFields.forEach((field) => {
      const fieldObj: any = {};

      if (field.rowItems) {
        // Add a key mapping to an array of objects
        fieldObj[field.id] = field.rowItems.map((item: any) => {
          return { [item.id]: '' }; // Create an object for each rowItem
        });
      } else {
        // Add a key mapping to a single string value
        fieldObj[field.id] = '';
      }

      // Push the structured fieldObj into the formData array
      this.formData.push(fieldObj);
    });

    console.log(this.formData);
  }
  }

  trackByIndex(index: number, item: any): number {
    return index; // Use the index to uniquely identify each item
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Data:', this.formData);
      localStorage.setItem('formData', JSON.stringify(this.formData));// Store formData in localStorage
      alert('IACUC Form submitted successfully! Thank you.');
    } else {
      console.error('Form is invalid!');
    }
  }

  editForm(){
    this.viewMode = false;
    this.openForm = true;
  }

  viewForm(){
    this.viewMode = true;
    this.openForm = true;
  }
  
}
