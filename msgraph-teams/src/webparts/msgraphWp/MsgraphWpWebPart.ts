import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MsgraphWpWebPart.module.scss';
import * as strings from 'MsgraphWpWebPartStrings';
import { MSGraphClient } from '@microsoft/sp-http';

export interface IMsgraphWpWebPartProps {
  description: string;
}

export default class MsgraphWpWebPart extends BaseClientSideWebPart<IMsgraphWpWebPartProps> {

  public render(): void {

    this.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient): void => {
        client
          .api('/me/joinedTeams')
          .get((error, teams: any, rawResponse?: any) => {
            var html = "";
            for (var j = 0; j < teams.value.length; j++) {
              var teamItem = teams.value[j];
              html = html + "<div>" + teamItem.displayName + "</div>";
            }
            this.domElement.innerHTML = `<div class='container'>
              <h1>Call to Graph API</h1>
              <div>Teams List:</div> ${html}
              </div>
              `;
          });
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
