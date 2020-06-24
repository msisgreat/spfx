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

import styles from './SpfxAnimateJpagesWpWebPart.module.scss';
import * as strings from 'SpfxAnimateJpagesWpWebPartStrings';

export interface ISpfxAnimateJpagesWpWebPartProps {
  ItemsPerPage:number;  
  EnableKeyboard:boolean;
  ScrollNavigation:boolean;
  AutoPaginate:boolean;
  Animation:string;
}
import orgHtml from "./animalsHtml";
import * as $ from "jquery";

require('bootstrap');
require('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../../../node_modules/animate.css/animate.min.css');
require('jPages');

export default class SpfxAnimateJpagesWpWebPart extends BaseClientSideWebPart<ISpfxAnimateJpagesWpWebPartProps> {

  public render(): void {    
    orgHtml.props = this.properties;
    this.domElement.innerHTML = orgHtml.templateHtml;
    $(document).ready(() => {
      orgHtml.InitialiseControls();
    });
  }

  protected onInit(): Promise<void> {
    SPComponentLoader.loadCss("https://msisgrt.sharepoint.com/SiteAssets/jPages/css/jPages.css");
    sp.setup({
      spfxContext: this.context
    });
    return super.onInit();
  }
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Property page to change the options for jPages component"
          },
          groups: [
            {
              groupName: "jPages Styles",
              groupFields: [
                PropertyPaneChoiceGroup('ItemsPerPage', {
                  label: "Select items to show in a page:",
                  options: [   {key: 8, text: "8"},
                  {key: 16, text: '16'},
                  {key: 24, text: "24"}]
                }),               
                PropertyPaneToggle('EnableKeyboard', {
                  label: 'Keyboard Navigation:',
                  onText: 'Enabled',
                  offText: 'Disabled',
                  key:'OnorOff'
                }),
                PropertyPaneCheckbox('ScrollNavigation', {
                  text: "Scroll pagination, by mouse scroll",
                  checked:true
                }),
                PropertyPaneCheckbox('AutoPaginate', {
                  text: "Show pages automatically. Wait time in 4 secs ",
                  checked:true
                }),
                PropertyPaneChoiceGroup('Animation', {
                  label: "Choose the animation name:",
                  options: [   
                      { key: "bounceIn", text: "bounceIn" },
                      { key: "bounceInDown", text: "bounceInDown" },
                      { key: "bounceInLeft", text: "bounceInLeft" },
                      { key: "bounceInRight", text: "bounceInRight" },
                      { key: "bounceInUp", text: "bounceInUp" },
                      { key: "bounceInLeft", text: "bounceInLeft" },

                      { key: "fadeIn", text: "fadeIn" },
                      { key: "fadeInDown", text: "fadeInDown" },
                      { key: "fadeInLeft", text: "fadeInLeft" },
                      { key: "fadeInRight", text: "fadeInRight" },
                      { key: "fadeInUp", text: "fadeInUp" },

                      { key: "zoomIn", text: "zoomIn" },
                      { key: "zoomInDown", text: "zoomInDown" },
                      { key: "zoomInLeft", text: "zoomInLeft" },
                      { key: "zoomInRight", text: "zoomInRight" },
                      { key: "zoomInUp", text: "zoomInUp" }
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
