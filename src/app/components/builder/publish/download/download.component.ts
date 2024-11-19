import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router,RouterOutlet } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatIconModule,CommonModule,MatListModule,RouterOutlet],
  templateUrl: './download.component.html',
  styleUrl: './download.component.css'
})
export class DownloadComponent {
  cardList = [
    { title: 'IFRAME', subtitle: 'Embedded form in an iFrame' },
    { title: 'Source Code', subtitle: 'Copy source code or download as zip file' },
    { title: 'HTMLFile', subtitle: 'Download as HTML file'},
  ];
 currentPage:string = '';
  opened:Boolean = false;
  combinedHtml: any;
  // Method to handle card click
  onCardClick(title: string) {

    console.log(title);
    this.opened = !this.opened;
    this.currentPage = title;
  }

  goBack(){
    this.opened = !this.opened;
  }
  constructor(private sanitizer: DomSanitizer) {
    // Get data from localStorage
    const storedData = localStorage.getItem('mainContentItems');
    
    if (storedData) {
      try {
        const jsonData: { label: string; value: string }[] = JSON.parse(storedData);

        // Combine all HTML values
        const htmlContent = jsonData.map(item => item.value).join('');

        // Sanitize and store the combined HTML
        this.combinedHtml = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
      } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
      }
    } else {
      console.warn('No formFields data found in localStorage.');
    }
  }

  downloadFile(){
    const fileName = 'downloadedContent.html';  // Name of the HTML file to be downloaded
    
    // Create a Blob from the combined HTML content
    const blob = new Blob([this.combinedHtml.changingThisBreaksApplicationSecurity], {
      type: 'text/html'
    });

    // Create an anchor element to download the Blob
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;  // Name the downloaded file
    document.body.appendChild(a);
    a.click();  // Trigger the download
    document.body.removeChild(a);  // Remove the anchor element after download
  }
}
