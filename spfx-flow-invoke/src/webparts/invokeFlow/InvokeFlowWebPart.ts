import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './InvokeFlowWebPart.module.scss';
import * as strings from 'InvokeFlowWebPartStrings';

export interface IInvokeFlowWebPartProps {
  description: string;
}

export default class InvokeFlowWebPart extends BaseClientSideWebPart<IInvokeFlowWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <div class="${ styles.invokeFlow}">
    <div class="${ styles.container}">
      <div class="${ styles.row}">
        <div class="${ styles.column}">
            <span class="${ styles.title}">Invoke Power Automate!</span>
            <p class="${ styles.subTitle}">Search documents via Power Automate with the Keyword</p>
            <input type="Text" id="searchKeyword" placeholder="Keyword like blockchain mixed reality " />            
            <div id="searchButton" class="${ styles.button}">
              <span class="${ styles.label}">Search</span>
            </div>
            <div id="resultSearch">
              <p style="display:none;" id="loadingText" class="${ styles.subTitle}">Loading please wait .... </p>
            </div>
        </div>
      </div>
    </div>
  </div>`;
    let btn = document.getElementById("searchButton");
    btn.addEventListener("click", (e: Event) => this.invokeFunction())
  }

  public invokeFunction = (): void => {
    let text = (<HTMLInputElement>document.getElementById("searchKeyword")).value;
    let resultHtml = document.getElementById("resultSearch");

    let loading = document.getElementById("loadingText");
    loading.style.display = 'block';
    console.log(text);
    //alert(text);
    let flowUrl: string = "<PowerAutomate HERE>";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', flowUrl);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        //var flowInfo = JSON.parse(xhr.responseText);
        console.log(xhr.responseText);
        resultHtml.innerHTML = xhr.responseText;
      }
      loading.style.display = 'none';
    };
    xhr.send(JSON.stringify({
      keyword: text,
      searchMethod: 'Doc'
    }));
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
