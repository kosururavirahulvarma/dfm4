import { Component } from '@angular/core';
import { Section, SectionList } from '../../../models/elements.model';
import { CreatesectiondialogComponent } from '../createsectiondialog/createsectiondialog.component';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,CommonModule,MatTooltipModule],
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

  addSection(section: string) {
    const dialogRef = this.dialog.open(CreatesectiondialogComponent, {
      width: '400px',
      data: {title :'Add New Section', section : section}
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('result')
      console.log(result)
      console.log(section)
      if(section === ''){
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
    }else if(result != undefined && result != null){
      console.log("bjh")
      this.allSections.forEach((element:any) => {
        if(element.selectionName === section){
          element.selectionName = result;
          this.sections.forEach((element,index )=> {
            if(element === section){
                console.log(index)
                this.sections[index] =  result;
                localStorage.setItem(
                  'selectionList',
                  JSON.stringify(this.allSections)
                );
            }
          });
        }
    
      });
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

    onDelete(section: any) {
      this.allSections.forEach((element: any, index: any) => {
        if (element.selectionName === section) {
          console.log('Found section at index:', index);
          
          this.allSections.splice(index, 1);
          localStorage.setItem(
            'selectionList',
            JSON.stringify(this.allSections)
          );
          this.sections.forEach((element,index )=> {
            if(element === section){
                console.log(index)
                this.sections.splice(index, 1);
            }
          });
         
          console.log('Updated allSections:', this.allSections);
        }
      });
    }
    
    onEdit(section : any){
      console.log(section)
      console.log(this.allSections)
      this.allSections.forEach((element:any) => {
        if(element.selectionName === section){
          this.addSection(section)
        }
        
      });
    }
}
