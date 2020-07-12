import {ISearchWpWebPartProps} from "./SearchWpWebPart";

class FileSearchClass {
    public Title: string;
    public Path: string;
    public Modified: string;
    public ModifiedBy: string;
    public Library: string;
    public Extension: string;
    public FileName: string;
    public Preview: string;
    public Highlight: string;
}

export default class SearchClass {
    public static props: ISearchWpWebPartProps;
    private static siteUrl:string = "<SITE>";
    public static templateHtml: string = `<div class="container">
    <h3>Search Documents</h3>
    <hr/>
      <div class="row animated fadeInDown">
        <div class="col-md-6">
            <select id="cmbSearchSelection" name="searchOptions" class="custom-select">               
                <option selected value="ANY">Organization Wide</option>
                <option value="MOD">Modified By</option>               
            </select>
        </div>
        <div class="col-md-6">
            <div class="input-group mb-3">
                <input id="searchKeyword" type="text" class="form-control" placeholder="Search">
                <div class="input-group-append">
                    <div class="btn btn-success" id="searchFlow">Go</div> 
                </div>
            </div>
        </div>
      </div> 
      <hr/>
      <div id="loadingIcon" style="display:none;">
        <p>Loading... </p>
        <div class="fa-3x">
            <i class="fas fa-spinner fa-spin"></i>
        </div>
      </div>
      <div class="row" id="searchResults">
        
      </div>    
  </div>`;

    public static InitialiseSearch() {
        $("#searchFlow").click(() => {
            $("#loadingIcon").show();
            $("#searchResults").empty();
            var keyword = $("#searchKeyword").val();
            var searchOption = $("#cmbSearchSelection").val();

            let restUrl: string = SearchClass.siteUrl + "/_api/search/query?querytext='" + keyword + "'&sortlist='ViewsLifeTime:descending'&rowlimit=20&selectproperties='Title,ModifiedOWSDATE,EditorOWSUSER,Path,ParentLink,FileExtension,FileName,ServerRedirectedEmbedURL,HitHighlightedSummary'&refiners='fileextension'&refinementfilters='(fileExtension:or(\"docx\",\"pdf\",\"doc\",\"xls\",\"xlsx\",\"xlsm\",\"ppt\",\"pptx\",\"mpp\",\"csv\",\"txt\",\"png\",\"jpg\"))'";
            if (searchOption == "MOD") {
                restUrl = SearchClass.siteUrl + "/_api/search/query?querytext='ModifiedBy:" + keyword + "*'&sortlist='ViewsLifeTime:descending'&rowlimit=20&selectproperties='Title,ModifiedOWSDATE,EditorOWSUSER,Path,ParentLink,FileExtension,FileName,ServerRedirectedEmbedURL,HitHighlightedSummary'&refiners='fileextension'&refinementfilters='(fileExtension:or(\"docx\",\"pdf\",\"doc\",\"xls\",\"xlsx\",\"xlsm\",\"ppt\",\"pptx\",\"mpp\",\"csv\",\"txt\",\"png\",\"jpg\"))'";
            }

            $.ajax(
                {
                    url: restUrl,
                    type: "GET",
                    dataType: 'json',
                    contentType: 'application/json',
                    headers: { 'accept': 'application/json;odata=nometadata' },
                    success: (result) => {
                        $("#loadingIcon").hide();
                        console.log(result);
                        let jsonRows = result.PrimaryQueryResult.RelevantResults.Table.Rows;
                        for (let index = 0; index < jsonRows.length; index++) {
                            const elementCells = jsonRows[index].Cells;
                            //console.log(elementCells);
                            let element: FileSearchClass = new FileSearchClass();
                            for (let cindex = 0; cindex < elementCells.length; cindex++) {
                                var cellValue = elementCells[cindex].Value;
                                //console.log(elementCells[cindex].Key + " Value : + " + cellValue);
                                switch (elementCells[cindex].Key) {
                                    case "Title":
                                        element.Title = cellValue;
                                        break;
                                    case "ModifiedOWSDATE":
                                        element.Modified = cellValue;
                                        break;
                                    case "EditorOWSUSER":
                                        var email = cellValue.split("|");
                                        element.ModifiedBy = email[0];
                                        break;
                                    case "Path":
                                        element.Path = cellValue;
                                        break;
                                    case "ParentLink":
                                        element.Library = cellValue;
                                        break;
                                    case "FileExtension":
                                            element.Extension = cellValue;
                                            break;
                                    case "FileName":
                                        element.FileName = cellValue;
                                        break;
                                    case "ServerRedirectedEmbedURL":
                                        element.Preview = cellValue;
                                        break;
                                    case "HitHighlightedSummary":
                                        element.Highlight = cellValue;
                                        break;
                                }
                            }                            
                            var iconPath = SearchClass.GetIconPath(element.Extension);

                            var html = `<div style="padding-bottom:8px;" class="col-md-6">
                                <div class="card animated fadeInDown animate-delay-3s">
                                    <div class="card-header">
                                        <!--<span class="fa-stack fa-1x text-info">
                                            <i class="fas fa-circle fa-stack-2x"></i>
                                            <i class="far fa-file-alt fa-stack-1x fa-inverse"></i>
                                        </span>-->                                       
                                        <img style="height:16px;margin-bottom:4px;" src="${iconPath}" /> <span class="card-title"><a href="${element.Path}" target="_blank">${element.Title}</a></span>
                                    </div>
                                    <div class="card-body">
                                        <p class="card-text">${element.Highlight} </p>
                                        <p class="card-text"><i class="fas fa-stopwatch fa-lg"></i> ${element.Modified}</p>
                                        <p class="card-text"><i class="fas fa-user-tie fa-lg"></i> ${element.ModifiedBy} </p>
                                    </div>
                                    <div class="card-footer">
                                        <a href="${element.Library}" target="_blank" class="card-link">Library</a>
                                        <a href="${element.Preview}" target="_blank" class="card-link">Preview</a>
                                    </div>
                                </div>     
                            </div>`;
                            $("#searchResults").append(html);
                        }

                    },

                    error: (error) => {
                        console.log("Error occured:");
                        console.log(error);
                        $("#loadingIcon").hide();
                    }

                });
        });
    }

    private static GetIconPath(extn:string) {
        var imgPath = "";
        switch (extn) {
            case "pptx":
                imgPath = "/_layouts/15/images/icpptx.png";
                break;
            case "ppt":
                imgPath = "/_layouts/15/images/icpptx.png";
                break;
            case "docx":
                imgPath = "/_layouts/15/images/icdocx.png";
                break;
            case "doc":
                imgPath = "/_layouts/15/images/icdocx.png";
                break;
            case "xlsx":
                imgPath = "/_layouts/15/images/icxlsx.png";
                break;
            case "xls":
                imgPath = "/_layouts/15/images/icxlsx.png";
                break;
            case "pdf":
                imgPath = "/_layouts/15/images/icpdf.png";
                break;
            case "xml":
                imgPath = "/_layouts/15/images/icxml.gif";
                break;
            case "xlsm":
                imgPath = "/_layouts/15/images/icxlsm.png";
                break;
            case "csv":
                imgPath = "/_layouts/15/images/icxls.png";
                break;
            case "txt":
                imgPath = "/_layouts/15/images/ictxt.gif";
                break;
            default:
                imgPath = "/_layouts/15/images/icgen.gif";
        }
        return SearchClass.siteUrl + imgPath;
    }

}