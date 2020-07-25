import {
    MSGraphClient
  } from '@microsoft/sp-http';
  import {
    Group
  } from "@microsoft/microsoft-graph-types";
  import {
    Team
  } from "@microsoft/microsoft-graph-types";
  import {
    Channel
  } from "@microsoft/microsoft-graph-types";
  import {
    each
  } from 'jquery';
  import TeamsManageClass from './TeamsManagement';
  
  export default class TeamsCreateClass {
    private static graphClient: any = null;
    public static csvRows: Map < string, string[] > = null;
    public static myUserId: string = "";
    private static noOfRetries: number = 3;
    private static retryValue: number = 0;
    private static noChannelToCreate = 0;
    private static noCurrentChannel = 0;
  
    public static InitialiseControls(client) {
      TeamsCreateClass.graphClient = client;
    }  
  
    public static CreateTeam() {
      try {
        $("#create-icoLoading").show();
        console.log("started creating teams: ");
        let teamName: string = ( < HTMLInputElement > document.getElementById("create-teamName")).value;
        let teamDesc: string = ( < HTMLInputElement > document.getElementById("create-teamDesc")).value;
        let teamVisibility: string = ( < HTMLSelectElement > document.getElementById("create-Visibility")).selectedOptions.item(0).value;
  
        let gType: any = ( < HTMLSelectElement > document.getElementById("create-giphyRating")).selectedOptions.item(0).value;
  
        $("#create-statusText").append("<div><i class='text-info fas fa-info-circle'></i>&nbsp; Creating teams: " + teamName + "</div>");
        const teamReq: Team = {
  
          memberSettings: {
            allowAddRemoveApps: ( < HTMLInputElement > document.getElementById("create-aApps")).checked,
            allowCreateUpdateChannels: ( < HTMLInputElement > document.getElementById("create-aCreateChannel")).checked,
            allowCreateUpdateRemoveConnectors: ( < HTMLInputElement > document.getElementById("create-aConnectors")).checked,
            allowCreateUpdateRemoveTabs: ( < HTMLInputElement > document.getElementById("create-aTabs")).checked,
            allowDeleteChannels: ( < HTMLInputElement > document.getElementById("create-aDeleteChannel")).checked
          },
          guestSettings: {
            allowCreateUpdateChannels: ( < HTMLInputElement > document.getElementById("create-aGuestEditChannel")).checked,
            allowDeleteChannels: ( < HTMLInputElement > document.getElementById("create-aGuestDeleteChannel")).checked
          },
          messagingSettings: {
            allowChannelMentions: ( < HTMLInputElement > document.getElementById("create-aMsgCMention")).checked,
            allowOwnerDeleteMessages: ( < HTMLInputElement > document.getElementById("create-aMsgOwnerDelete")).checked,
            allowTeamMentions: ( < HTMLInputElement > document.getElementById("create-aMsgTeamMention")).checked,
            allowUserDeleteMessages: ( < HTMLInputElement > document.getElementById("create-aMsgDelete")).checked,
            allowUserEditMessages: ( < HTMLInputElement > document.getElementById("create-aMsgEdit")).checked
          },
          funSettings: {
            allowCustomMemes: ( < HTMLInputElement > document.getElementById("create-fMemes")).checked,
            allowGiphy: ( < HTMLInputElement > document.getElementById("create-fGiphy")).checked,
            allowStickersAndMemes: ( < HTMLInputElement > document.getElementById("create-fStickers")).checked,
            giphyContentRating: gType
          }
        };
        teamReq["template@odata.bind"] = "https://graph.microsoft.com/beta/teamsTemplates('standard')";
        teamReq["owners@odata.bind"] = ["https://graph.microsoft.com/beta/users/" + this.myUserId];
        teamReq["displayName"] = teamName;
        teamReq["description"] = teamDesc;
        teamReq["visibility"] = teamVisibility;
  
        //let groupName: string = (<HTMLInputElement>document.getElementById("create-teamName")).value;
        //let groupDescription: string = (<HTMLInputElement>document.getElementById("create-teamDesc")).value;
  
        console.log(teamReq);
        TeamsCreateClass.graphClient
          .getClient()
          .then((client: MSGraphClient): void => {
            client
              .api("/teams")
              .version("beta")
              .post(teamReq)
              .then((grpTeamResponse) => {
                console.log(grpTeamResponse);
                $("#create-statusText").append("<div><i class='text-success fas fa-check-circle'></i> &nbsp; Successfully created team</div>");
                $("#create-icoLoading").hide();
              }, reason => {
                console.error(reason);
                if (reason.statusCode == 404 && this.retryValue < this.noOfRetries) {
                  this.retryValue = this.retryValue + 1;
                  $("#create-statusText").append("<div><i class='text-info fas fa-info-circle'></i>&nbsp;Retrying...  (" + this.retryValue + ") </div>");
                  setTimeout(() => {
                    console.log("started creating teams...");
                    this.CreateTeam();
                  }, 20000);
                } else {
                  $("#create-statusText").append("<div><i class='text-danger fas fa-exclamation-circle'></i>&nbsp;Post error creating teams: <b>" + reason.statusCode + ":" + reason.message + "</b></div>");
                  $("#create-icoLoading").hide();
                }
              });
          });
      } catch (exception) {
        $("#create-statusText").append("<div><i class='text-error fas fa-exclamation-circle'></i>Unhandled error while creating team: " + exception.message + "</div>");
        console.error(exception);
        $("#create-icoLoading").hide();
      }
    }
  
    public static CreateChannel() {
      let single = ( < HTMLInputElement > document.getElementById("optSingleChn")).checked;
      let multiple = ( < HTMLInputElement > document.getElementById("optMultipleChn")).checked;
      this.noCurrentChannel = 0;
      if (single) {
        let chnName: string = ( < HTMLInputElement > document.getElementById("create-chnName")).value.trim();
        let chnDesc: string = ( < HTMLInputElement > document.getElementById("create-chnDesc")).value.trim();
        $("#create-chn-statusText").append("<div><i class='text-info fas fa-info-circle'></i>&nbsp;Single channel creation ...</div>");
        this.noChannelToCreate = 1;
        if (chnName != "" && chnName != null) {
          this.CallChannelAPI(chnName, chnDesc);
        } else {
          $("#create-chn-statusText").append("<div><i class='text-info fas fa-info-circle'></i>&nbsp;Please enter channel name</div>");
        }
      } else if (multiple) {
        $("#create-chn-statusText").append("<div><i class='text-info fas fa-info-circle'></i>&nbsp;Multiple channel creation ... </div>");
        this.noChannelToCreate = this.csvRows.size;
        console.log("getting values...");
        var seconds = 3000;
        var iLoop = 1;
        this.csvRows.forEach((value, key) => {
          iLoop = iLoop + 1;
          let cells: string[] = value;
          if (value && value != null && value.length > 1) {
            let channelName: string = cells[0];
            let channelDesc: string = cells[1];
            if (channelName != null && channelName != "") {
              console.log("Name = " + channelName + " desc: " + channelDesc + " sec= " + seconds);
              setTimeout(() => {
                console.log("started creating teams...");
                this.CallChannelAPI(channelName, channelDesc);
              }, seconds * iLoop);
            }
          }
        });
      } else {
        $("#create-chn-statusText").append("<div><i class='text-warning fas fa-exclamation-circle'></i></i>&nbsp;Please select single / multiple channel creation</div>");
      }
    }
  
    private static CallChannelAPI(chnName: string, chnDesc: string) {
      try {
        $("#create-chn-icoLoading").show();
        console.log("started creating channel: " + chnName);
        let teamId = ( < HTMLSelectElement > document.getElementById("chn-teamsList")).selectedOptions.item(0).value;
        let teamName = ( < HTMLSelectElement > document.getElementById("chn-teamsList")).selectedOptions.item(0).text;
  
        //let chnName: string = ( < HTMLInputElement > document.getElementById("create-chnName")).value;
        //let chnDesc: string = ( < HTMLInputElement > document.getElementById("create-chnDesc")).value;
        let memType: any = ( < HTMLSelectElement > document.getElementById("create-chnMemType")).selectedOptions.item(0).value;
  
        $("#create-chn-statusText").append("<div><i class='text-info fas fa-info-circle'></i>&nbsp; Creating channel for teams : " + teamName + " channel: " + chnName + "</div>");
        const chnReq: Channel = {
          displayName: chnName,
          description: chnDesc
        };
        chnReq["membershipType"] = memType;
        chnReq["isFavoriteByDefault"] = ( < HTMLInputElement > document.getElementById("create-chnFav")).checked;
        /*chnReq["moderationSettings"] = {
          allowNewMessageFromBots: true,
          allowNewMessageFromConnectors: true,
          replyRestriction: "everyone",
          userNewMessageRestriction: "everyone"
        };*/
        //chnReq["moderationSettings"] =
        console.log(JSON.stringify(chnReq));
        return TeamsCreateClass.graphClient
          .getClient()
          .then((client: MSGraphClient): void => {
            client
              .api("/teams/" + teamId + "/channels")
              .version("beta")
              .post(chnReq)
              .then((chnResponse) => {
                this.noCurrentChannel = this.noCurrentChannel + 1;
                console.log(JSON.stringify(chnResponse));
                $("#create-chn-statusText").append("<div><i class='text-success fas fa-check-circle'></i> &nbsp; Successfully created [" + this.noCurrentChannel + " of " + this.noChannelToCreate + "] channel(s) <a href='" + chnResponse.webUrl + "' target='_blank' >" + chnResponse.displayName + "<a></div>");
                this.CallUpdateChannelAPI(teamId,chnResponse.id,chnName,chnDesc);
                if (this.noCurrentChannel >= this.noChannelToCreate) {
                  $("#create-chn-icoLoading").hide();
                }
              }, reason => {
                this.noCurrentChannel = this.noCurrentChannel + 1;
                console.error(reason);
                $("#create-chn-statusText").append("<div><i class='text-danger fas fa-exclamation-circle'></i>&nbsp;Post error creating channel [" + this.noCurrentChannel + " of " + this.noChannelToCreate + "]: <b>" + reason.statusCode + ":" + reason.message + "</b></div>");
                if (this.noCurrentChannel >= this.noChannelToCreate) {
                  $("#create-chn-icoLoading").hide();
                }
              });
          });
      } catch (ex) {
        $("#create-chn-statusText").append("<div><i class='text-error fas fa-exclamation-circle'></i>Unhandled error while creating channel: " + ex.message + "</div>");
        $("#create-chn-icoLoading").hide();
      }
    }
    private static CallUpdateChannelAPI(teamId: string, chnId: string, chnName: string, chnDesc:string) {
      try {
        $("#create-chn-statusText").append("<div><i class='text-info fas fa-info-circle'></i>&nbsp; Updating moderation settings for " + chnName + "</div>");
        const chnReq: Channel = {  
          description: chnDesc
        };
        chnReq["moderationSettings"] = {
          allowNewMessageFromBots: false,
          allowNewMessageFromConnectors: false,
          replyRestriction: "everyone",
          userNewMessageRestriction: "everyone"
        };
        console.log(JSON.stringify(chnReq));
        return TeamsCreateClass.graphClient
          .getClient()
          .then((client: MSGraphClient): void => {
            client
              .api("/teams/" + teamId + "/channels/"+ chnId)
              .version("beta")
              .patch(chnReq)
              .then((chnUpdateResponse) => {              
                console.log(JSON.stringify(chnUpdateResponse));
                $("#create-chn-statusText").append("<div><i class='text-success fas fa-check-circle'></i> &nbsp; Successfully updated channel settings [" + this.noCurrentChannel + " of " + this.noChannelToCreate + "] channel(s)");              
              }, reason => {              
                console.error(reason);
                $("#create-chn-statusText").append("<div><i class='text-danger fas fa-exclamation-circle'></i>&nbsp;Patch error updating channel [" + this.noCurrentChannel + " of " + this.noChannelToCreate + "]: <b>" + reason.statusCode + ":" + reason.message + "</b></div>");            
              });
          });
      } catch (exc) {
        console.error(exc);
      }
    }
  }
  