import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Element } from '../../models/elements.model';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  combinedHtml: SafeHtml = '';
  storedData: any[] = [];
  mainContentItems: Element[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      // Access localStorage only in the browser
      const savedItems = localStorage.getItem('mainContentItems');
      this.mainContentItems = savedItems
        ? JSON.parse(savedItems)
        : [
            {
              label: 'Drag Here or Click from the Sidenav to add Elements',
              value: `<div style="display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;">
                        <label for="dropdown" style="margin-bottom: 5px; font-size: 14px;">
                          Drop elements here or click from the Sidenav to add!
                        </label>
                      </div>`
            }
          ];
    } else {
      // Default value when localStorage is unavailable
      // this.mainContentItems = [
      //   {
      //     // label: 'Drag Here or Click from the Sidenav to add Elements',
          // value: `<div style="display: flex; flex-direction: column; width: 100%; max-width: 400px; margin-bottom: 15px;">
          //           <label for="dropdown" style="margin-bottom: 5px; font-size: 14px;">
          //             Drop elements here or click from the Sidenav to add!
          //           </label>
          //         </div>`
      //   }
      // ];
    }
  }
}
