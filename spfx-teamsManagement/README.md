## spfx-teams-management - For creating new from scratch

yo @microsoft/sharepoint `
--solution-name "spfx-teamsManagement" `
--component-name "teams-management" `
--component-description "Manage Teams from SPFx. Create Teams, Create Channel, view all Teams properties." `
--component-type "webpart" `
--framework "none" `
--environment "spo" `
--package-manager "npm" `
--skip-feature-deployment

##Video
https://youtu.be/XOolMey96fU

### Things to Note
	1. SPFx code on the package-solution.json include 
	"webApiPermissionRequests": [  
	      {  
	        "resource": "Microsoft Graph",  
	        "scope": "User.Read.All"  
	      },
	      {  
	        "resource": "Microsoft Graph",  
	        "scope": "User.ReadWrite.All"  
	      },
	      {  
	        "resource": "Microsoft Graph",  
	        "scope": "User.ReadBasic.All"  
	      },
	      {  
	        "resource": "Microsoft Graph",  
	        "scope": "Group.Read.All"  
	      },
	      {  
	        "resource": "Microsoft Graph",  
	        "scope": "Directory.Read.All"  
	      }  
	    ]  
	2. Make sure the Graph API is allowed at the Tenant level for the SharePoint under SharePoint Admin-> Advanced ->API access
	3. Make sure SPFx webpart is allowed access for Graph API
	4. Deploy SPFx atleast once to the app catalog to trigger the API access request.
	5. Most time for me "gulp serve --nobrowser" works better

