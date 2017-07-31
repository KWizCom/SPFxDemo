declare interface IKoWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'koWebPartStrings' {
  const strings: IKoWebPartStrings;
  export = strings;
}
