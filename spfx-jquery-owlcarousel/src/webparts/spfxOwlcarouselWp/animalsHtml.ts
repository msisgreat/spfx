import { sp } from '@pnp/sp';
import {ISpfxOwlcarouselWpWebPartProps} from './SpfxOwlcarouselWpWebPart';

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
    public static templateHtml: string = `<div class="container">
    <div class="row">
        <h4>Animal Taxonomy - Owl Carousel</h4>           
        <div id="animals-card" class="owl-carousel owl-theme">

        </div>
    </div>
</div>
    `;

    private static _getListData(): Promise<IOrganism[]> {
        try {
            console.log("_getListData");
            return sp.web.lists.getByTitle("Organisms").items.select("*").get().then((response) => {
                //console.log(response);
                return response;
            });
        } catch (ex) {
            console.error(ex);
        }
    }
    public static GetAllOrganisms = (props: ISpfxOwlcarouselWpWebPartProps): void => {
        try {
            console.log("GetAllOrganisms");
            OrganismClass._getListData().then((response) => {
                OrganismClass._renderOrganismList(response, props);
            });
        } catch (ex) {
            console.error(ex);
        }
    }

    private static _renderOrganismList(items: IOrganism[], props: ISpfxOwlcarouselWpWebPartProps): void {
        try {
            var animalsListHtml = "";
            var cardHtml = `<div class="item" style="width:250px;">         
                <div class="card" style="width:180px">
                    <img class="card-img-bottom" src="[PIC]" alt="Card image">
                    <div class="card-body">
                    <div class='row'>                
                        <div class="col"><h5>[NAM]</h5></div>
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
                </div>
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
            //var animalsDeck = `<div class="">` + animalsListHtml + `</div>`;
            $("#animals-card").append(animalsListHtml);
            let oCarousel: any = $('.owl-carousel');
            
            if (props.styles == 1) {
                oCarousel.owlCarousel({
                    margin: 4,
                    loop: false,
                    center: props.choiceCenter,
                    items: props.itemsCount,
                    URLhashListener: props.urlHashNav
                });
            }
            else {
                oCarousel.owlCarousel({
                    margin: 4,
                    loop: false,
                    responsiveClass: true,
                    responsive: {
                        0: {
                            items: 1,
                            nav: true
                        },
                        600: {
                            items: 2,
                            nav: false
                        },
                        1000: {
                            items: 4,
                            nav: true,
                            loop: false
                        }
                    },
                    center: props.choiceCenter,                    
                    URLhashListener: props.urlHashNav
                });
                
            }


        }
        catch (ex) {
            console.error(ex);
        }
    }

}