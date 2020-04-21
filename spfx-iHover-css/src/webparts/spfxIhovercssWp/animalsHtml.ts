import { sp } from '@pnp/sp';
import {ISpfxIhovercssWpWebPartProps } from "./SpfxIhovercssWpWebPart";
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
    public static props: ISpfxIhovercssWpWebPartProps;
    public static templateHtml: string = `<div class="container">
    <h3 id="headerText">Animal Taxonomy</h3>
      <div class="row">
          <div>           
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
            let hEffect:any  = OrganismClass.props.HoverEffect;
            let hColor:any  = OrganismClass.props.ColorEffect;
            let hPos:any  = OrganismClass.props.HoverPosition;
            let hShape:any = OrganismClass.props.HoverShape;

            let col:string  = "col-md-4";
            if(hShape == "square")
            {
                col="col-md-6";  
            }
            
            var animalsListHtml = "";           
            var cardHtml = `
            <div class="${col}">                
                <div style="margin:10px;" class="ih-item ${hShape} ${hPos} ${hColor} ${hEffect} "><a href="#">
                    <div class="spinner"></div>
                    <div class="img"><img src="[PIC]" alt="animal picture"></div>
                    <div class="info">
                    <div class="info-back">
                        <h3>[NAM]</h3>
                        <p>[SCI]</p>
                    </div>
                    </div></a></div>               
            </div>
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
            var animalsDeck = `<div class="row">` + animalsListHtml + `</div>`;
            $("#animals-card").append(animalsDeck);                  
        }
        
        catch (ex) {
            console.error(ex);
        }
    }


}

