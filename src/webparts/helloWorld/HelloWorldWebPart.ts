import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import * as strings from 'HelloWorldWebPartStrings';
import { HelloWorld } from './components/HelloWorld';
import { IHelloWorldProps } from './components/IHelloWorldProps';

export interface IHelloWorldWebPartProps {
  color: string;
  description: string;
  nameOfCompany: string;
  valueQrCode: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IHelloWorldProps> = React.createElement(
      HelloWorld,
      {
        description: this.properties.description,
        color: this.properties.color,
        nameOfCompany: this.properties.nameOfCompany,
        valueQrCode: this.properties.valueQrCode
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
              PropertyPaneTextField('nameOfCompany', {
                label: 'Name Of Company'        
              }),
              PropertyPaneTextField('description', {
                label: 'Description',
                multiline: true
              }),
              PropertyPaneTextField('valueQrCode', {
                label: 'Value QR-Code',
                multiline: true
              }),
              PropertyFieldColorPicker('color', {
                label: 'Color',
                selectedColor: this.properties.color,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                isHidden: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Full,
                iconName: 'Precipitation',
                key: 'colorFieldId'
              })
            ]
            }
          ]
        }
      ]
    };
  }
}
