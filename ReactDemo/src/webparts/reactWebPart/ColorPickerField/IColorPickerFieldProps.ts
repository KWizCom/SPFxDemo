import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-webpart-base';

export interface IColorPickerFieldProps extends IPropertyPaneCustomFieldProps {
        label: string;
        currentValue: string;
        onPropertyChange: (propertyPath: string, newValue: any) => void;
        //if true, will trigger change event while dragging. Turn to false if render method is slow.
        triggerChangeOnDrag: boolean;
}