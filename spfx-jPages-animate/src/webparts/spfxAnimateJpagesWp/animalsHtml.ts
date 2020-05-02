import { sp } from '@pnp/sp';
import {ISpfxAnimateJpagesWpWebPartProps} from "./SpfxAnimateJpagesWpWebPart";
export interface IOrganism {
    ID: number;
    Title: string;
    Description: string;
    Genus: string;
    Species: string;
    Family: string;
    Order0: string;
    Scientific_x0020_Name: string;
    Taxonomy: ITaxonomy;
    Organism_x0020_Picture: IPicture;
}
export interface ITaxonomy {
    Label: string;
    TermGuid: string;
    WssId: number;
}
export interface IPicture {
    Description: string;
    Url: string;
}

export default class OrganismClass {
    public static props: ISpfxAnimateJpagesWpWebPartProps;
    public static templateHtml: string = `<div class="container">
    <h3 id="headerText">Animal Taxonomy</h3>
    <hr/>
      <div class="row">
        <div id="holderJPage" class="holder"></div>                  
      </div>
      <div class="row">
        <div id="animals-card"></div>  
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

    public static InitialiseControls() {
        OrganismClass.GetAllOrganisms();
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
            var cardHtml = `<li><img src="[PIC]" alt="[NAM]"></li>
            `;

            items.forEach((item: IOrganism) => {
                var animalHtml = cardHtml.replace("[NAM]", item.Title);
                animalHtml = animalHtml.replace("[PIC]", item.Organism_x0020_Picture.Url);
                animalHtml = animalHtml.replace("[SCI]", item.Scientific_x0020_Name);
                animalHtml = animalHtml.replace("[FAM]", item.Family);
                animalHtml = animalHtml.replace("[ORD]", item.Order0);
                //animalHtml = animalHtml.replace("[SCI]",item.Scientific_x0020_Name);
                animalsListHtml = animalsListHtml + animalHtml;
            });
            var animalsDeck = `<ul class="itemContainer" id="itemContainer">` + animalsListHtml + `</ul>`;
            $("#animals-card").append(animalsDeck);

            let jpage: any = $("#holderJPage");
            if (OrganismClass.props.AutoPaginate) {
                jpage.jPages({
                    containerID: "itemContainer",
                    previous: "←",
                    next: "→",
                    perPage: OrganismClass.props.ItemsPerPage,                   
                    delay: 100,
                    animation: OrganismClass.props.Animation,
                    keyBrowse: OrganismClass.props.EnableKeyboard,
                    scrollBrowse: OrganismClass.props.ScrollNavigation,
                    clickStop: OrganismClass.props.AutoPaginate,
                    pause: 4000
                });
            }
            else {
                jpage.jPages({
                    containerID: "itemContainer",
                    previous: "←",
                    next: "→",
                    perPage: OrganismClass.props.ItemsPerPage,                   
                    delay: 100,
                    animation: OrganismClass.props.Animation,
                    keyBrowse: OrganismClass.props.EnableKeyboard,
                    scrollBrowse: OrganismClass.props.ScrollNavigation
                });
            }
           
        }

        catch (ex) {
            console.error(ex);
        }
    }


}

