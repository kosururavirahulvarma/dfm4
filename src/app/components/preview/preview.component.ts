import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {
  combinedHtml: SafeHtml = '';
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.combineHtmlValues();
  }

  // Method to combine all HTML values into one and sanitize
  combineHtmlValues() {

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
}
