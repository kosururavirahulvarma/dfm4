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
@Component({
  selector: 'app-build',
  standalone: true,
  imports: [MatTooltipModule,FleidsComponent,CdkDropListGroup,MatButtonToggleModule,MatIconModule, CdkDropList, CdkDrag, CommonModule, NavbarComponent,MatSidenavModule,MatListModule],
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
  fillerNav = [
    { label: 'Text Box',value: ` <div style="display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;">
            <label for="textBox" style=" margin-bottom: 5px; font-size: 14px;">Text Box:</label>
            <input type="text" id="textBox" name="textBox" style="width: 100%; padding: 8px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" />
        </div>`},
    { label: 'Input Box',value:`<div style="display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;">
            <label for="inputBox" style=" margin-bottom: 5px; font-size: 14px;">Label:</label>
            <input type="text" id="inputBox" name="inputBox" style="width: 100%; padding: 8px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" />
        </div>` },
    { label: 'Radio Button',value:`<div style="display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;">
            <label style=" margin-bottom: 5px; font-size: 14px;">Select an option:</label>
            <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <input type="radio" id="radioYes" name="radioChoice" value="yes" />
                <label for="radioYes" style="margin-left: 5px;">Yes</label>
            </div>
            <div style="display: flex; align-items: center;">
                <input type="radio" id="radioNo" name="radioChoice" value="no" />
                <label for="radioNo" style="margin-left: 5px;">No</label>
            </div>
        </div>` },
    { label: 'Check Box',value: ` <div style="display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;">
            <label style=" margin-bottom: 5px; font-size: 14px;">Select your preferences:</label>
            <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <input type="checkbox" id="checkboxOption1" name="checkboxOptions" value="option1" />
                <label for="checkboxOption1" style="margin-left: 5px;">Option 1</label>
            </div>
            <div style="display: flex; align-items: center;">
                <input type="checkbox" id="checkboxOption2" name="checkboxOptions" value="option2" />
                <label for="checkboxOption2" style="margin-left: 5px;">Option 2</label>
            </div>
        </div>`},
    { label: 'Email',value:` <div style="display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;">
            <label for="email" style=" margin-bottom: 5px; font-size: 14px;">Email:</label>
            <input type="email" id="email" name="email" style="width: 100%; padding: 8px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" />
        </div>`},
    { label: 'Phone Number',value:`<div style="display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;">
            <label for="phoneNumber" style=" margin-bottom: 5px; font-size: 14px;">Phone Number:</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" style="width: 100%; padding: 8px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" />
        </div>` },
    { label: 'Dropdown',value:`<div style="display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;">
            <label for="dropdown" style=" margin-bottom: 5px; font-size: 14px;">Dropdown:</label>
            <select id="dropdown" name="dropdown" style="width: 100%; padding: 8px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
        </div>` },
  ];

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
      // Now it's safe to access mainContentItems[0]
      if (
        this.mainContentItems[0].label ===
        'Drag Here or Click from the Sidenav to add Elements'
      ) {
        this.mainContentItems.splice(0, 1); // Removes the first item in the array
      }
      // Add the clicked item to mainContentItems
      this.mainContentItems.push({ ...navItem });
    } else {
      // Handle the case where mainContentItems is empty or undefined
      console.log('mainContentItems is empty or not defined');
      
    }
    localStorage.setItem("mainContentItems",JSON.stringify(this.mainContentItems));
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
}

