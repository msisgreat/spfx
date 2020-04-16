import { Version } from '@microsoft/sp-core-library';
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

import styles from './SpfxSmartwizard2WpWebPart.module.scss';
import * as strings from 'SpfxSmartwizard2WpWebPartStrings';

export interface ISpfxSmartwizard2WpWebPartProps {
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

export default class SpfxSmartwizard2WpWebPart extends BaseClientSideWebPart<ISpfxSmartwizard2WpWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <div class="container">
    <div class="row">           
        <div id="animals-card" class="">
            <div id="smartwizard">
                <ul>
                    <li><a href="#step-1">Organism - Page1<br /><small>Basic details</small></a></li>
                    <li><a href="#step-2">Organism - Page2<br /><small>Additional details</small></a></li>
                    <li><a href="#step-3">Preview<br /><small>Preview Organism Card</small></a></li>
                    <li><a href="#step-4">Summary<br /><small>Confirm & Submit</small></a></li>                    
                </ul>        
                <div>
                    <div id="step-1" class="">
                        <h4>Organism - Basic Details</h4>
                        <div class="form">                        
                            <div class="form-group">
                                <label for="orgName">Common Name:</label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-paw fa-lg"></i></span>
                                    </div>
                                    <input type="text" id="orgName" class="form-control" placeholder="Organism name here">
                                </div>
                            </div><!-- common name -->
                            <div class="form-group">
                                <label for="orgSciName">Scientific Name:</label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-dna fa-lg"></i></span>
                                    </div>
                                    <input type="text" id="orgSciName" class="form-control" placeholder="Organisn scientific name">
                                </div>
                            </div><!-- scientific name -->                           
                            <div class="form-group">
                                <label>Family Name & Order:</label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-sitemap fa-lg"></i></span>
                                    </div>
                                    <input id="orgFamily" type="text" class="form-control" placeholder="Family">
                                    <input id="orgOrder" type="text" class="form-control" placeholder="Order">
                                </div>
                            </div><!-- family order name -->
                            <div class="form-group">
                                <label>Genus & Species Name:</label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-venus-mars"></i></span>
                                    </div>
                                    <input id="orgGenus" type="text" class="form-control" placeholder="Genus Name">
                                    <input id="orgSpecies" type="text" class="form-control" placeholder="Species Name">
                                </div>
                            </div><!-- genus species name -->
                        </div> <!-- form end -->
                    </div>
                    <div id="step-2" class="">
                        <h4>Organism - Additional details</h4>
                            <div class="form">
                                <div class="form-group">
                                    <label for="orgDesc">Description:</label>
                                    <textarea class="form-control" rows="5" id="orgDesc"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="orgDesc">Picture:</label>
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="customFile">
                                        <label class="custom-file-label" for="customFile">Choose Organism file</label>
                                    </div>
                                    <div class="input-group mb-3">
                                        <input id="uploadedPicPath" type="text" readonly class="form-control" placeholder="Select file above and click on upload...">
                                        <div class="input-group-append">
                                            <div id="uploadPic" class="btn btn-success">Upload Picture</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>  
                    <div id="step-3" class="">
                        <h4>Preview Organism as card</h4>
                        <div id="animalCard" class="container">
                            <div class="card" style="width:300px">
                                <img class="card-img-bottom" id="orgPreviewPic" src="https://msisgrt.sharepoint.com/SiteAssets/msisgreat_163x163.png" alt="Card image">
                                <div class="card-body">
                                <div class='row'>                
                                    <div class="col"><h5 id="orgPreviewName"></h5></div>
                                </div>
                                <div class='row'>
                                    <div class="col-md-6">Scientific Name:</div>
                                    <div class="col text-left" id="orgPreviewSciName"></div>
                                </div>
                                <div class='row'>
                                    <div class="col-md-6">Family:</div>
                                    <div class="col text-left" id="orgPreviewFamily"></div>
                                </div>
                                <div class='row'>
                                    <div class="col-md-6">Order:</div>
                                    <div class="col text-left" id="orgPreviewOrder"></div>
                                    </div>       
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="step-4" class="">
                        <h4>Summary of the Organism details</h4>
                        <div id="accordion">
                            <div class="card">
                                <div class="card-header">
                                    <div id="header1" class="btn-link" data-toggle="collapse" data-target="#collapseOne">
                                        Basic Details
                                    </div>
                                </div>
                                <div id="collapseOne" class="collapse show" data-parent="#accordion">
                                    <div class="card-body">
                                        <div class="input-group mb-3 input-group-sm">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Name</span>
                                            </div>
                                            <input id="orgSummaryName" readonly="true" type="text" text="Tiger" class="form-control">
                                        </div>
                                        <div class="input-group mb-3 input-group-sm">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Scientic Name</span>
                                            </div>
                                            <input id="orgSummarySciName" readonly="true" type="text" text="Panthera Tigris" class="form-control">
                                        </div>                                       
                                        <div class="form-group">                                            
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">Family & Order</span>
                                                </div>
                                                <input id="orgSummaryFamily" type="text" class="form-control" readonly placeholder="Family">
                                                <input id="orgSummaryOrder" type="text" class="form-control" readonly placeholder="Order">
                                            </div>
                                        </div><!-- family order name -->
                                        <div class="form-group">                                            
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">Genus & Species</span>
                                                </div>
                                                <input id="orgSummaryGenus" type="text" class="form-control" readonly placeholder="Species">
                                                <input id="orgSummarySpecies" type="text" class="form-control" readonly placeholder="Genus">
                                            </div>
                                        </div><!-- species order genus -->
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header">
                                    <div id="header2" class="collapsed btn-link" data-toggle="collapse" data-target="#collapseTwo">
                                        Additional Details
                                    </div>
                                </div>
                                <div id="collapseTwo" class="collapse" data-parent="#accordion">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label for="orgDesc">Description:</label>
                                            <textarea readonly class="form-control" rows="5" id="orgSummaryDesc"></textarea>
                                        </div>
                                        <div class="" style="width:350px;">
                                        <img id="imgSummaryPic" class="card-img-top" src="[SSRC]" alt="organism picture">
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div id="submitOrg" class="btn btn-success">Submit Organism </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                   
                </div>
            </div>
        </div>
    </div>
</div>
    `;
    $(document).ready(() => {
      let smartwiz: any = $("#smartwizard");

      let props: ISpfxSmartwizard2WpWebPartProps = this.properties;
      smartwiz.smartWizard({
        keyNavigation: props.keyNavigation, // Enable/Disable keyboard navigation(left and right keys are used if enabled)
        autoAdjustHeight: props.autoAdjustHeight, // Automatically adjust content height
        cycleSteps: props.cycleSteps, // Allows to cycle the navigation of steps
        backButtonSupport: props.backButtonSupport, // Enable the back button support
        useURLhash: props.useURLhash, // Enable selection of the step based on url hash
        lang: {  // Language variables
          next: props.btn_next,
          previous: props.btn_previous
        },
        toolbarSettings: {
          toolbarPosition: props.tb_toolbarPosition, // none, top, bottom, both
          toolbarButtonPosition: props.tb_toolbarButtonPosition, // left, right
          showNextButton: props.tb_showNextButton, // show/hide a Next button
          showPreviousButton: props.tb_showPreviousButton, // show/hide a Previous button                },
        },
        theme: props.theme,
        transitionEffect: props.transitionEffect, // Effect on navigation, none/slide/fade
        transitionSpeed: props.transitionSpeed
      });
    });
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
