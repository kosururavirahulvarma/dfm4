import { Component } from '@angular/core';
import { Section, SectionList } from '../../../models/elements.model';
import { CreatesectiondialogComponent } from '../createsectiondialog/createsectiondialog.component';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,CommonModule],
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.css'
})
export class SectionsComponent {

  constructor(private dialog: MatDialog, private router : Router){
    this.getAllSectionNames()
  }

  sections: string[] = [];

  sectionId:any ;

  sectionList: SectionList = {
    selectionList : []
  };

  addSection(): void {
    const dialogRef = this.dialog.open(CreatesectiondialogComponent, {
      width: '400px',
    
      data: {title :'Add New Section'}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sections.push(result);
        console.log('Section added:', result);
        // Create a new section object
        const newSection: Section = {
          elements: [], // Initialize with an empty array of elements
          selectionName: result,
          sectionId: "section"+Math.random().toString(36).substring(2, 2 + 10),
        };

        this.sectionId = newSection.sectionId;
        // Push the new section to the `selectionList`
        // this.sectionList.selectionList.push(newSection);
      
    

        this.allSections.push({...newSection})

        // Optionally save the `selectionList` to local storage for persistence
        localStorage.setItem(
          'selectionList',
          JSON.stringify(this.allSections)
        );

        
      }
    });
  }

  navigateToSectionElements(selection: string) {
    this.router.navigate(['/home/build'], { queryParams: { selectedSection: selection, selectionId: this.sectionId } });
    console.log('Navigated with selection:', selection);
  }

  allSections: any = {
  }


    getAllSectionNames(){
      this.allSections  = localStorage.getItem("selectionList") 
    ? JSON.parse(localStorage.getItem("selectionList") as string)
    : [{ label: 'Drag Here or Click from the Sidenav to add Elements',value:`<div style="display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;"><label for="dropdown" style=" margin-bottom: 5px; font-size: 14px;">Drop elements here or click from the Sidenav to add!</label></div>`}];
    console.log(this.allSections)
    console.log(this.sections)
    this.sections = this.allSections.map((section: any) => section.selectionName || '');
    console.log(this.sections)
    }

    getAllSection(){
     return  this.allSections  = localStorage.getItem("selectionList") 
    ? JSON.parse(localStorage.getItem("selectionList") as string)
    : [{ label: 'Drag Here or Click from the Sidenav to add Elements',value:`<div style="display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;"><label for="dropdown" style=" margin-bottom: 5px; font-size: 14px;">Drop elements here or click from the Sidenav to add!</label></div>`}];

   

    }
}
