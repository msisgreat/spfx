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

import styles from './SpfxSmartwizard3WpWebPart.module.scss';
import * as strings from 'SpfxSmartwizard3WpWebPartStrings';
import orgHtml from './animalWizardHtml';

export interface ISpfxSmartwizard3WpWebPartProps {
  keyNavigation: boolean;
  autoAdjustHeight: boolean;
  cycleSteps: boolean;
  backButtonSupport: boolean;
  useURLhash: boolean;
  showStepURLhash: boolean;
  theme: string;
  transitionEffect: string;
  transitionSpeed: number;
  tb_toolbarPosition: string;
  tb_toolbarButtonPosition: string;
  tb_showNextButton: boolean;
  tb_showPreviousButton: boolean;
  btn_next: string;
  btn_previous: string;
}

import * as $ from "jquery";
//import * as bootstrap from "bootstrap";
require("bootstrap");
require('../../../node_modules/smartwizard/dist/css/smart_wizard.min.css');
require('../../../node_modules/smartwizard/dist/css/smart_wizard_theme_arrows.min.css');
require('../../../node_modules/smartwizard/dist/css/smart_wizard_theme_circles.min.css');
require('../../../node_modules/smartwizard/dist/css/smart_wizard_theme_dots.min.css');
require("smartwizard");
require('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css');

export default class SpfxSmartwizard3WpWebPart extends BaseClientSideWebPart<ISpfxSmartwizard3WpWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = orgHtml.templateHtml;
    orgHtml.webUrl = this.context.pageContext.web.absoluteUrl;
    $(document).ready(() => {
      orgHtml.InitialiseControls(this.properties);
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  protected get disableReactivePropertyChanges(): boolean {
    return true;
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
            description: "Smart Wizard"
          },
          groups: [
            {
              groupName: "Basic Settings",
              groupFields: [
                PropertyPaneCheckbox('keyNavigation', {
                  text: "Enable Keyboard Navigation"
                }),
                PropertyPaneCheckbox('autoAdjustHeight', {
                  text: "Auto adjust the content height"
                }),
                PropertyPaneCheckbox('cycleSteps', {
                  text: "Allows to cycle the navigation of steps"
                }),
                PropertyPaneCheckbox('backButtonSupport', {
                  text: "Enable the back button support",
                  checked: true
                }),
                PropertyPaneCheckbox('useURLhash', {
                  text: "Enable selection of the step based on url hash",
                  checked: true
                }),
                PropertyPaneCheckbox('showStepURLhash', {
                  text: "Show url hash based on step",
                  checked: true
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneChoiceGroup('theme', {
                  label: "Choose the theme:",
                  options: [{ key: "default", text: "default" },
                  { key: 'arrows', text: 'arrows' },
                  { key: 'circles', text: 'circles' },
                  { key: 'dots', text: 'dots' }
                  ]
                }),
                PropertyPaneDropdown("transitionEffect",
                  {
                    label: "Next & Back Transition effect:",
                    selectedKey: "none",
                    options: [
                      { key: "none", text: "none" },
                      { key: "slide", text: "slide" },
                      { key: "fade", text: "fade" }
                    ]
                  }
                ),
                PropertyPaneSlider('transitionSpeed', {
                  label: "Item count to show",
                  min: 200,
                  max: 2000,
                  step: 100,
                  showValue: true
                })
              ]
            }
          ]
        },
        {
          header: {
            description: "Smartwizard"
          },
          groups: [
            {
              groupName: "Toolbar Settings",
              groupFields: [
                PropertyPaneCheckbox('tb_showNextButton', {
                  text: "Show/Hide Next Button"
                }),
                PropertyPaneCheckbox('tb_showPreviousButton', {
                  text: "Show/Hide Back Button"
                }),
                PropertyPaneDropdown("tb_toolbarPosition",
                  {
                    label: "Toolbar Position:",
                    selectedKey: "bottom",
                    options: [
                      { key: "none", text: "none" },
                      { key: "top", text: "top" },
                      { key: "bottom", text: "bottom" },
                      { key: "both", text: "both" }
                    ]
                  }
                ),
                PropertyPaneChoiceGroup('tb_toolbarButtonPosition', {
                  label: "Toolbar button position:",
                  options: [{ key: "left", text: "left" },
                  { key: "right", text: 'right' }]
                }),
                PropertyPaneTextField('btn_next', {
                  label: "Toolbar button position:"
                }),
                PropertyPaneTextField('btn_previous', {
                  label: "Toolbar button position:"
                })
              ]
            }
          ]
        }

      ]
    };
  }
}
