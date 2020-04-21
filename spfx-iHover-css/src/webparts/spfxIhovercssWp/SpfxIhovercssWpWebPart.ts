import { Version } from '@microsoft/sp-core-library';
import { SPComponentLoader } from "@microsoft/sp-loader";
import { sp } from '@pnp/sp/presets/all';

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup,
  PropertyPaneCheckbox,
  IPropertyPaneChoiceGroupOption,
  PropertyPaneSlider,
  PropertyPaneToggle,
  PropertyPaneHorizontalRule,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SpfxIhovercssWpWebPart.module.scss';
import * as strings from 'SpfxIhovercssWpWebPartStrings';
import orgHtml from "./animalsHtml";
import * as $ from "jquery";

require('bootstrap');
require('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');

export interface ISpfxIhovercssWpWebPartProps {
  HoverShape:string;
  HoverEffect:string;
  ColorEffect:string;
  HoverPosition:string;
}

export default class SpfxIhovercssWpWebPart extends BaseClientSideWebPart<ISpfxIhovercssWpWebPartProps> {

  public render(): void {
    orgHtml.props = this.properties;    
    this.domElement.innerHTML = orgHtml.templateHtml;
    $(document).ready(() => {
      orgHtml.InitialiseControls();
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onInit(): Promise<void> {
    SPComponentLoader.loadCss("https://msisgrt.sharepoint.com/SiteAssets/css/ihover.css");
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
            description: "Hover Animation"
          },
          groups: [
            {
              groupName: "iHover Options",
              groupFields: [
                PropertyPaneChoiceGroup('HoverShape', {
                  label: "Share of the object",
                  options: [{ key: "square", text: "Square" },
                  { key: "circle", text: 'Circle' }
                  ]
                }),
                PropertyPaneDropdown('HoverEffect', {
                  label: "Hover effects:",
                  selectedKey: "effect1",
                  options: [{ key: "effect1", text: "One" },
                  { key: 'effect2', text: 'Two' },
                  { key: 'effect3', text: 'Three' },
                  { key: 'effect4', text: 'Four' },
                  { key: 'effect5', text: 'Five' },
                  { key: 'effect6', text: 'Six' },
                  { key: 'effect7', text: 'Seven' },
                  { key: 'effect8', text: 'Eight' },
                  { key: 'effect9', text: 'Nine' },
                  { key: 'effect10', text: 'Ten' },
                  { key: 'effect11', text: 'Eleven' },
                  { key: 'effect12', text: 'Tweleve' },
                  { key: 'effect13', text: 'Thirteen' },
                  { key: 'effect14', text: 'Fourteen' },
                  { key: 'effect15', text: 'Fifteen' },
                  { key: 'effect16', text: 'Sixteen' },
                  { key: 'effect17', text: 'Seventeen' },
                  { key: 'effect18', text: 'Eighteen' },
                  { key: 'effect19', text: 'Nineteen' },
                  { key: 'effect20', text: 'Twenty' }
                  ]
                }),
                PropertyPaneChoiceGroup('ColorEffect', {
                  label: "Hover color effect to add",
                  options: [{ key: "none", text: "No Color" },
                  { key: "colored", text: 'Colored (Blue)' }
                  ]
                }),
                PropertyPaneChoiceGroup('HoverPosition', {
                  label: "Animation move effect:",
                  options: [{ key: "left_to_right", text: "Left to Right" },
                  { key: 'right_to_left', text: 'Right to Left' },
                  { key: 'top_to_bottom', text: 'Top to Bottom' },
                  { key: 'bottom_to_top', text: 'Bottom to Top' }
                  ]
                })     
              ]
            }
          ]
        }
      ]
    };
  }
}
