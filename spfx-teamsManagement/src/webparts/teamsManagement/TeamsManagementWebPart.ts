import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './TeamsManagementWebPart.module.scss';
import * as strings from 'TeamsManagementWebPartStrings';
import * as $ from "jquery";

export interface ITeamsManagementWebPartProps {
  description: string;
}
import teamHtml from "./TeamsManagement";
require('bootstrap');
require('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css');
require('../../../node_modules/animate.css/animate.min.css');

export default class TeamsManagementWebPart extends BaseClientSideWebPart <ITeamsManagementWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = teamHtml.templateHtml;
          $(document).ready(() => {
              teamHtml.InitialiseControls(this.context.msGraphClientFactory);
          });
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
