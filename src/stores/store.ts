import { observable} from 'mobx';

 class Store {
    
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
};

let store = new Store;
export default store;