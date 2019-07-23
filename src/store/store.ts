import { observable} from 'mobx';
import axios from 'axios';

 export class Store {
    
      @observable isSugestionsVis:boolean = false;
      @observable sugestions: string[] = ["poland", "germany", "spain", "france"];
      @observable selectedSugestion:string=''
      @observable inputValue: string = "";
      @observable countryShortcut: string = "";
      @observable airQData:{
                           city:string,
                           coordinates:{
                           latitude:number,
                           longitude:number
                           },
                           country:string,
                           date:{
                              local:string,
                              utc:string
                           },
                           location:string,
                           parameter:string,
                           unit:string,
                           value:number
      }[] = [];

      CountrySearchHandler = ()=>{
        
        switch (this.inputValue) {
            case 'poland':
                this.countryShortcut="PL";
                break;
            case 'france':
                this.countryShortcut = "FR";
                break;
            case 'spain':
                this.countryShortcut = "ES";
                break;
            case 'germany':
                this.countryShortcut = "DE";
                break;
        
        };

        // Api GET city list 
        
        axios.get(`https://api.openaq.org/v1/measurements?country=${this.countryShortcut}&parameter=pm25&limit=100`)
            .then((res) => {
                let editedData: any = [];

                // sort list by pm25 

                function compareValue(a: any, b: any) {
                    return b.value - a.value
                };
                let incomingData = res.data.results.sort(compareValue);

                // remove duplicates

                for (let i = 0; i < incomingData.length; i++) {
                    let isTrue: boolean = false;
                    for (let y = 0; y < editedData.length; y++) {
                        if (incomingData[i].city == editedData[y].city) {
                            isTrue = true;
                        }
                        if (editedData.length >= 10) {
                            isTrue = true;
                        }
                    };
                    if (isTrue === false) {
                        editedData.push(incomingData[i])
                    }

                };
    
                this.airQData = editedData;
           
                // close sugestion list

                if(this.airQData.length>0){
                    this.isSugestionsVis=false;
                };
                
            });
       
    };
};

let store = new Store;
export default store;