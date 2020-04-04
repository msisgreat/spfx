import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SpfxdeployWpWebPart.module.scss';
import * as strings from 'SpfxdeployWpWebPartStrings';

export interface ISpfxdeployWpWebPartProps {
  description: string;
}

export default class SpfxdeployWpWebPart extends BaseClientSideWebPart<ISpfxdeployWpWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.spfxdeployWp }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Site Collection AppCatalog Demo</span>
              <p class="${ styles.subTitle }">In this sample open Gulpfile.js to see the custom build functions. Open package.json to see the scripts for deploy & publish.</p>              
              <p><b> npm install gulp-spsync-creds --save-dev --save-exact </b></p>
              <a href="https://youtu.be/t8PLeb7UCx4" class="${ styles.button }">
                <span class="${ styles.label }">Youtube</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
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
