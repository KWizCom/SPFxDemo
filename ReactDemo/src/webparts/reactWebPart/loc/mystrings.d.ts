declare interface IReactWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'reactWebPartStrings' {
  const strings: IReactWebPartStrings;
  export = strings;
}
