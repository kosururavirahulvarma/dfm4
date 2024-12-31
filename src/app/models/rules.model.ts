export interface rule {
  conditions: condition[];
  dos: Do[];
  option: string;
}

export interface condition {
  if: IF[];
  selectedIf: string;
  state: string[];
  selectedState: string;
  target: string[];
  selectedTarget: string;
  value: string;
  anotherField:IF[];
  selectedAnotherField: string;
}

export interface Do {
  do: string[];
  selectedDo: string;
  field: IF[];
  selectedField: string;
}

export interface IF {
  label: string;
  value: string;
}
