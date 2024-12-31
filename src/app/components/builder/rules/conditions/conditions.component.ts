import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { condition, Do, IF, rule } from '../../../../models/rules.model';
import { Element } from '../../../../models/elements.model';
@Component({
  selector: 'app-conditions',
  standalone: true,
  imports: [MatIconModule,MatDividerModule,MatButtonModule,FormsModule,CommonModule],
  templateUrl: './conditions.component.html',
  styleUrl: './conditions.component.css'
})
export class ConditionsComponent implements OnInit {
  mainContentItems:any;
 ngOnInit(): void {
  const savedItems = localStorage.getItem('selectionList');
  this.mainContentItems = savedItems
    ? JSON.parse(savedItems)
    : [];
    this.mainContentItems.forEach((element: Element) => {
      let conditionIf:IF = {label : element.name,value : element.id};
      this.condition.if.push(conditionIf);
      this.condition.anotherField.push(conditionIf);
      this.Do.field.push(conditionIf);
    });
    this.rule.conditions.push(this.condition);
    this.rule.dos.push(this.Do);

 }
 formConditionTypes: any = ["SHOW/HIDE FIELD","UPDATE/CALCULATE FIELD","ENABLE/REQUIRE/MASK FIELD","SKIP TO/HIDE A PAGE","CHANGE THANK YOU PAGE"];
 formConditions : any= [];
 showConditionTypes:Boolean = false;
 currentConditionType:string = '';
 addCondition(){
  this.showConditionTypes = true;
 }
 back(){
  if(this.currentConditionType === ''){
  this.showConditionTypes = false;
  }else{
    this.currentConditionType = '';
  }
 }
 onBoxClick(conditionType:string){
  if(conditionType === "SHOW/HIDE FIELD"){
    console.log(conditionType);
    this.currentConditionType = conditionType;
  }

 }

 condition:condition = {if:[],selectedIf:'',state:[
  "Is Equal To", 
  "Is Not Equal To", 
  "Is Greater Than", 
  "Is Greater Than or Equal To", 
  "Is Less Than", 
  "Is Less Than or Equal To", 
  "Contains", 
  "Does Not Contain"
 ],selectedState:'',target:["Another Field","Value"],selectedTarget:'Another Field',anotherField:[],selectedAnotherField:'',value:''} ;

 Do:Do= {do:["Hide","Show","Hide Multiple","Show Multiple"],selectedDo:'',field:[],selectedField:''}
 rule:rule={conditions:[], dos:[], option:'All'};


 saveRule(){
  this.rule.conditions.forEach((condition: condition)=> {
console.log(condition.selectedIf);
    this.mainContentItems.forEach((element: Element) => {
      console.log(element.id);
        if(element.id === condition.selectedIf || element.id === condition.selectedAnotherField){
          console.log(element.hasRule);
            element.hasRule = true;
            console.log(element.hasRule);
        }
    })
  });
  localStorage.setItem("selectionList",JSON.stringify(this.mainContentItems));
  localStorage.setItem("rules",JSON.stringify(this.rule));
 }
}
