import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterOutlet } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Element, Option, Section } from '../../../../models/elements.model';
import { condition, Do, rule } from '../../../../models/rules.model';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatListModule,
    RouterOutlet,
  ],
  templateUrl: './download.component.html',
  styleUrl: './download.component.css',
})
export class DownloadComponent {
  cardList = [
    { title: 'IFRAME', subtitle: 'Embedded form in an iFrame' },
    {
      title: 'Source Code',
      subtitle: 'Copy source code or download as zip file',
    },
    { title: 'HTMLFile', subtitle: 'Download as HTML file' },
  ];
  currentPage: string = '';
  opened: Boolean = false;
  combinedHtml: any;
  selectionList: any;
  rules: rule = { conditions: [], dos: [], option: '' };
  // Method to handle card click
  onCardClick(title: string) {
    console.log(title);
    this.opened = !this.opened;
    this.currentPage = title;
  }

  goBack() {
    this.opened = !this.opened;
  }

  downloadFile() {
    const savedRules = localStorage.getItem('rules');
    this.rules = savedRules
      ? JSON.parse(savedRules)
      : { conditions: [], dos: [], option: '' };
    const savedItems = localStorage.getItem('selectionList');
    this.selectionList = savedItems ? JSON.parse(savedItems) : [];
    console.log(this.selectionList);
    this.combinedHtml = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DFM Generated HTML</title>
         <style>
    /* Styling remains the same */
    body {
      display: flex;
      margin: 0;
      font-family: Arial, sans-serif;
    }
    .sidenav {
      width: 250px;
      height: 100vh;
      background-color: #333;
      color: white;
      padding: 10px;
      display: flex;
      flex-direction: column;
    }
    .sidenav a {
      text-decoration: none;
      color: white;
      padding: 10px;
      margin: 5px 0;
      background-color: #444;
      border-radius: 5px;
      cursor: pointer;
    }
    .sidenav a:hover {
      background-color: #555;
    }
    .main-content {
      flex-grow: 1;
      padding: 20px;
      background-color: #f4f4f4;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    form label {
      font-weight: bold;
    }
    form input, form select, form textarea, form button {
      padding: 10px;
      font-size: 16px;
    }
    form button {
      background-color: #007BFF;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }
    form button:hover {
      background-color: #0056b3;
    }
  </style>
      </head>
      <body>`;
  this.combinedHtml += ` <div class="sidenav">`
    // Dynamically append form elements
    this.selectionList.forEach((section: Section) => {
      if (section.elements != null && section.elements != undefined) {
        this.combinedHtml += `<a onclick="loadForm('${section.sectionId}')">${section.selectionName}</a>`;
      }
    });
    this.combinedHtml += `
     </div>
     <div class="main-content" id="mainContent">
    <h2>Welcome</h2>
    <p>Select an item from the sidenav to display a form.</p>
  </div>`;
    this.combinedHtml += `
     <script>
     const forms = {`;
    this.selectionList.forEach((section: Section) => {
      if (section.elements != null && section.elements != undefined) {
        this.combinedHtml += `${section.sectionId}:(data) => `;
        this.combinedHtml += "`";
        this.combinedHtml +=` <h2>${section.selectionName}</h2>
        <form onsubmit="submitForm(event, '${section.sectionId}')">`;
        section.elements.forEach((element: Element) => {
          this.combinedHtml += `<div style="width: 100%; margin-bottom: 15px;"><div style="${element.styles?.divStyle}">`;
          if (element.label) {
            this.combinedHtml += `<label style="${element.styles?.labelStyle}">${element.label}</label>`;
          }
          if (element.type === 'input') {
            if (element.hasRule) {
              this.combinedHtml += `<input type="text" value="`+"${data."+`${element.id}`+` || ''}"`+`id="${element.id}" oninput="toggleInputFields('${element.id}')" name="${element.name}" placeholder="${element.placeholder}" style="${element.styles?.inputStyle}" />`;
            } else {
              this.combinedHtml += `<input type="text" value="`+"${data."+`${element.id}`+` || ''}"`+`id="${element.id}" name="${element.name}" placeholder="${element.placeholder}" style="${element.styles?.inputStyle}" />`;
            }
          } else if (element.type === 'email') {
            if (element.hasRule) {
              this.combinedHtml += `<input type="email" value="`+"${data."+`${element.id}`+` || ''}"`+`id="${element.id}" oninput="toggleInputFields(${element.id})" name="${element.name}" placeholder="${element.placeholder}" style="${element.styles?.inputStyle}" required />`;
            } else {
              this.combinedHtml += `<input type="email" value="`+"${data."+`${element.id}`+` || ''}"`+`id="${element.id}" name="${element.name}" placeholder="${element.placeholder}" style="${element.styles?.inputStyle}" required />`;
            }
          } else if (element.type === 'textbox') {
            if (element.hasRule) {
              this.combinedHtml += `<textarea  value="`+"${data."+`${element.id}`+` || ''}"`+`  id="${element.id}"  oninput="toggleInputFields(${element.id})" name="${element.name}" placeholder="${element.placeholder}" style="${element.styles?.inputStyle}" required></textarea>`;
            } else {
              this.combinedHtml += `<textarea  value="`+"${data."+`${element.id}`+` || ''}"`+`  id="${element.id}" name="${element.name}" placeholder="${element.placeholder}" style="${element.styles?.inputStyle}" required></textarea>`;
            }
          } else if (element.type === 'radio') {
            this.combinedHtml += ` <div id="${element.id}"  style="display: flex; flex-direction: column; margin-top: 10px;">`;
            element.options?.forEach((option: Option) => {
              this.combinedHtml += ` <label style="margin-bottom: 5px;">
                      <input
                        type="radio"
                        id="${option.id}"
                        name="${element.name}"
                        value="${option.value}" `+"${data."+`${option.value}`+` === '${option.value}' ? 'checked' : ''}`+`
                        style="margin-right: 8px;" />
                      ${option.label}
                    </label>`;
            });
            this.combinedHtml += ` </div>`;
          } else if (element.type === 'checkbox') {
            this.combinedHtml += `<div id="${element.id}"  style="display: flex; flex-direction: column; margin-top: 10px;">`;
            element.options?.forEach((option: Option) => {
              this.combinedHtml += ` <label style="margin-bottom: 5px;">
                      <input
                        type="checkbox"
                        id="${option.id}"
                        name="${element.name}"
                        value="${option.value}" `+"${data."+`${option.value}`+` === '${option.value}' ? 'checked' : ''}`+`
                        style="margin-right: 8px;" />
                      ${option.label}
                    </label>`;
            });
            this.combinedHtml += ` </div>`;
          } else if (element.type === 'phone') {
            if (element.hasRule) {
              this.combinedHtml += `<input  
            id="${element.id}"
            name="${element.name}"
            placeholder="${element.placeholder}"
            oninput="toggleInputFields(${element.id})"
            style="${element.styles?.inputStyle}"
            required="${element.validation?.required}" 
            type="tel"
            value="`+"${data."+`${element.id}`+` || ''}"`+`
            style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;" />`;
            } else {
              this.combinedHtml += `<input  
                  id="${element.id}"
                  name="${element.name}"
                  placeholder="${element.placeholder}"
                  style="${element.styles?.inputStyle}"
                  required="${element.validation?.required}" 
                  type="tel"
                  value="`+"${data."+`${element.id}`+` || ''}"`+`
                  style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;" />`;
            }
          } else if (element.type === 'dropdown') {
            this.combinedHtml += `<div style="width: 100%;">
           <select
                    id="${element.id}"
                    name="${element.name}"
                    style="${element.styles?.selectStyle}"
                    style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">`;
                    
            //   element.options?.forEach((option:Option) =>{
            //     this.combinedHtml += `
            //               <option   id="${option.id}" value="${option.value}">
            //               ${ option.label }
            //               </option>`;
            // });
            this.combinedHtml += `</select> </div>`;
          }
        });
        this.combinedHtml += ` <button type="submit">Submit</button>
        </form>`
         this.combinedHtml += "`,";
      }
    });
    this.combinedHtml += ` };
      function loadForm(formId) {
      let prefillData = JSON.parse(localStorage.getItem(formId));
      if(prefillData === null){
      prefillData = {};
      }
      console.log('Retrieved data:', prefillData);
      const mainContent = document.getElementById('mainContent');
      if (forms[formId]) {
        mainContent.innerHTML = forms[formId](prefillData);
      } else {
        mainContent.innerHTML = '<p>Form not found.</p>';
      }
    }

    function submitForm(event, formId) {
      event.preventDefault(); // Prevent default form submission
      let formData = {};
      let selectedFormId = null;
      `
    this.selectionList.forEach((section: Section) => {
      if (section.elements != null && section.elements != undefined) {
      this.combinedHtml += `
      if (formId === '${section.sectionId}') {
      selectedFormId = '${section.sectionId}';
        formData = {`
        section.elements.forEach((element: Element) => {
         this.combinedHtml += `
          ${element.id}: document.getElementById('${element.id}').value,`
        });
         this.combinedHtml += `};}`
      }});
       this.combinedHtml += `
       
      // Send formData to server or handle it as needed
       localStorage.setItem(selectedFormId, JSON.stringify(formData));
      console.log('Form submitted with data:', formData);
      alert('Form submitted with data: ' + JSON.stringify(formData));
    }
    function toggleInputFields(id) {
      console.log(id);
      `;
    this.rules.conditions.forEach((condition: condition) => {
      this.combinedHtml += `  const id1= document.getElementById('${condition.selectedIf}').value;
          console.log(id1);
          const id2= document.getElementById('${condition.selectedAnotherField}').value;
            console.log(id2);`;
      this.rules.dos.forEach((item: Do) => {
        if (item.selectedDo == 'Hide') {
          console.log(item);
          if (condition.selectedState === 'Is Equal To') {
            this.combinedHtml += `console.log("field");
              const field = document.getElementById('${item.selectedField}');
              console.log(field);
                const usStates = [
      "Alabama", "Alaska", "Arizona", "Arkansas", "California",
      "Colorado", "Connecticut", "Delaware", "Florida", "Georgia"
    ];

    const indianStates = [
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
      "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand"
    ];
      if(id1 === "US"){
                 for (let i = 0; i < usStates.length; i++) {
        const option = document.createElement('option');
        option.value = usStates[i];
        option.textContent = usStates[i];
        field.appendChild(option);
        field.disabled = false;
      }
                }
      if(id1 === "India") {
                 for (let i = 0; i < indianStates.length; i++) {
        const option = document.createElement('option');
        option.value = indianStates[i];
        option.textContent = indianStates[i];
        field.appendChild(option);
        field.disabled = false;
                }}
  if(id1 != "India" && id1 != "US"){
      while (field.firstChild) {
        field.removeChild(field.firstChild);
      }
      field.disabled = true;
      }
                if(id1 === id2 && id1 != '' && id2 != ''){
                          field.style.display = 'none';
                }else{
                          field.style.display = 'flex';
                }
              `;
          } else {
          }
        }
      });
    });
    this.combinedHtml += `
    }
     </script>
      `;
    this.combinedHtml += `
      </body>
      </html>`;
    const blob = new Blob([this.combinedHtml], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'generated-form.html';
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
