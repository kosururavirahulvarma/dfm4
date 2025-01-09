import { Component, inject, ViewChild, OnDestroy } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../layouts/navbar/navbar.component";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { FleidsComponent } from '../../elements/fleids/fleids.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Element } from '../../../models/elements.model';

@Component({
  selector: 'app-build',
  standalone: true,
  imports: [
    FormsModule,
    MatTooltipModule,
    FleidsComponent,
    CdkDropListGroup,
    MatButtonToggleModule,
    MatIconModule,
    CdkDropList,
    CdkDrag,
    CommonModule,
    NavbarComponent,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './build.component.html',
  styleUrl: './build.component.css',
})
export class BuildComponent implements OnDestroy {
  events: string[] = [];
  opened: boolean = false;
  onSidenavToggle(): void {
    this.opened = !this.opened;
  }
  selectedOption: string = ''; // Stores the selected option ('Yes' or 'No')

  selectOption(option: string): void {
    this.selectedOption = option;
  }
  selectionId: any;
  mobileQuery: MediaQueryList;
  elementsMain: any = {
    elements: [
      {
        index: 0,
        type: 'input',
        label: 'Name',
        name: 'name',
        placeholder: 'please fill this field',
        hasRule: false,
        validation: {
          required: true,
          minLength: 3,
          maxLength: 10,
        },
      },
      {
        index: 1,
        type: 'textbox',
        label: 'Text Box',
        placeholder: 'please fill this field',
        name: 'textBox',
        hasRule: false,
        styles: {
          inputStyle:
            'width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;',
          labelStyle: 'margin-bottom: 5px; font-size: 14px;',
          divStyle:
            'display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;',
        },
        validation: {
          required: true,
          minLength: 3,
          maxLength: 10,
        },
      },
      {
        index: 3,
        type: 'radio',
        label: 'Radio Button',
        name: 'radioChoice',
        hasRule: false,
        options: [
          { value: 'yes', label: 'Yes', style: 'margin-right: 8px;' },
          { value: 'no', label: 'No', style: 'margin-right: 8px;' },
        ],
        styles: {
          inputStyle:
            'width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;',
          labelStyle: 'margin-bottom: 5px; font-size: 14px;',
          divStyle:
            'display: flex; margin-bottom: 8px; font-size: 14px; color: #333; width: 100%;justify-content: space-between; ',
          innerDivStyle:
            'display: flex; margin-top: 10px;width: 100%; justify-content: space-between;',
          innerLabelStyle: 'margin-bottom: 5px;',
        },
        validation: {
          required: true,
          minLength: 3,
          maxLength: 10,
        },
      },
      {
        index: 4,
        type: 'checkbox',
        label: 'Check Box',
        name: 'checkboxOptions',
        hasRule: false,
        options: [
          { value: 'option1', label: 'Option 1', style: 'margin-right: 8px;' },
          { value: 'option2', label: 'Option 2', style: 'margin-right: 8px;' },
        ],
        styles: {
          inputStyle:
            'width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; ',
          labelStyle: 'margin-bottom: 5px; font-size: 14px;',
          divStyle:
            'display: flex; margin-bottom: 8px; font-size: 14px; color: #333; width: 100%;justify-content: space-between; ',
          innerDivStyle:
            'display: flex; margin-top: 10px;width: 100%; justify-content: space-between;',
          innerLabelStyle: 'margin-bottom: 5px; font-size: 14px; color: #555;',
        },
        validation: {
          required: true,
          minLength: 3,
          maxLength: 10,
        },
      },
      {
        index: 5,
        type: 'email',
        label: 'Email',
        placeholder: 'please fill this field',
        name: 'email',
        hasRule: false,
        styles: {
          inputStyle:
            'width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;',
          labelStyle: 'margin-bottom: 5px; font-size: 14px;',
          divStyle:
            'display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;',
        },
        validation: {
          required: true,
          minLength: 3,
          maxLength: 10,
        },
      },
      {
        index: 6,
        type: 'phone',
        label: 'Phone Number',
        placeholder: 'please fill this field',
        name: 'phoneNumber',
        hasRule: false,
        styles: {
          inputStyle:
            'width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;',
          labelStyle: 'margin-bottom: 5px; font-size: 14px;',
          divStyle:
            'display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;',
        },
        validation: {
          required: true,
          minLength: 3,
          maxLength: 10,
        },
      },
      {
        index: 7,
        type: 'dropdown',
        label: 'Dropdown',
        name: 'dropdown',
        hasRule: false,
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ],
        styles: {
          selectStyle:
            'width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;',
          labelStyle: 'margin-bottom: 5px; font-size: 14px;',
          divStyle:
            'display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;',
        },
        validation: {
          required: true,
          minLength: 3,
          maxLength: 10,
        },
      },
      {
        index: 8,
        type: 'Name&Title',
        label: 'Name & Title',
        name: 'Name&Title',
        rowItems: [
          {
            index: 0,
            type: 'text',
            label: 'Name',
            name: 'name',
            placeholder: 'please fill this field',
            hasRule: false,
            validation: {
              required: true,
              minLength: 3,
              maxLength: 10,
            },
          },
          {
            index: 1,
            type: 'text',
            label: 'Title',
            name: 'title',
            placeholder: 'please fill this field',
            hasRule: false,
            validation: {
              required: true,
              minLength: 3,
              maxLength: 10,
            },
          },
        ],
      },
      {
        index: 9,
        type: 'Email&OfficePhone',
        label: 'Email & Office Phone',
        name: 'Email&OfficePhone',
        rowItems: [
          {
            index: 0,
            type: 'email',
            label: 'Email',
            name: 'email',
            placeholder: '',
            hasRule: false,
            validation: {
              required: true,
              minLength: 3,
              maxLength: 10,
            },
          },
          {
            index: 1,
            type: 'tel',
            label: 'Office Phone',
            name: 'officephone',
            placeholder: '',
            hasRule: false,
            validation: {
              required: true,
              minLength: 3,
              maxLength: 10,
            },
          },
        ],
      },
      {
        index: 10,
        type: 'Lab Phone&Cell Phone',
        label: 'LabPhone & CellPhone',
        name: 'Lab Phone&Cell Phone',
        rowItems: [
          {
            index: 0,
            type: 'tel',
            label: 'Lab Phone',
            name: 'labphone',
            placeholder: '',
            hasRule: false,
            validation: {
              required: true,
              minLength: 3,
              maxLength: 10,
            },
          },
          {
            index: 1,
            type: 'tel',
            label: 'Cell Phone',
            name: 'cellphone',
            placeholder: '',
            hasRule: false,
            validation: {
              required: true,
              minLength: 3,
              maxLength: 10,
            },
          },
        ],
      },
      {
        index: 11,
        type: 'Department&EmergencyPhone',
        label: 'Department & EmergencyPhone',
        departmentlabel: 'Department',
        emergencyphonelable: 'Emergency Phone',
        name: 'Department&EmergencyPhone',
        rowItems: [
          {
            index: 0,
            type: 'dropdown',
            label: 'Department',
            name: 'department',
            hasRule: false,
            options: [
              { value: 'Admisions Office', label: 'Admisions Office' },
              { value: 'option2', label: 'Option 2' },
              { value: 'option3', label: 'Option 3' },
            ],
            validation: {
              required: true,
              minLength: 3,
              maxLength: 10,
            },
          },
          {
            index: 1,
            type: 'tel',
            label: 'Emergency Phone',
            name: 'emergencyphone',
            placeholder: '',
            hasRule: false,
            validation: {
              required: true,
              minLength: 3,
              maxLength: 10,
            },
          },
        ],
      },
      {
        index: 12,
        type: 'Degree&PersonalType',
        label: 'Degree & PersonalType',
        name: 'Degree&PersonalType',
        rowItems: [
          {
            index: 0,
            type: 'text',
            label: 'Degree',
            name: 'degree',
            placeholder: '',
            hasRule: false,
            validation: {
              required: true,
              minLength: 3,
              maxLength: 10,
            },
          },
          {
            index: 1,
            type: 'text',
            label: 'Personal Type',
            name: 'personaltype',
            placeholder: '',
            hasRule: false,
            validation: {
              required: true,
              minLength: 3,
              maxLength: 10,
            },
          },
        ],
      },
      {
        index: 13,
        type: 'YesOrNoButton',
        label: 'Yes Or No Button',
        name: 'YesOrNoButton',
      },
    ],
  };

  selectedSection: string = '';
  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    // Subscribe to the query parameter changes
    this.route.queryParamMap.subscribe((params) => {
      this.selectedSection = params.get('selectedSection') || '';
      this.selectionId = params.get('selectionId') || '';
      console.log('Received section:', this.selectedSection);
    });

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  mainContentItems: any[] = localStorage.getItem('mainContentItems')
    ? JSON.parse(localStorage.getItem('mainContentItems') as string)
    : [
        {
          label: 'Drag Here or Click from the Sidenav to add Elements',
          value: `<div style="display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;"><label for="dropdown" style=" margin-bottom: 5px; font-size: 14px;">Drop elements here or click from the Sidenav to add!</label></div>`,
        },
      ];

  sectionList: any[] = localStorage.getItem('selectionList')
    ? JSON.parse(localStorage.getItem('selectionList') as string)
    : [
        {
          label: 'Drag Here or Click from the Sidenav to add Elements',
          value: `<div style="display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;"><label for="dropdown" style=" margin-bottom: 5px; font-size: 14px;">Drop elements here or click from the Sidenav to add!</label></div>`,
        },
      ];

  // Drop event handler to move a single item to the main content area
  drop(event: CdkDragDrop<any[]>) {
    console.log('event');
    console.log(event);
    if (event.previousContainer !== event.container) {
      // Get the dragged item from the previous container
      const draggedItem = event.previousContainer.data[event.previousIndex];

      // Insert the dragged item at the dragged index in the main content items array
      const draggedIndex = event.currentIndex;

      const indexNumber: number = this.getIndexOfSelection(this.sectionList);
      console.log('indexNumber');
      console.log(indexNumber);
      draggedItem.id =
        'element' +
        Math.random()
          .toString(36)
          .substring(2, 2 + 10);
          if(draggedItem.rowItems != undefined && draggedItem.rowItems != null && draggedItem.rowItems.length > 0){
            draggedItem.rowItems.forEach((element: Element) => {
              element.id = 'item' +
        Math.random()
          .toString(36)
          .substring(2, 2 + 10);
            });
          }
      this.sectionList[indexNumber].elements.splice(draggedIndex, 0, {
        ...draggedItem,
      }); // Insert the item at the dragged index
      // Optionally, remove the default first item if it is a placeholder
      const index = this.mainContentItems.findIndex(
        (item) =>
          item.label === 'Drag Here or Click from the Sidenav to add Elements'
      );
      if (index !== -1) {
        this.mainContentItems.splice(index, 1); // Removes the item if found
      }
    } else {
      // If it's the same container, reorder items
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    localStorage.setItem('selectionList', JSON.stringify(this.sectionList));
  }
  dropRowItems(event: CdkDragDrop<any[]>) {
    console.log('log');
  }
  onItemClick(navItem: any) {
    if (this.mainContentItems && this.mainContentItems.length > 0) {
      // Remove the placeholder if it exists
      if (
        this.mainContentItems[0].label ===
        'Drag Here or Click from the Sidenav to add Elements'
      ) {
        this.mainContentItems.splice(0, 1); // Removes the first item in the array
      }

      // Check if the item already exists in the array
      // const itemExists = this.mainContentItems.some(item => item.label === navItem.label);
      // if (!itemExists) {
      // Add the clicked item to mainContentItems if it doesn't already exist

      const indexNumber: number = this.getIndexOfSelection(this.sectionList);
      console.log(indexNumber);
      if (indexNumber >= 0) {
        console.log(indexNumber);
        navItem.id =
          'element' +
          Math.random()
            .toString(36)
            .substring(2, 2 + 10);
            if(navItem.rowItems != undefined && navItem.rowItems != null && navItem.rowItems.length > 0){
              navItem.rowItems.forEach((element: Element) => {
                element.id = 'item' +
          Math.random()
            .toString(36)
            .substring(2, 2 + 10);
              });
            }
        console.log(this.sectionList);
        // Ensure that the selected section has an 'elements' array
        this.sectionList[indexNumber].elements.push({ ...navItem });
        console.log(this.sectionList);
      }
      this.mainContentItems.push({ ...navItem });

      // }
      // } else {
      //   console.log('mainContentItems is empty or not defined');
    }
    localStorage.setItem('selectionList', JSON.stringify(this.sectionList));
  }

  getIndexOfSelection(list: any): number {
    return list.findIndex(
      (item: any) => item.selectionName === this.selectedSection
    );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onEdit(item: any) {
    console.log('Edit clicked for item:', item);
    // Implement edit logic
  }

  onDelete(elementId: any, selectionId: any) {
    console.log('Delete clicked for item:', elementId);
    console.log('Delete clicked for item:', selectionId);
    console.log(this.sectionList);
    this.sectionList.forEach((element) => {
      console.log(element);
      if (element.sectionId === selectionId) {
        element.elements = element.elements.filter(
          (item: any) => item.id !== elementId
        );
      }
    });

    // Remove the item from the array
    // this.mainContentItems = this.mainContentItems.filter(i => i !== item);
    if (this.mainContentItems.length < 1) {
      this.mainContentItems.push({
        label: 'Drag Here or Click from the Sidenav to add Elements',
        value: `<div style="display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;"><label for="dropdown" style=" margin-bottom: 5px; font-size: 14px;">Drop elements here or click from the Sidenav to add!</label></div>`,
      });
    }
    localStorage.setItem('selectionList', JSON.stringify(this.sectionList));
  }

  onDuplicate(element: any, elementId: any, selectionId: any) {
    console.log('Duplicate clicked for item:', element);
    console.log('Duplicate clicked for item ID:', elementId);
    console.log('Duplicate clicked for selection ID:', selectionId);

    // Iterate over the sectionList to find the matching section
    this.sectionList.forEach((section: any) => {
      if (section.sectionId === selectionId) {
        // Find the element to duplicate
        const elementToDuplicate = section.elements.find(
          (el: any) => el.id === elementId
        );

        if (elementToDuplicate) {
          // Create a deep copy of the element and assign a new unique ID
          const duplicatedElement = {
            ...elementToDuplicate,
            id: 'element' + Math.random().toString(36).substring(2, 12), // Generate a unique ID
          };

          // Add the duplicated element to the elements array
          section.elements.push(duplicatedElement);
        }
      }
    });

    // Update localStorage with the modified sectionList
    localStorage.setItem('selectionList', JSON.stringify(this.sectionList));

    console.log('Updated sectionList after duplication:', this.sectionList);
  }

  // Sanitizes the HTML to be rendered safely
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  rightSideNavOpened: boolean = false;

  selectedItem: any = [{
    index: 0,
    type: '',
    label: '',
    name: '',
    hasRule: false,
    styles: {
      labelStyle: '',
      divStyle: '',
      inputStyle: '',
    },
    validation: {
      required: false,
      minLength: 0,
      maxLength: 0,
    },
    options: [],
    innerLabelStyle: '',
    innerDivStyle: '',
    rowItems: [],
  }];

  // Method to handle right-side navigation toggle and selection
  onRightSidenavToggle(elementId: any, selectionId: any) {
    console.log('Delete clicked for item:', elementId);
    console.log('Delete clicked for item:', selectionId);
    console.log(this.sectionList);
    this.rightSideNavOpened = !this.rightSideNavOpened;

    // Find the selected element based on the section and element IDs
    this.sectionList.forEach((element) => {
      console.log(element);
      if (element.sectionId === selectionId) {
        this.selectedItem = element.elements.find(
          (el: any) => el.id === elementId
        );
        if(this.selectedItem.rowItems != undefined && this.selectedItem.rowItems != null && this.selectedItem.rowItems.length > 0){
          this.selectedItem = this.selectedItem.rowItems;
        }else{
          this.selectedItem= [this.selectedItem];
        }
        console.log('this.selectedItem')
        console.log(typeof this.selectedItem)
        console.log( this.selectedItem.length)
        console.log(Array.isArray(this.selectedItem));      }
    });
  }

  // Navigate to add another section
  addAnotherSection() {
    this.router.navigate(['/home/section']);
  }
  saveMessageVisible = false; // Controls the visibility of the save message
  // Save the properties of the selected item
  saveProperties(): void {
    console.log('Form data to be saved:', this.selectedItem);
    console.log(this.selectionId);
    
    // Iterate over the sectionList to find the matching section
    this.sectionList.forEach((section: any) => {
      if (section.sectionId === this.selectionId) {
        // Find the index of the element to update
        const elementIndex = section.elements.findIndex(
          (el: any) => el.id === this.selectedItem.id
        );

        if (elementIndex !== -1) {
          // Replace the element at the found index with the selected item
          section.elements[elementIndex] = { ...this.selectedItem };
        }
      }
    });

    // Update localStorage with the modified sectionList
    localStorage.setItem('selectionList', JSON.stringify(this.sectionList));
    this.saveMessageVisible = true;
    // Automatically hide the message after 3 seconds
    setTimeout(() => {
      this.saveMessageVisible = false;
    }, 2000);
    console.log('Updated sectionList after modification:', this.sectionList);
  }

  cancel(): void {
    // Handle cancel action (e.g., close the sidenav or reset the form)
    this.rightSideNavOpened = false;
  }
}

