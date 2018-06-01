import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'reactWebPartStrings';
import ReactWebPart from './components/ReactWebPart';
import { IReactWebPartProps } from './components/IReactWebPartProps';
import { IReactWebPartWebPartProps } from './IReactWebPartWebPartProps';
import Utilities from '../../../../SharedCode/Utilities';
import License from 'kwizcom-license';
import { get, update } from "@microsoft/sp-lodash-subset";
import { ColorPickerField } from "./ColorPickerField/ColorPickerField";

declare var kwfabric: any;

export default class ReactWebPartWebPart extends BaseClientSideWebPart<IReactWebPartWebPartProps> {

  public render(): void {
    License.GetUserLicenseMessage(this.context).then(licenseMessage => {
      const element: React.ReactElement<IReactWebPartProps> = React.createElement(
        ReactWebPart,
        {
          description: this.properties.description,
          userName: Utilities.GetUserName(this.context as any),
          license: licenseMessage,
          color: this.properties.color
        }
      );

      ReactDom.render(element, this.domElement);
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private onPropertyChange(propertyPath: string, newValue: any): void {
    const oldValue: any = get(this.properties, propertyPath);
    update(this.properties, propertyPath, (): any => { return newValue; });
    this.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    if (!this.disableReactivePropertyChanges)
      this.render();//update the webpart

      //make sure updates re-render the properties panel
      //this is important if you want your custom property changes
      //to be able to show, hide, disable other properties.
      this.context.propertyPane.refresh();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                new ColorPickerField('color', {
                  label: 'Please select background color',
                  currentValue: this.properties && this.properties.color,
                  triggerChangeOnDrag: true,
                  onPropertyChange: this.onPropertyChange.bind(this),
                  key: null, onRender: null
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
