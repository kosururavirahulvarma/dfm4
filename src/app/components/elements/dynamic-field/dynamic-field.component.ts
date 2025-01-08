import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-dynamic-field',
  standalone: true,
  imports: [],
  templateUrl: './dynamic-field.component.html',
  styleUrl: './dynamic-field.component.css'
})
export class DynamicFieldComponent {
  @Input() element: any; // Input to accept field configuration
}
