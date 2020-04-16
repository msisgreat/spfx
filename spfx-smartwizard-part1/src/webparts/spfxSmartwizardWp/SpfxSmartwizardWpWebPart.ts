import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SpfxSmartwizardWpWebPart.module.scss';
import * as strings from 'SpfxSmartwizardWpWebPartStrings';

export interface ISpfxSmartwizardWpWebPartProps {
  description: string;
}
import * as $ from "jquery";
//import * as bootstrap from "bootstrap";
require("bootstrap");
require('../../../node_modules/smartwizard/dist/css/smart_wizard.min.css');
require('../../../node_modules/smartwizard/dist/css/smart_wizard_theme_arrows.min.css');
require('../../../node_modules/smartwizard/dist/css/smart_wizard_theme_circles.min.css');
require('../../../node_modules/smartwizard/dist/css/smart_wizard_theme_dots.min.css');

require("smartwizard");
require('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');

export default class SpfxSmartwizardWpWebPart extends BaseClientSideWebPart<ISpfxSmartwizardWpWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `<div id="smartwizard">
    <ul>
        <li><a href="#step-1">Step Title<br /><small>Step description</small></a></li>
        <li><a href="#step-2">Step Title<br /><small>Step description</small></a></li>
        <li><a href="#step-3">Step Title<br /><small>Step description</small></a></li>
        <li><a href="#step-4">Step Title<br /><small>Step description</small></a></li>
    </ul>
 
    <div>
        <div id="step-1" class="">
            Step Content
        </div>
        <div id="step-2" class="">
            Step Content
        </div>
        <div id="step-3" class="">
            Step Content
        </div>
        <div id="step-4" class="">
            Step Content
        </div>
    </div>
</div>
    `;

    $(document).ready(() => {
      let smartwiz:any = $("#smartwizard");
      smartwiz.smartWizard({theme:'arrows'});
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
