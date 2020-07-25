import {
    MSGraphClient
  } from '@microsoft/sp-http';
  import teamCreate from "./TeamsCreate";
  
  export default class TeamsManageClass {
    public static graphClient: any = null;
    private static TeamsById = {};
    private static TeamsJoined = {};
    private static TeamsGroupById = {};
    private static myId: string = "";
    public static templateHtml: string = `
    <div>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <div class="navbar-brand">
            <i class="fab fa-windows fa-1x"></i>
        </div>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Teams Management <span class="sr-only">(current)</span></a>
                </li>
            </ul>
            <!--<ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <div class="form-inline">
                        <input class="form-control mr-sm-2" type="text" placeholder="Search">
                        <div class="btn btn-success" type="submit">Search</div>
                    </div>
                </li>
            </ul>-->
        </div>
    </nav>
    <!-- Tab Control starts here -->
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#home">
                <span><i class="fas fa-users fa-1x"></i></span> &nbsp;Get Teams
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#menu1">
                <span><i class="fas fa-user-plus fa-1x"></i></span>&nbsp;Create Teams
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#menu2">
                <span><i class="fas fa-comments fa-1x"></i></span>&nbsp;Create Channel
            </a>
        </li>
        <!--<li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#menu3">
                <span><i class="fas fa-user-times fa-1x"></i></span>&nbsp;Delete Teams / Channel
            </a>
        </li>-->
    </ul>
    <!-- Tab panes -->
    <div class="tab-content bg-light" style="padding:20px 0px 20px 5px;">
        <div class="tab-pane container-fluid active" id="home">
            <div class="row">
                <div class="col-md-3">
                    <div class="row">
                        <div class="col btn btn-info" id="getAllTeams">Get All Teams</div>
                    </div>
                    <div class="row">
                        <div style="padding-right:0px;margin-top:5px;" class="col list-group" id="allTL">
  
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div style="width:100%;height:100%;display:none;" class="card animated fadeIn" id="teamCard">
                        <div class="card-header" id="teamHeader"></div>
                        <div class="card-body" id="teamBody">
                            <p id="card-teamDesc" class=""></p>
                            <div class="card-columns">
                                <div class="card">
                                    <!-- card general -->
                                    <div class="card-body">
                                        <h5 class="card-title">General Settings</h5>
                                        <div class="input-group mb-3 input-group-sm">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text text-info"><i
                                                        class="far fa-id-badge fa-lg"></i></span>
                                            </div>
                                            <input id="card-teamId" type="text" readonly class="form-control"
                                                placeholder="teams id">
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" disabled class="custom-control-input"
                                                id="card-archived">
                                            <label class="custom-control-label" >isArchived</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" disabled class="custom-control-input"
                                                id="card-search">
                                            <label class="custom-control-label"
                                                >showInTeamsSearchAnd Suggestions</label>
                                        </div>
                                        <div class="input-group mb-3 input-group-sm">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text text-info"><i
                                                        class="fas fa-link fa-lg"></i></span>
                                            </div>
                                            <input type="text" class="form-control" readonly id="card-webUrlTxt">
                                            <div class="input-group-append">
                                                <span class="input-group-text"><a id="card-webUrl" target="_blank"
                                                        href="#"><i
                                                            class="fas fa-external-link-alt fa-lg"></i></a></span>
                                            </div>
                                        </div>
                                        <div class="input-group mb-3 input-group-sm">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="card-teamVisibilityIcon"></span>
                                            </div>
                                            <input id="card-teamVisibility" type="text" readonly class="form-control"
                                                placeholder="public/private">
                                            <div class="input-group-append">
                                                <span class="input-group-text">Visibility</span>
                                            </div>
                                        </div>
                                    </div>
                                </div> <!-- card general end -->
                                <!--col end -->
                                <div class="card">
                                    <!-- card message -->
                                    <div class="card-body">
                                        <h5 class="card-title">Messaging Settings</h5>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" disabled class="custom-control-input"
                                                id="card-aMsgEdit">
                                            <label class="custom-control-label"
                                                >allowUserEditMessages</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" disabled class="custom-control-input"
                                                id="card-aMsgDelete">
                                            <label class="custom-control-label"
                                                >allowUserDeleteMessages</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" disabled class="custom-control-input"
                                                id="card-aMsgOwnerDelete">
                                            <label class="custom-control-label"
                                                >allowOwnerDeleteMessages</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" disabled class="custom-control-input"
                                                id="card-aMsgTeamMention">
                                            <label class="custom-control-label"
                                                >allowTeamMentions</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" disabled class="custom-control-input"
                                                id="card-aMsgCMention">
                                            <label class="custom-control-label"
                                                >allowChannelMentions</label>
                                        </div>
                                    </div>
                                </div> <!-- card message end -->
                                <!--col end -->
                                <div class="card">
                                    <!-- card guest -->
                                    <div class="card-body">
                                        <h5 class="card-title">Guest Settings</h5>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" disabled class="custom-control-input"
                                                id="card-aGuestEditChannel">
                                            <label class="custom-control-label"
                                                >allowCreateUpdateChannels</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" disabled class="custom-control-input"
                                                id="card-aGuestDeleteChannel">
                                            <label class="custom-control-label"
                                                >allowDeleteChannels</label>
                                        </div>
                                    </div>
                                </div> <!-- card guest end -->                            
                                <div class="card">
                                    <!-- card fun -->
                                    <div class="card-body">
                                        <h5 class="card-title">Fun Settings</h5>
                                        <div class="form-inline">                                                                                      
                                            <label for="card-fContentRating">Content Rating:</label>
                                            <input style="width:100px;height:30px;margin:0px 0px 0px 10px;" id="card-fContentRating" type="text" readonly class="form-control"
                                                placeholder="content rating">                                             
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" disabled class="custom-control-input"
                                                id="card-fGiphy">
                                            <label class="custom-control-label" >allowGiphy</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" disabled class="custom-control-input"
                                                id="card-fStickers">
                                            <label class="custom-control-label"
                                                >allowStickersAndMemes</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" disabled class="custom-control-input"
                                                id="card-fMemes">
                                            <label class="custom-control-label"
                                                >allowCustomMemes</label>
                                        </div>
                                    </div>
                                </div> <!-- card fun end -->
  
                                <div class="card">
                                    <!-- card mem -->
                                    <div class=" card-body">
                                        <h5 class="card-title">Member Setings</h5>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" disabled class="custom-control-input"
                                                id="card-aCreateChannel">
                                            <label class="custom-control-label"
                                                >allowCreateUpdateChannels</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" disabled class="custom-control-input"
                                                id="card-aDeleteChannel">
                                            <label class="custom-control-label"
                                                >allowDeleteChannels</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" disabled class="custom-control-input"
                                                id="card-aApps">
                                            <label class="custom-control-label"
                                                >allowAddRemoveApps</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" disabled class="custom-control-input"
                                                id="card-aTabs">
                                            <label class="custom-control-label"
                                                >allowCreateUpdateRemoveTabs</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" disabled class="custom-control-input"
                                                id="card-aConnectors">
                                            <label class="custom-control-label"
                                                >allowCreateUpdateRemove Connectors</label>
                                        </div>
  
                                    </div>
                                </div> <!-- card mem end -->
  
                                <!--col end -->
                            </div>
                            <!--end card columns-->
                            <div class="row">
                                <div style="margin-bottom:5px;" class="col-md-12">
                                    <div style="min-height:260px;" class="card">
                                        <!-- card others -->
                                        <div class="card-body">
                                            <h5 class="card-title">Channels</h5>
                                            <table class="table table-bordered table-striped table-sm">
                                                <thead class="thead-dark">
                                                    <tr>
                                                        <!--<th>ID</th>-->
                                                        <th>Name</th>
                                                        <th>Description</th>
                                                        <th>Link</th>
                                                        <th>File/Folder</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="cardTeamChannels">
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> <!-- card others end -->
                                </div>
                                <!--col end -->
                            </div>
                            <!--row end -->
                        </div>
                        <!--card body-->
                    </div><!-- col -->
                </div><!-- row --end -->
            </div>
        </div>
        <!--tabpane container-->
        <div class="tab-pane container-fluid fade" id="menu1">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Create Team</h4>
              <p>Using the beta api <a target="_blank" href="https://docs.microsoft.com/en-us/graph/api/team-post?view=graph-rest-beta&tabs=http">Create Team</a></p>
              <!--<p>Using API v1.0 <a target="_blank" href='https://docs.microsoft.com/en-us/graph/api/team-put-teams?view=graph-rest-1.0&tabs=http'>Create Team</a> In order to create a team, the <b>M365 group</b> must be created first.The group created must have a least one owner. In this case you are the Owner.<br/>
              If the group was created less than 15 minutes ago, it's possible for the Create team call to fail with a 404 error code due to replication delays. The recommended pattern is to retry the Create team call three times, with a 10 second delay between calls.</p>-->
              
  
              <div class="card bg-secondary"><div class="card-body">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-user"></i> &nbsp; Name</span>
                  </div>
                  <input type="text" id="create-teamName" class="form-control">
                </div>
  
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-server"></i> &nbsp;Description</span>
                  </div>
                  <input id="create-teamDesc" type="text" class="form-control">
                </div>             
                <div class="form-inline">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-user-lock fa-lg"></i> &nbsp;Visibility</span>
                      </div>
                      <select name="create-Visibility" id="create-Visibility" class="custom-select">
                        <option value="public" selected>Public</option>
                        <option value="private">Private</option>                     
                      </select>        
                    </div>
                  <!--<div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <input id="create-mailEnabled" type="checkbox">
                      </div>
                    </div>
                    <span class="input-group-text">Mail Enabled Group</span>
                  </div>
  
                  <div style="margin-left:20px;" class="input-group mb-3">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <input id="create-secEnabled" type="checkbox">
                      </div>
                    </div>
                    <span class="input-group-text">Security Enabled Group</span>
                  </div>-->
  
                 
                </div>
                <!--
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-users fa-lg"></i> &nbsp;Select Group</span>
                  </div>
                  <select name="groupList" id="groupList" class="custom-select">
                    <option value="0" selected>None</option>              
                  </select>
                  <div class="input-group-append">
                     <div class="btn btn-outline-info" id="getGroupList">Load Groups To Create Teams <span style="display:none;" id="ico-load" class="spinner-border spinner-border-sm"></span></div>
                  </div>     
                 </div>--> <!-- input -->
              </div></div> <!-- first group card -->          
              <!-- all settings are here -->
              <div style="margin-top:20px;" class="card-columns">
                  <div class="card bg-light">
                      <!-- card message -->
                      <div class="card-body">
                          <h5 class="card-title"><i class="fas fa-comments"></i> &nbsp;Messaging Settings</h5>
                          <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="create-aMsgEdit">
                              <label class="custom-control-label" for="create-aMsgEdit" >allowUserEditMessages</label>
                          </div>
                          <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="create-aMsgDelete">
                              <label class="custom-control-label" for="create-aMsgDelete" >allowUserDeleteMessages</label>
                          </div>
                          <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="create-aMsgOwnerDelete">
                              <label class="custom-control-label" for="create-aMsgOwnerDelete">allowOwnerDeleteMessages</label>
                          </div>
                          <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="create-aMsgTeamMention">
                              <label class="custom-control-label" for="create-aMsgTeamMention">allowTeamMentions</label>
                          </div>
                          <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="create-aMsgCMention">
                              <label class="custom-control-label" for="create-aMsgCMention">allowChannelMentions</label>
                          </div>
                      </div>
                  </div> <!-- card message end -->
                  <!--col end -->
                  <div class="card bg-light">
                      <!-- card guest -->
                      <div class="card-body">
                          <h5 class="card-title"><i class="fas fa-user-tie"></i> &nbsp;Guest Settings</h5>
                          <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="create-aGuestEditChannel">
                              <label class="custom-control-label" for="create-aGuestEditChannel">allowCreateUpdateChannels</label>
                          </div>
                          <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="create-aGuestDeleteChannel">
                              <label class="custom-control-label" for="create-aGuestDeleteChannel">allowDeleteChannels</label>
                          </div>
                      </div>
                  </div> <!-- card guest end -->
                  <div class="card bg-light">
                      <!-- card fun -->
                      <div class="card-body">
                          <h5 class="card-title"><i class="fas fa-icons"></i> &nbsp;Fun Settings</h5>
                          <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                  <span class="input-group-text"><i class="fas fa-star-half-alt fa-lg"></i> &nbsp;Giphy Content
                                      Rating</span>
                              </div>
                              <select name="giphyRating" id="create-giphyRating" class="custom-select">
                                  <option value="strict" selected>Strict</option>
                                  <option value="moderate">Moderate</option>
                              </select>
                          </div>
                          <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="create-fGiphy">
                              <label class="custom-control-label" for="create-fGiphy">allowGiphy</label>
                          </div>
                          <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="create-fStickers">
                              <label class="custom-control-label" for="create-fStickers">allowStickersAndMemes</label>
                          </div>
                          <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="create-fMemes">
                              <label class="custom-control-label" for="create-fMemes" >allowCustomMemes</label>
                          </div>
                      </div>
                  </div> <!-- card fun end -->
  
                  <div class="card bg-light">
                      <!-- card mem -->
                      <div class=" card-body">
                          <h5 class="card-title"><i class="fas fa-user-edit"></i> &nbsp;Member Setings</h5>
                          <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="create-aCreateChannel">
                              <label class="custom-control-label" for="create-aCreateChannel" >allowCreateUpdateChannels</label>
                          </div>
                          <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="create-aDeleteChannel">
                              <label class="custom-control-label" for="create-aDeleteChannel" >allowDeleteChannels</label>
                          </div>
                          <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="create-aApps">
                              <label class="custom-control-label" for="create-aApps" >allowAddRemoveApps</label>
                          </div>
                          <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="create-aTabs">
                              <label class="custom-control-label" for="create-aTabs">allowCreateUpdateRemoveTabs</label>
                          </div>
                          <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="create-aConnectors" name="memsettings">
                              <label class="custom-control-label" for="create-aConnectors">allowCreateUpdateRemove Connectors</label>
                          </div>
  
                      </div>
                  </div> <!-- card mem end -->
  
                  <!--col end -->
              </div>
              <!--end card columns-->
              <!-- all settings end -->               
          </div><!-- end card body -->
          <div class="card-footer">
              <div class="row">
                <div class="col-md-9">
                  <div id="create-statusText"></div>
                </div>             
                <div class="col-md-3 text-right">
                  <div disabled id="createGroupTeam" class="btn btn-outline-info">Create Group & Team <span style="display:none;" id="create-icoLoading" class="spinner-border spinner-border-sm"></span></div>
                </div>        
              </div> <!-- card footer row -->
          </div> <!-- card footer -->
        </div> <!-- end of card -->    
      </div><!-- end of tab -->
    <div class="tab-pane container-fluid fade" id="menu2">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Create Channel</h4>
                <p>Using the beta api <a target="_blank"
                        href="https://docs.microsoft.com/en-us/graph/api/channel-post?view=graph-rest-beta&tabs=http">Create
                        Channel</a></p>
                <div class="card bg-secondary">
                    <div class="card-body">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-users fa-lg"></i> &nbsp;Select Teams Name</span>
                            </div>
                            <select name="chn-teamsList" id="chn-teamsList" class="custom-select">
                                <option value="0" selected>None</option>
                            </select>
                            <div class="input-group-append">
                                <div class="btn btn-warning" id="getAllTeams"><i class="fas fa-sync-alt"></i> &nbsp; Refresh List <span style="display:none;"
                                        id="ico-load" class="spinner-border spinner-border-sm"></span></div>
                            </div>
                        </div>                     
                        <div class="form-inline">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-user-lock fa-lg"></i>
                                        &nbsp;Membership Type</span>
                                </div>
                                <select name="create-chnMemType" id="create-chnMemType" class="custom-select">
                                    <option value="Standard" selected>Standard</option>
                                    <option value="Private">Private</option>
                                </select>
                            </div> <!-- memtype -->
                            <div style="margin-left:10px;" class="input-group mb-3">
                              <div class="input-group-prepend">
                                <div class="input-group-text">
                                  <input id="create-chnFav" type="checkbox">
                                </div>
                              </div>
                              <span class="input-group-text">isFavoriteByDefault</span>
                            </div>
                            <!--
                            <div style="margin-left:10px;" class="input-group mb-3">
                              <div class="input-group-prepend">
                                <div class="input-group-text">
                                  <input id="create-chnBots" type="checkbox">
                                </div>
                              </div>
                              <span class="input-group-text">allowNewMessageFromBots</span>
                            </div>
          
                          <div style="margin-left:10px;" class="input-group mb-3">
                            <div class="input-group-prepend">
                              <div class="input-group-text">
                                <input id="create-chnConnectors" type="checkbox">
                              </div>
                            </div>
                            <span class="input-group-text">allowNewMessageFromConnectors</span>
                          </div>-->
  
                        </div><!-- form inline -->
                        <div class="card">
                            <div class="card-header"><h5 class="card-title">
                                <div class="form-check">
                                  <label class="form-check-label">
                                    <input type="radio" class="form-check-input" id="optSingleChn" name="optradio">Create Single Channel
                                  </label>
                                </div></h5></div><!-- card head -->
                            <div class="card-body">                            
                              <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-user"></i> &nbsp; Channel Name</span>
                                </div>
                                <input type="text" required maxlength="50" id="create-chnName" class="form-control">
                              </div>
  
                              <div class="input-group mb-3">
                                  <div class="input-group-prepend">
                                      <span class="input-group-text"><i class="fas fa-server"></i> &nbsp;Channel Description</span>
                                  </div>
                                  <input id="create-chnDesc" type="text" class="form-control">
                              </div>
                          </div> <!-- card body -->
                      </div> <!-- card -->
                      <hr/>
                      <div class="card">
                            <div class="card-header"><h5 class="card-title">
                                <div class="form-check">
                                  <label class="form-check-label">
                                    <input type="radio" id="optMultipleChn" class="form-check-input" name="optradio">Create Multiple Channel
                                  </label>
                                </div></h5></div><!-- card head -->
                            <div class="card-body">        
                              <div class="custom-file">
                                <input type="file" class="custom-file-input" accept=".csv" id="customFile">
                                <label class="custom-file-label" for="customFile">Choose file</label>
                              </div>
                              <hr/>
                              <div class="row">
                                <div class="col-md-6">
                                </div>
                                <div class="col-md-6 text-right">
                                    <div class="btn btn-info" id="parseCSVFile">Parse File</div>
                                </div>
                              </div>
                              <div id="csvTable" >
                                <h5></h5>
                                <p>Create a csv file with 2 columns.First column use for channel name and second column for channel description. Do not add column header.Select the file using the Browse button. After selecting the file click on 'Parse File' button to load the table below</p>
                                <div style="max-height:400px;overflow-y:auto;margin-top:10px;">
                                    <table class="table table-sm table-striped">
                                      <thead class="thead-dark">
                                        <tr>
                                          <th>Name</th>
                                          <th>Description</th>                                  
                                        </tr>
                                      </thead>
                                      <tbody id="tableCSV"></tbody>
                                    </table>
                                </div> <!-- scroll table -->
                            </div> <!--table -->
                             
                          </div> <!-- multiple card body -->
                      </div> <!-- multiple choice card -->
                    </div>
                </div> <!-- main section card -->
            </div><!-- end card body -->
            <div class="card-footer">
                <div class="row">
                    <div class="col-md-9">
                        <div style="max-height:200px;overflow-y:auto;" id="create-chn-statusText"></div>
                    </div>
                    <div class="col-md-3 text-right">
                        <div id="createChannel" class="btn btn-outline-primary">Create Channel<span
                                style="display:none;" id="create-chn-icoLoading" class="spinner-border spinner-border-sm"></span>
                        </div>
                    </div>
                </div> <!-- card footer row -->
            </div> <!-- card footer -->
          </div> <!-- end of card -->
          
    </div>
    <!--<div class="tab-pane container-fluid fade" id="menu3">
  
    </div>-->
    </div>
  </div>
  </div>
            `;
    public static InitialiseControls(client) {
      $(".btn").click((e) => {
        console.log(e.currentTarget);
        var idText = e.currentTarget.id;
        switch (idText) {
          case "getTeams":
  
            break;
          case "getAllTeams":
            TeamsManageClass.GetAllTeams();
            break;
          case "getGroupList":
            TeamsManageClass.GetGroupList();
            break;
          case "createGroupTeam":
            teamCreate.CreateTeam(); 
            break;
          case "createChannel":
            teamCreate.CreateChannel(); 
            break;
        }
      });
  
      $(".custom-file-input").on("change", () => {
        console.log("file selection ...");
        let fileName: any = $("#customFile").val();
        fileName = fileName.split("\\").pop();
        console.log(fileName);
        $("#customFile").siblings(".custom-file-label").addClass("selected").html(fileName);
        console.log("done:" + fileName);
      });
      this.ParseCSV();
      TeamsManageClass.graphClient = client;
      teamCreate.InitialiseControls(client); 
      TeamsManageClass.GetMyGUID();
    }
  
    private static ParseCSV() {
      //$("#tableCSV").empty();
      $("#parseCSVFile").bind("click", () => {
        $("#tableCSV").empty();
        console.log("Parsing csv ...");
        teamCreate.csvRows = new Map; 
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        let fileName: any = $("#customFile").val();
        console.log("Parsing csv ..." + fileName);
        if (regex.test(fileName.toLowerCase())) {
          if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = (e) => {
              console.log("reading csv ..." + fileName);
              var table = $("#tableCSV");
              let target: any = e.target;
              let result: any = target.result;
              var rows = result.split("\n");
              for (var i = 0; i < rows.length - 1; i++) {
                var row = $("<tr />");
                let rowName = "row" + i;
                teamCreate.csvRows.set(rowName, []); 
                var cells = rows[i].split(",");
                for (var j = 0; j < cells.length; j++) {
                  var cell = $("<td />");
                  cell.html(cells[j]);
                  row.append(cell);
                  teamCreate.csvRows.get(rowName).push(cells[j]); 
                }
                table.append(row);
              }
              console.log("completed reading ...");
              //console.log(teamCreate.csvRows);
              //$("#csvTable").html('');
              //$("#csvTable").append(table);
            };
            let fileControl: any = $("#customFile")[0];
            reader.readAsText(fileControl.files[0]);
          } else {
            alert("This browser does not support HTML5.");
          }
        } else {
          alert("Please upload a valid CSV file.");
        }
      });
    }
    private static GetMyGUID() {
      try {
        //$("#jtl").empty();
        TeamsManageClass.graphClient
          .getClient()
          .then((client: MSGraphClient): void => {
            client
              .api('/me')
              .get((error, myDetail: any, rawResponse ? : any) => {
                console.log(myDetail);
                if (myDetail) {
                  this.myId = myDetail.id;
                  teamCreate.myUserId = myDetail.id; 
                  //console.log("My GUID:" + teamCreate.myUserId); //uncomment
                }
              });
          });
      } catch (ex) {
        console.error(ex);
      }
    }
  
    public static GetTeamsJoined() {
      try {
        //$("#jtl").empty();
        TeamsManageClass.graphClient
          .getClient()
          .then((client: MSGraphClient): void => {
            client
              .api('/me/joinedTeams')
              .get((error, teams: any, rawResponse ? : any) => {
                for (var j = 0; j < teams.value.length; j++) {
                  var teamItem = teams.value[j];
                  TeamsManageClass.TeamsJoined[teamItem.id] = teamItem;
                  $("#icojoin-" + teamItem.id).empty();
                  $("#icojoin-" + teamItem.id).append("<i class='fas fa-sign-in-alt fa-lg'></i>");
                }
              });
          });
      } catch (ex) {
        console.error(ex);
      }
    }
  
    public static GetAllTeams() {
      try {
        $("#allTL").empty();
        $("#chn-teamsList").empty();
        $("#teamCard").hide();
        TeamsManageClass.graphClient
          .getClient()
          .then((client: MSGraphClient): void => {
            client
              .api('/groups')
              .version('beta')
              .filter(`resourceProvisioningOptions/Any(x:x eq 'Team')`)
              .get((error, teams: any, rawResponse ? : any) => {
                //console.log(teams);           
                TeamsManageClass.CreateTeamList(teams, "allTL");
              });
          });
      } catch (ex) {
        console.error(ex);
      }
    }
  
    private static GetTeamDetails(teamId: string, ctrlId: string) {
      TeamsManageClass.graphClient
        .getClient()
        .then((client: MSGraphClient): void => {
          client
            .api('/teams/' + teamId)
            .get((error, teamDetail: any, rawResponse ? : any) => {
              TeamsManageClass.TeamsById[teamDetail.id] = teamDetail;
              //console.log("Team detail --------------");
              //console.log(teamDetail);
              //$("#teamBody").text(JSON.stringify(teamDetail));
              //console.log("-----------");
              $("#url-" + ctrlId + teamDetail.id).append("<a class='' target='_blank' href='" + teamDetail.webUrl + "' ><i class='fas fa-lg fa-external-link-alt'></i></a>");
            });
        });
    }
  
    private static GetGroup(teamId: string, ctrlId: string) {
  
      TeamsManageClass.graphClient
        .getClient()
        .then((client: MSGraphClient): void => {
          client
            .api('/groups/' + teamId)
            .get((error, teamDetail: any, rawResponse ? : any) => {
              //console.log(teamDetail);
              TeamsManageClass.TeamsGroupById[teamDetail.id] = teamDetail;
              $("#ico-" + ctrlId + teamDetail.id).empty();
              $("#ico-" + ctrlId + teamDetail.id).append(TeamsManageClass.GetVisibilityIcon(teamDetail.visibility));
            });
        });
    }
  
    private static GetVisibilityIcon(visibility: string) {
      var privateIcon = "<span title='Private' class='text-danger'><i class='fas fa-user-lock'></i></span>";
      var publicIcon = "<span title='Public' class='text-success'><i class='fas fa-user-friends'></i></span>";
      var iconHtm = publicIcon;
      if (visibility == "Private") {
        iconHtm = privateIcon;
      }
      return iconHtm;
    }
  
    private static CreateTeamList(teamsData: any, controlId: string) {
      var html = "";
      var createChannel = "";
      for (var j = 0; j < teamsData.value.length; j++) {
        var teamItem = teamsData.value[j];
        TeamsManageClass.GetGroup(teamItem.id, controlId);
        TeamsManageClass.GetTeamDetails(teamItem.id, controlId);
        console.log(teamItem);
        createChannel = "<option value='" + teamItem.id + "' >" + teamItem.displayName + "</option>";
        $("#chn-teamsList").append(createChannel);
        html = html + "<a id='t-" + controlId + teamItem.id + "' data-team='" + teamItem.id + "' href='#' class='list-group-item list-group-item-action animated bounceIn d-flex justify-content-between align-items-center'><span id='ico-" + controlId + teamItem.id + "' ></span>&nbsp;" + teamItem.displayName + " &nbsp; &nbsp;<span title='You are member of this Team' class='text-primary' id='icojoin-" + teamItem.id + "' ></span></a>";
      }
      TeamsManageClass.GetTeamsJoined();
  
      $("#" + controlId).append(html);
      $(".list-group-item-action").click((e) => {
        $("#teamCard").hide();
        var idText = e.currentTarget.id;
        var teamId = $("#" + idText).data("team");
        if (teamId) {
          TeamsManageClass.GetChannels(teamId);
          TeamsManageClass.SetTeamCard(teamId);
        }
      });
    }
  
    private static SetTeamCard(teamId) {
      var teamDetail = TeamsManageClass.TeamsById[teamId];
      if (teamDetail) {
        $("#teamCard").show("fast");
        $("#teamHeader").text(teamDetail.displayName);
        $("#card-teamId").val(teamDetail.id);
        $("#card-teamDesc").html(teamDetail.description);
        $("#card-archived").prop("checked", JSON.parse(teamDetail.isArchived));
        $("#card-search").prop("checked", JSON.parse(teamDetail.discoverySettings.showInTeamsSearchAndSuggestions));
        $("#card-webUrlTxt").val(teamDetail.webUrl);
        $("#card-webUrl").attr("href", teamDetail.webUrl);
        //member settings
        $("#card-aCreateChannel").prop("checked", JSON.parse(teamDetail.memberSettings.allowCreateUpdateChannels));
        $("#card-aDeleteChannel").prop("checked", JSON.parse(teamDetail.memberSettings.allowDeleteChannels));
        $("#card-aApps").prop("checked", JSON.parse(teamDetail.memberSettings.allowAddRemoveApps));
        $("#card-aTabs").prop("checked", JSON.parse(teamDetail.memberSettings.allowCreateUpdateRemoveTabs));
        $("#card-aConnectors").prop("checked", JSON.parse(teamDetail.memberSettings.allowCreateUpdateRemoveConnectors));
        // messaging settings          
        $("#card-aMsgEdit").prop("checked", JSON.parse(teamDetail.messagingSettings.allowUserEditMessages));
        $("#card-aMsgDelete").prop("checked", JSON.parse(teamDetail.messagingSettings.allowUserDeleteMessages));
        $("#card-aMsgOwnerDelete").prop("checked", JSON.parse(teamDetail.messagingSettings.allowOwnerDeleteMessages));
        $("#card-aMsgTeamMention").prop("checked", JSON.parse(teamDetail.messagingSettings.allowTeamMentions));
        $("#card-aMsgCMention").prop("checked", JSON.parse(teamDetail.messagingSettings.allowChannelMentions));
        // guest settings          
        $("#card-aGuestEditChannel").prop("checked", JSON.parse(teamDetail.guestSettings.allowCreateUpdateChannels));
        $("#card-aGuestDeleteChannel").prop("checked", JSON.parse(teamDetail.guestSettings.allowDeleteChannels));
        // fun settings
        $("#card-fGiphy").prop("checked", JSON.parse(teamDetail.funSettings.allowGiphy));
        $("#card-fStickers").prop("checked", JSON.parse(teamDetail.funSettings.allowStickersAndMemes));
        $("#card-fMemes").prop("checked", JSON.parse(teamDetail.funSettings.allowCustomMemes));
        $("#card-fContentRating").val(teamDetail.funSettings.giphyContentRating);
      }
      var grpDetail = TeamsManageClass.TeamsGroupById[teamId];
      if (grpDetail) {
        //console.log(grpDetail);
        var icon = TeamsManageClass.GetVisibilityIcon(grpDetail.visibility);
        $("#card-teamVisibilityIcon").empty();
        $("#card-teamVisibilityIcon").append(icon);
        $("#card-teamVisibility").val(grpDetail.visibility);
      }
    }
  
    private static GetChannels(teamId: string) {
      var html = "";
      $("#cardTeamChannels").empty();
      TeamsManageClass.graphClient
        .getClient()
        .then((client: MSGraphClient): void => {
          client
            .api('/teams/' + teamId + "/channels")
            .get((error, channels: any, rawResponse ? : any) => {
              console.log(channels);
              for (var j = 0; j < channels.value.length; j++) {
                var channelItem = channels.value[j];
                console.log(channelItem);
                var desc = "";
                if (channelItem.description) {
                  desc = channelItem.description;
                }
                var cId = TeamsManageClass.ParseChannelId(channelItem.id);
                //html = "<tr><td>" + channelItem.displayName + "</td><td>" + desc + "</td><td id='url-chn-" + cId + "' ><a target='_blank' href='" + channelItem.webUrl + "' ><i class='fas fa-external-link-alt'></i></a></td><td><a id='file-chn-" + cId + "' href='#' target='_blank' class='text-muted'><span class='fa-stack fa-1x text-muted'><i class='fas fa-circle fa-stack-2x'></i><i class='fas fa-folder fa-stack-1x fa-inverse'></i></span>&nbsp;</a></td></tr>";
                html = "<tr><td>" + channelItem.displayName + "</td><td>" + desc + "</td><td id='url-chn-" + cId + "' ><a target='_blank' href='" + channelItem.webUrl + "' ><i class='fas fa-external-link-alt'></i></a></td><td><a id='file-chn-" + cId + "' href='#' target='_blank' class='text-muted'></a></td></tr>";
                $("#cardTeamChannels").append(html);
                TeamsManageClass.GetChannelFile(teamId, channelItem.id);
              }
            });
        });
    }  
  
    private static GetChannelFile(teamId: string, channelId: string) {
      try {
        TeamsManageClass.graphClient
          .getClient()
          .then((client: MSGraphClient): void => {
            client
              .api('/teams/' + teamId + "/channels/" + channelId + "/filesFolder")
              .get((error, channelFile: any, rawResponse ? : any) => {
                //console.log(TeamsManageClass.ParseChannelId(channelId));
                if (channelFile) {
                  var cId = TeamsManageClass.ParseChannelId(channelId);
                  $("#file-chn-" + cId).attr("href", channelFile.webUrl);
                  $("#file-chn-" + cId).attr("title", "The sharepoint library contains " + channelFile.folder.childCount + " file & folder(s)");
                  $("#file-chn-" + cId).append(channelFile.name + "(" + channelFile.folder.childCount + ")");
                }
              });
          });
      } catch (exception) {
        console.error(exception);
      }
    }
  
    private static ParseChannelId(channelId: string) {
      channelId = channelId.replace(".", "");
      channelId = channelId.replace(":", "");
      channelId = channelId.replace("@", "");
      return channelId;
    }
  
    private static GetGroupList() {
      $("#ico-load").show();
      TeamsManageClass.graphClient
        .getClient()
        .then((client: MSGraphClient): void => {
          client
            .api("/groups")
            .get((error, groupsList: any, rawResponse ? : any) => {
              //console.log(TeamsManageClass.ParseChannelId(channelId));
              if (groupsList) {
                console.log(groupsList);
                for (var j = 0; j < groupsList.value.length; j++) {
                  var grpItem = groupsList.value[j];
                  $("#groupList").append("<option value='" + grpItem.id + "' >" + grpItem.displayName + "</option>");
                }
              }
              $("#ico-load").hide();
            });
        });
    } 
  
  }
  