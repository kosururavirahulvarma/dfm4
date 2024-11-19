import { Component } from '@angular/core';
import { NavbarComponent } from "../../layouts/navbar/navbar.component";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-publish',
  standalone: true,
  imports: [MatSidenavModule,MatIconModule,MatListModule,RouterLink,RouterOutlet],
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.css'
})
export class PublishComponent {

publishSideNavList:any = [{label: "QuickShare",routerLink: "quickshare"},{label:"Download",routerLink: "download"},{label:"Assign Form", routerLink: "assignforms"}];
}
