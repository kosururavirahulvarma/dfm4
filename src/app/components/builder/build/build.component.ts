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
import { NavigationEnd, Router } from '@angular/router';
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
  imports: [FormsModule, MatTooltipModule,FleidsComponent,CdkDropListGroup,MatButtonToggleModule,MatIconModule, CdkDropList, CdkDrag, CommonModule, NavbarComponent,MatSidenavModule,MatListModule],
  templateUrl: './build.component.html',
  styleUrl: './build.component.css'
})
export class BuildComponent implements OnDestroy{
  events: string[] = [];
  opened: boolean = false;
  onSidenavToggle(): void {
    this.opened = !this.opened;
  }
  mobileQuery: MediaQueryList;
  elementsMain: any = {
    "elements": [
      {
        "index": 0,
        "type": "input",
        "label": "Name",
        "name": "name",
        "id": "name",
        "placeholder": "please fill this field",
        "styles": {
          "inputStyle": "color:red;",
          "labelStyle": "color:red;",
          "divStyle": ""
        },
        "validation": {
          "required": true,
          "minLength": 3,
          "maxLength": 10
        }
      },
      {
        "index": 1,
        "type": "textbox",
        "label": "Text Box",
        "placeholder": "please fill this field",
        "name": "textBox",
        "styles": {
          "inputStyle": "width: 100%; padding: 8px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;",
          "labelStyle": "margin-bottom: 5px; font-size: 14px;",
          "divStyle": "display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;"
        }
      },
      {
        "index": 3,
        "type": "radio",
        "label": "Radio Button",
        "name": "radioChoice",
        "options": [
          { "value": "yes", "label": "Yes" },
          { "value": "no", "label": "No" }
        ]
      },
      {
        "index": 4,
        "type": "checkbox",
        "label": "Check Box",
        "name": "checkboxOptions",
        "options": [
          { "value": "option1", "label": "Option 1" },
          { "value": "option2", "label": "Option 2" }
        ]
      },
      {
        "index": 5,
        "type": "email",
        "label": "Email",
        "placeholder": "please fill this field",
        "name": "email",
        "styles": {
          "inputStyle": "width: 100%; padding: 8px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;",
          "labelStyle": "margin-bottom: 5px; font-size: 14px;",
          "divStyle": "display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;"
        }
      },
      {
        "index": 6,
        "type": "phone",
        "label": "Phone Number",
        "placeholder": "please fill this field",
        "name": "phoneNumber",
        "styles": {
          "inputStyle": "width: 100%; padding: 8px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;",
          "labelStyle": "margin-bottom: 5px; font-size: 14px;",
          "divStyle": "display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;"
        }
      },
      {
        "index": 7,
        "type": "dropdown",
        "label": "Dropdown",
        "name": "dropdown",
        "options": [
          { "value": "option1", "label": "Option 1" },
          { "value": "option2", "label": "Option 2" },
          { "value": "option3", "label": "Option 3" }
        ],
        "styles": {
          "selectStyle": "width: 100%; padding: 8px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;",
          "labelStyle": "margin-bottom: 5px; font-size: 14px;",
          "divStyle": "display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;"
        }
      }
    ]
  }
  


  private _mobileQueryListener: () => void;

  constructor(private router: Router,private sanitizer: DomSanitizer) {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  mainContentItems: any[] = localStorage.getItem("mainContentItems") 
  ? JSON.parse(localStorage.getItem("mainContentItems") as string)
  : [{ label: 'Drag Here or Click from the Sidenav to add Elements',value:`<div style="display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;"><label for="dropdown" style=" margin-bottom: 5px; font-size: 14px;">Drop elements here or click from the Sidenav to add!</label></div>`}];

  // Drop event handler to move a single item to the main content area
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer !== event.container) {
      // Get the dragged item from the previous container
      const draggedItem = event.previousContainer.data[event.previousIndex];
  
      // Insert the dragged item at the dragged index in the main content items array
      const draggedIndex = event.currentIndex;
      this.mainContentItems.splice(draggedIndex, 0, { ...draggedItem }); // Insert the item at the dragged index
  
      // Optionally, remove the default first item if it is a placeholder
      const index = this.mainContentItems.findIndex(item => item.label === 'Drag Here or Click from the Sidenav to add Elements');
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
    localStorage.setItem("mainContentItems",JSON.stringify(this.mainContentItems));
  }
  onItemClick(navItem: any) {
    if (this.mainContentItems && this.mainContentItems.length > 0) {
      // Remove the placeholder if it exists
      if (
        this.mainContentItems[0].label === 'Drag Here or Click from the Sidenav to add Elements'
      ) {
        this.mainContentItems.splice(0, 1); // Removes the first item in the array
      }
  
      // Check if the item already exists in the array
      // const itemExists = this.mainContentItems.some(item => item.label === navItem.label);
      // if (!itemExists) {
        // Add the clicked item to mainContentItems if it doesn't already exist
        this.mainContentItems.push({ ...navItem });
      // }
    // } else {
    //   console.log('mainContentItems is empty or not defined');
    }
    localStorage.setItem("mainContentItems", JSON.stringify(this.mainContentItems));
  }
  
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onEdit(item: any) {
    console.log('Edit clicked for item:', item);
    // Implement edit logic
  }

  onDelete(item: any) {
    console.log('Delete clicked for item:', item);
    // Remove the item from the array
    this.mainContentItems = this.mainContentItems.filter(i => i !== item);
    if(this.mainContentItems.length < 1)
    {
      this.mainContentItems.push({ label: 'Drag Here or Click from the Sidenav to add Elements',value:`<div style="display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;"><label for="dropdown" style=" margin-bottom: 5px; font-size: 14px;">Drop elements here or click from the Sidenav to add!</label></div>`});
    }
    localStorage.setItem("mainContentItems",JSON.stringify(this.mainContentItems));
  }
  
  onDuplicate(item: any) {
    console.log('Duplicate clicked for item:', item);
    // Duplicate the item and add it to the array
    const duplicatedItem = { ...item };
    this.mainContentItems.push(duplicatedItem);
    localStorage.setItem("mainContentItems",JSON.stringify(this.mainContentItems));
  }

   // Sanitizes the HTML to be rendered safely
   sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }


  rightSideNavOpened: boolean =false;


    selectedItem : Element = 
      {
        index: 0,
        type: '',
        label: '',
        name: '',
        styles: {
          labelStyle: '',
          divStyle: '',
          inputStyle: ''
        },
        validation: {
          required: false,
          minLength: 0,
          maxLength: 0
        },
        options: []
      }
    
  

  onRightSidenavToggle(item: any){
    console.log('Duplicate clicked for item:', item);
    this.selectedItem = item;
    this.rightSideNavOpened = !this.rightSideNavOpened;
  }
}

