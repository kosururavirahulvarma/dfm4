export interface RootElement {
    elements: Element[]
  }
  
  export interface Element {
    index: number
    type: string
    label: string
    name: string
    id?: string
    placeholder?: string
    styles?: Styles
    validation?: Validation
    options?: Option[]
  }
  
  export interface Styles {
    selectStyle?: string
    labelStyle: string
    divStyle: string
    inputStyle?: string
  }
  
  export interface Validation {
    required: boolean
    minLength: number
    maxLength: number
  }
  
  export interface Option {
    value: string
    label: string
  }