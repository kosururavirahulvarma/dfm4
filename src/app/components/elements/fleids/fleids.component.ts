import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-fleids',
  standalone: true,
  imports: [],
  templateUrl: './fleids.component.html',
  styleUrl: './fleids.component.css'
})
export class FleidsComponent {
  @Input() elementName: String = '';

  ngOnChanges(changes: SimpleChanges): void {
    console.log("called")
    console.log(this.elementName)
    // Called when input data changes
    if (changes['receivedData']) {
      console.log('Received data has changed:', changes['receivedData'].currentValue);
    }
  }
}
