import * as React from 'react';
import { useEffect } from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';
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
  categories: any;
  promoCode: string;
  arrayCategories: Array<any>;
}


export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
  public arrayCategories: Array<any> = [];
  public componentDidMount() {
    try {   
      this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('Categories')/Items`, SPHttpClient.configurations.v1)
        .then(async (response: SPHttpClientResponse) => await response.json())
        .then(async (data) => {
          if(data.value.length !== this.arrayCategories.length){
            for (var i = 0; i < data.value.length; ++i) {
              await this.arrayCategories.push({
                key: data.value[i].Title,
                text: data.value[i].Title
              });
            }
          }        
        });
    } catch (e) { }
  };
  public render(): void {

    this.componentDidMount();
    const element: React.ReactElement<IHelloWorldProps> = React.createElement(
      HelloWorld,
      {
        description: this.properties.description,
        color: this.properties.color,
        nameOfCompany: this.properties.nameOfCompany,
        valueQrCode: this.properties.valueQrCode,
        context: this.context,
        categories: this.properties.categories,
        promoCode: this.properties.promoCode,
        arrayCategories: this.arrayCategories
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
                PropertyPaneTextField('promoCode', {
                  label: 'promoCode',
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
                }),
                PropertyPaneDropdown('categories', {
                  label: 'Categories',
                  options: this.arrayCategories
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
