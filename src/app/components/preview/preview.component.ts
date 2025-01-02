import { JsonPipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Element } from '../../models/elements.model';
import { rule } from '../../models/rules.model';
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
  selectionList: any = [];
  rules: rule = {conditions:[],dos:[],option:''}
  constructor(private sanitizer: DomSanitizer) {}



  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      // Access localStorage only in the browser
      const savedRules = localStorage.getItem('rules');
      this.rules = savedRules ? JSON.parse(savedRules) : {conditions:[],dos:[],option:''};
      const savedItems = localStorage.getItem('selectionList');
      this.selectionList = savedItems
        ? JSON.parse(savedItems): ''
        // : this.defaultItems; // Use the constant defaultItems if no saved data exists
    } 
    // else {
      // Fallback if localStorage is unavailable
      // this.selectionList = this.defaultItems;
    // }

    console.log('this.selectionList  :: ' + JSON.stringify(this.selectionList));
  }

}
