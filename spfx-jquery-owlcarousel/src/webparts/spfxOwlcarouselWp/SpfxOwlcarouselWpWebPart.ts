import { Version } from '@microsoft/sp-core-library';
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

import styles from './SpfxOwlcarouselWpWebPart.module.scss';
import * as strings from 'SpfxOwlcarouselWpWebPartStrings';

export interface ISpfxOwlcarouselWpWebPartProps {  
  styles: number;
  urlHashNav: boolean;
  choiceCenter: boolean;
  itemsCount: number;
}

import * as $ from "jquery";
import * as bootstrap from "bootstrap";
import orgHtml from './animalsHtml';
require('owl.carousel');

require('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../../../node_modules/owl.carousel/dist/assets/owl.carousel.min.css');
require('../../../node_modules/owl.carousel/dist/assets/owl.theme.default.min.css');

export default class SpfxOwlcarouselWpWebPart extends BaseClientSideWebPart<ISpfxOwlcarouselWpWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = orgHtml.templateHtml;
    $(document).ready(() => {
         orgHtml.GetAllOrganisms(this.properties);
    });
  }

  protected onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context
    });
    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  
  protected get disableReactivePropertyChanges(): boolean { 
    return true; 
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Please select the carousel style to display the Animals" //strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: "Carousel Styles",//strings.BasicGroupName,
              groupFields: [
                PropertyPaneChoiceGroup('styles', {
                  label: "Choose the carousel style:",
                  options: [   {key: 1, text: "Basic"},
                  {key: 2, text: 'Responsive', checked : true}]
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneCheckbox('choiceCenter', {
                  text: "Center Content",
                  checked:true
                }),
                PropertyPaneToggle('urlHashNav', {
                  label: 'Url Hash Navigation:',
                  onText: 'Enabled',
                  offText: 'Disabled',
                  key:'OnorOff'
                }),
                PropertyPaneSlider('itemsCount', { 
                  label: "Item count to show", 
                  min: 2, 
                  max: 10, 
                  step: 1, 
                  showValue: true, 
                  value: 4
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
