export interface FilterableField {
  field: string;
  label: string;
  operators: Array<string>;
  type: "string" | "number" | "boolean" | "date" | "datetime" | "array" | "enum";
}
