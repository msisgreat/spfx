import { sp, List, IItemAddResult } from '@pnp/sp/presets/all';
import {ISpfxSmartwizard3WpWebPartProps} from './SpfxSmartwizard3WpWebPart';


export default class OrganismClass{
    public static webUrl:string = "";
public static templateHtml: string  =
`
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
    ` ;

    public static InitialiseControls(props:ISpfxSmartwizard3WpWebPartProps)
    {
        $('#header2').click(() => {
            //console.log("2 click");
            let col: any = $('#collapseTwo');
            col.collapse('toggle');
        });
        $('#header1').click(() => {
            //console.log("1 click");
            let col: any = $('#collapseOne');
            col.collapse('toggle');
            //$('#collapseOne').collapse('toggle');
        });

        let smartwiz: any = $("#smartwizard");        
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

        $("#smartwizard").on("showStep", (e, anchorObject, stepNumber, stepDirection)=> {
            if(stepNumber==2)
            {
                let value: any = $("#uploadedPicPath").val();
                $("#orgPreviewPic").attr("src",value);
                value = $("#orgName").val();
                $("#orgPreviewName").text(value);
                value = $("#orgSciName").val();
                $("#orgPreviewSciName").text(value);
                value = $("#orgFamily").val();
                $("#orgPreviewFamily").text(value);
                value = $("#orgOrder").val();
                $("#orgPreviewOrder").text(value);
            }
            else if(stepNumber==3)
            {
                let value: any = $("#uploadedPicPath").val();
                $("#imgSummaryPic").attr("src",value);
                value = $("#orgName").val();
                $("#orgSummaryName").val(value);
                value = $("#orgSciName").val();
                $("#orgSummarySciName").val(value);
                value = $("#orgFamily").val();
                $("#orgSummaryFamily").val(value);
                value = $("#orgOrder").val();
                $("#orgSummaryOrder").val(value);

                value = $("#orgGenus").val();
                $("#orgSummaryGenus").val(value);
                value = $("#orgSpecies").val();
                $("#orgSummarySpecies").val(value);

                value = $("#orgDesc").val();
                $("#orgSummaryDesc").val(value);
            }
        });

        $(".custom-file-input").on("change", function() {
            let value: any =$(this).val();
            var fileName = value.split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
          });

        $("#uploadPic").click(()=>{
            OrganismClass.UploadPicture();
        });

        $("#submitOrg").click(() => {
            console.log("calling clicking ...");
            OrganismClass.Submit();
        });
    }

    public static UploadPicture()
    {
        let filesInput:any  = document.getElementById('customFile');
        var files = filesInput.files;
        var file = files[0];
        sp.web.getFolderByServerRelativeUrl("/siteassets")
        .files.add(file.name, file, true)
        .then((result)=>{
            $("#uploadedPicPath").val(OrganismClass.webUrl +  result.data.ServerRelativeUrl);
        });
    }
    public static Submit(){
        sp.web.lists.getByTitle("Organisms").items.add({
            Title: $("#orgName").val(),
            Description: $("#orgDesc").val(),
            Genus: $("#orgGenus").val(),
            Species: $("#orgSpecies").val(),
            Family: $("#orgFamily").val(),
            Order0: $("#orgOrder").val(),
            Scientific_x0020_Name: $("#orgSciName").val(),
            Organism_x0020_Picture: {
                Description:"Organism Picture",
                Url:$("#uploadedPicPath").val()
            }
        }).then((iar:IItemAddResult)=>{
            alert("Successfully added Organism: "+ iar.data.Title);
        });
    }

}