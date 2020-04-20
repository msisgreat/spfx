import { sp } from '@pnp/sp';
import {ISpfxAnimateWpWebPartProps} from "./SpfxAnimateWpWebPart";
export interface IOrganism {
    ID: number;
    Title: string;
    Description: string;
    Genus: string;
    Species: string;
    Family: string;
    Order0: string;
    Scientific_x0020_Name: string;
    Taxonomy: ITaxonomy;
    Organism_x0020_Picture: IPicture;
}
export interface ITaxonomy {
    Label: string;
    TermGuid: string;
    WssId: number;
}
export interface IPicture {
    Description: string;
    Url: string;
}
export default class OrganismClass {
    public static props:ISpfxAnimateWpWebPartProps;
    public static templateHtml: string = `<div class="container">
    <h3 id="headerText" class="animated">Animal Taxonomy</h3>
      <div class="row">
          <div>
            <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                <a class="navbar-brand" href="#">
                <span class="fa-stack">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i style="color:#f8bb50" class="fas fa-stack-1x fa-paw fa-lg"></i>
                </span>
                Organisms
                </a>
                <div class="collapse navbar-collapse" id="navb">
                    <ul class="navbar-nav mr-auto">
                        
                    </ul>
                    <div class="form-inline my-2 my-lg-0">
                        <!--<input class="form-control mr-sm-2" type="text" placeholder="Search">-->
                        <button id="btnOrganisms" class="btn btn-warning my-2 my-sm-0" type="button">Get Organisms</button>
                    </div>
                </div>          
            </nav>
            <div id="animals-card"></div>
          </div>
      </div>
  </div>
  `;

    private static _getListData(): Promise<IOrganism[]> {
        try {
            //console.log("_getListData");
            return sp.web.lists.getByTitle("Organisms").items.select("*").get().then((response) => {
                //console.log(response);
                return response;
            });
        } catch (ex) {
            console.error(ex);
        }
    }

    public static InitialiseControls()
    {
        $("#btnOrganisms").click(()=>{
            OrganismClass.GetAllOrganisms();
        });
        console.log(OrganismClass.props);
        let animate:any = OrganismClass.props.HeaderAnimation;
        let animateLoop:any = OrganismClass.props.HeaderAnimationLoop;
        let animateDelay:any = OrganismClass.props.HeaderAnimationDelay;
        $("#headerText").addClass(animate);
        $("#headerText").addClass(animateLoop);
        $("#headerText").addClass("delay-" + animateDelay + "s");
        $("#headerText").addClass("duration-" + OrganismClass.props.HeaderAnimationDuration + "s");
    }
    public static GetAllOrganisms = (): void => {
        try {
            console.log("GetAllOrganisms");
            $("#animals-card").empty();
            OrganismClass._getListData().then((response) => {
                OrganismClass._renderOrganismList(response);
            });
        } catch (ex) {
            console.error(ex);
        }
    }
    private static _renderOrganismList(items: IOrganism[]): void {
        try {
            console.log("_renderOrganismList");
            console.log(items);
            var animalsListHtml = "";
            let loadAni:any  = OrganismClass.props.CardLoad;

            var cardHtml = `         
      <div class="card animated ${loadAni}" style="width:250px">
        <img class="card-img-bottom" src="[PIC]" alt="Card image">
        <div class="card-body">
            <div class='row'>                
                <div class="col"><h5 class="animate-text">[NAM]</h5></div>
            </div>
            <div class='row'>
                <div class="col-md-5">Scientific Name:</div>
                <div class="col text-left">[SCI]</div>
            </div>
            <div class='row'>
                <div class="col-md-5">Family:</div>
                <div class="col text-left">[FAM]</div>
            </div>
            <div class='row'>
                <div class="col-md-5">Order:</div>
                <div class="col text-left">[ORD]</div>
                </div>       
            </div>
        </div>`;

            items.forEach((item: IOrganism) => {
                var animalHtml = cardHtml.replace("[NAM]", item.Title);
                animalHtml = animalHtml.replace("[PIC]", item.Organism_x0020_Picture.Url);
                animalHtml = animalHtml.replace("[SCI]", item.Scientific_x0020_Name);
                animalHtml = animalHtml.replace("[FAM]", item.Family);
                animalHtml = animalHtml.replace("[ORD]", item.Order0);
                //animalHtml = animalHtml.replace("[SCI]",item.Scientific_x0020_Name);
                animalsListHtml = animalsListHtml + animalHtml;
            });
            var animalsDeck = `<div class="card-columns">` + animalsListHtml + `</div>`;
            $("#animals-card").append(animalsDeck);
            $("#animals-card").show();

            let hoverAni:any  = OrganismClass.props.CardImage;
            $(".card-img-bottom").hover( function (e) {
                console.log("inside hover" + hoverAni );
                $(this).addClass('animated '+ hoverAni);
             }, function(e){
                 console.log("outhover");
                $(this).removeClass('animated '+ hoverAni);
             });
        }
        
        catch (ex) {
            console.error(ex);
        }
    }

}