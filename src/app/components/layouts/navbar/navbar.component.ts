import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    CommonModule,
    MatSlideToggleModule,
    DragDropModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  mobileQuery: MediaQueryList;
  fillerNav = [
    { label: 'Text Box'},
    { label: 'Input Box'},
    { label: 'Radio Button' },
    { label: 'Check Box' },
    { label: 'Email'},
    { label: 'Phone Number'},
    { label: 'Dropdown'}
  ];
  previousUrl: string = '/';
  currentUrl: string = '/';
  trackByIndex(index: number) {
    return index; // track by index to improve performance
  }

  @Input() field: any;
 

  private _mobileQueryListener: () => void;

  constructor(private router:Router) {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    // Listen for navigation end events to track the previous route
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        console.log("previousUrl"+this.previousUrl);
        console.log("currentUrl"+this.currentUrl);
      });
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // Handle the change event of the mat-slide-toggle
  onToggleChange(event: any) {
    console.log("toogle");
    if (event.checked) {
      // If toggle is ON (checked), navigate to the 'preview' route
      this.router.navigate(['home/preview']);
    } else {
      // If toggle is OFF (unchecked), navigate to the 'build' route
      this.router.navigateByUrl(this.previousUrl);
    }
  }

}
