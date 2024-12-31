import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [MatSidenavModule,MatButtonToggleModule,MatIconModule,MatListModule,RouterOutlet,RouterLink],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.css'
})
export class RulesComponent {
  rulesSideNavList:any = [{label: "Emails",routerLink: "emails"},{label:"Conditions",routerLink: "conditions"},{label:"Thank You Page", routerLink: "thankyou"}];
}
