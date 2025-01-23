import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Element, Section, SectionList } from '../../../../models/elements.model';
import { ToastrService } from 'ngx-toastr';
import { rule } from '../../../../models/rules.model';
import { log } from 'console';
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

  onFieldChange(field: any, value: any): void {
    console.log('Field changed:', field, 'New value:', value);
  
    // Perform additional logic if field or its rowItems have rules
    if (field.hasRule || field.rowItems[0].hasRule || field.rowItems[1].hasRule) {
      this.rules.conditions.forEach((condition) => {
        let value1: string | number | null = null;
        let value2: string | number | null = null;
        // Find value1 based on condition.selectedIf
        this.formData.forEach((element) => {
          // Extract first-level keys
          const keys = Object.keys(element);
        
          keys.forEach((key) => {
            // Check and extract value if key matches condition.selectedIf
            if (condition.selectedIf === key) {
              value1 = element[key]; // Dynamically access the value
              console.log(`Value1 extracted (First-Level):`, value1);
            }
        
            // Check if the value is an array or object to handle second-level keys
            const value = element[key];
            if (Array.isArray(value)) {
              value.forEach((nestedItem) => {
                const nestedKeys = Object.keys(nestedItem);
                nestedKeys.forEach((nestedKey) => {
                  if (condition.selectedIf === nestedKey) {
                    value1 = nestedItem[nestedKey]; // Dynamically access the nested value
                    console.log(`Value1 extracted (Second-Level):`, value1);
                  }
                });
              });
            } else if (value && typeof value === 'object') {
              const nestedKeys = Object.keys(value);
              nestedKeys.forEach((nestedKey) => {
                if (condition.selectedIf === nestedKey) {
                  value1 = value[nestedKey]; // Dynamically access the nested value
                  console.log(`Value1 extracted (Second-Level Object):`, value1);
                }
              });
            }
          });
        });
        
        
  
// Find value2 based on condition.selectedAnotherField
if (condition.selectedAnotherField) {
  this.formData.forEach((element) => {
    // Extract first-level keys
    const keys = Object.keys(element);

    keys.forEach((key) => {
      // Check if first-level key matches condition.selectedAnotherField
      if (condition.selectedAnotherField === key) {
        value2 = element[key]; // Dynamically access the value
        console.log(`Value2 extracted (First-Level):`, value2);
      }

      // Check if the value is an array and process second-level keys
      const value = element[key];
      if (Array.isArray(value)) {
        value.forEach((nestedItem) => {
          const nestedKeys = Object.keys(nestedItem);
          nestedKeys.forEach((nestedKey) => {
            if (condition.selectedAnotherField === nestedKey) {
              value2 = nestedItem[nestedKey]; // Dynamically access the nested value
              console.log(`Value2 extracted (Second-Level):`, value2);
            }
          });
        });
      } 
      // Check if the value is an object and process second-level keys
      else if (value && typeof value === 'object') {
        const nestedKeys = Object.keys(value);
        nestedKeys.forEach((nestedKey) => {
          if (condition.selectedAnotherField === nestedKey) {
            value2 = value[nestedKey]; // Dynamically access the nested value
            console.log(`Value2 extracted (Second-Level Object):`, value2);
          }
        });
      }
    });
  });
} else {
  // If condition.selectedAnotherField is not defined, use the default value
  value2 = condition.value;
  console.log("Value2 (default):", value2);
}

  
        // Apply actions based on rules
        this.rules.dos.forEach((item) => {
          this.sectionList.forEach((section: Section) => {
            section.elements?.forEach((element) => {
              if(element.rowItems != undefined){
                if (element.rowItems.length > 0) {
                  element.rowItems.forEach((rowItem : Element) => {  
                    if (item.selectedField === rowItem.id) {
                      console.log(rowItem);   
                      if (value1 != null && value2 != null) {
                        const isEqual = value1 === value2;
                        const isHidden = item.selectedDo === 'Hide' ? isEqual : !isEqual;
                        console.log(`Action: ${item.selectedDo}, Hidden: ${isHidden}`);
                        // Apply the condition based on the selectedState
                        if (condition.selectedState === "Is Equal To") {
                          console.log(rowItem.validation.hidden);
                          rowItem.validation.hidden = isHidden;
                          console.log(rowItem.validation.hidden);
                        }
                      }
                      console.log(rowItem);   
                    }
                    
                  });
                }
              }
              else{
                  if (item.selectedField === element.id) {
                    if (value1 != null && value2 != null) {
                      const isEqual = value1 === value2;
                      const isHidden = item.selectedDo === 'Hide' ? isEqual : !isEqual;
                      console.log(`Action: ${item.selectedDo}, Hidden: ${isHidden}`);
                      // Apply the condition based on the selectedState
                      if (condition.selectedState === "Is Equal To") {
                          element.validation.hidden = isHidden;
                        }
                    }
                  }
              }
            });
          });
        });
        
      });
    }
  }
  
  
}
