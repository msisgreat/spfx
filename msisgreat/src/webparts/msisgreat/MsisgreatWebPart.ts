import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';
import {sp, Web} from '@pnp/sp';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'MsisgreatWebPartStrings';
import Msisgreat from './components/Msisgreat';
import { IMsisgreatProps } from './components/IMsisgreatProps';

export interface IMsisgreatWebPartProps {
  description: string;
}

export default class MsisgreatWebPart extends BaseClientSideWebPart<IMsisgreatWebPartProps> {
   public render(): void {
    const element: React.ReactElement<IMsisgreatProps > = React.createElement(
      Msisgreat,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }
  public onInit(): Promise<void> {    
    return super.onInit().then(_ => {    
      sp.setup({    
        spfxContext: this.context    
      });    
    });    
  }  
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
