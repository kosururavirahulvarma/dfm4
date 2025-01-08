export interface SectionList{
  
  selectionList : Section[]
}

export interface Section {
  sectionId?: string;
  selectionName: string;
  elements: Element[];
}

export interface Element {
  index: number;
  type: string;
  label: string;
  name: string;
  id?: string;
  value?: any;
  placeholder?: string;
  hasRule: Boolean;
  styles?: Styles;
  validation?: Validation;
  options?: Option[];
  innerLabelStyle: string;
  innerDivStyle: string;
  rowItems?:any;
}
  
  export interface Styles {
    selectStyle?: string
    labelStyle: string
    divStyle: string
    inputStyle?: string
    class?:string
  }
  
  export interface Validation {
    required: boolean
    minLength: number
    maxLength: number
  }
  
  export interface Option {
    value: string
    label: string
    style : string
    id:string
  }