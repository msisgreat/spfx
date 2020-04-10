import { Version } from '@microsoft/sp-core-library';
import { sp } from '@pnp/sp/presets/all';

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SpfxPnpjsWpWebPart.module.scss';
import * as strings from 'SpfxPnpjsWpWebPartStrings';
import * as $ from "jquery";
import * as bootstrap from "bootstrap";
import orgHtml from './animalsHtml';

require('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css');

export interface ISpfxPnpjsWpWebPartProps {
  description: string;
}

export default class SpfxPnpjsWpWebPart extends BaseClientSideWebPart<ISpfxPnpjsWpWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = orgHtml.templateHtml;
    $(document).ready(() => {
      orgHtml.GetAllOrganisms();
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context
    });
    return super.onInit();
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
