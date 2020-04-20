import { Version } from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';
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

import styles from './SpfxAnimateWpWebPart.module.scss';
import * as strings from 'SpfxAnimateWpWebPartStrings';

import * as $ from "jquery";
import orgHtml from './animalsHtml';
import OrganismClass from './animalsHtml';
require('bootstrap');
require('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css');
require('../../../node_modules/animate.css/animate.min.css');

export interface ISpfxAnimateWpWebPartProps {
  HeaderAnimation: string;
  HeaderAnimationLoop: string;
  HeaderAnimationDelay: number;
  HeaderAnimationDuration: string;
  CardLoad: string;
  CardImage: string;
}

export default class SpfxAnimateWpWebPart extends BaseClientSideWebPart<ISpfxAnimateWpWebPartProps> {

  public render(): void {   
    OrganismClass.props = this.properties; 
    this.domElement.innerHTML = orgHtml.templateHtml;
    $(document).ready(() => {
      orgHtml.InitialiseControls();
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onInit(): Promise<void> { 
    SPComponentLoader.loadCss("https://msisgrt.sharepoint.com/SiteAssets/css/sampleanimate.css");   
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
            description: "Animate CSS Demo"
          },
          groups: [
            {
              groupName: "Header Animation",
              groupFields: [
                PropertyPaneChoiceGroup('HeaderAnimation', {
                  label: "Animate:",
                  options: [{ key: "bounce", text: "bounce" },
                  { key: 'flash', text: 'flash' },
                  { key: 'pulse', text: 'pulse' },
                  { key: 'rubberBand', text: 'rubberBand' },
                  { key: 'shake', text: 'shake' },
                  { key: 'swing', text: 'swing' },
                  { key: 'wobble', text: 'wobble' },
                  { key: 'jello', text: 'jello' },
                  { key: 'tada', text: 'tada' }
                  ]
                }),
                PropertyPaneChoiceGroup('HeaderAnimationLoop', {
                  label: "Animate Infinite?",
                  options: [{ key: "infinite", text: "Infinite" },
                  { key: "none", text: 'None' }
                  ]
                }),
                PropertyPaneSlider('HeaderAnimationDelay', {
                  label: "Delay animate in sec",
                  min: 1,
                  max: 10,
                  step: 1,
                  showValue: true
                }),
                PropertyPaneChoiceGroup('HeaderAnimationDuration', {
                  label: "Duration of animation in sec:",
                  options: [{ key: "slower", text: "slower" },
                  { key: 'slow', text: 'slow' },
                  { key: 'fast', text: 'fast' },
                  { key: 'faster', text: 'faster' }
                  ]
                })               
              ]
            }
          ]
        },
        {
          header: {
            description: "Animate CSS Demo"
          },
          groups: [
            {
              groupName: "Organism Card Animation",
              groupFields: [
                PropertyPaneDropdown("CardLoad",
                  {
                    label: "Animation while loading organisms card deck:",
                    selectedKey: "fadeInDown",
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
                  }
                ),
                PropertyPaneChoiceGroup('CardImage', {
                  label: "MouseOver animation on Card Image:",
                  options: [{ key: "bounce", text: "bounce" },
                  { key: 'flash', text: 'flash' },
                  { key: 'pulse', text: 'pulse' },
                  { key: 'rubberBand', text: 'rubberBand' },
                  { key: 'shake', text: 'shake' },
                  { key: 'swing', text: 'swing' },
                  { key: 'wobble', text: 'wobble' },
                  { key: 'jello', text: 'jello' },
                  { key: 'tada', text: 'tada' }
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
