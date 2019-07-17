import * as React from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import styled from 'styled-components';
import MainList from './core--elements/MainList';
import store from '../../stores/store';
import InputSugestions from './core--elements/InputSugestions';

interface CoreProps {
    store: any;
  };


@observer
export default class Core extends React.Component<CoreProps,{}>{
    inputRef:React.RefObject<HTMLInputElement>;
   
    constructor(props:any){
        super(props);
        this.inputRef = React.createRef();
    };
    
    InputHandler = (e:any)=>{
        this.props.store.inputValue = e.target.value.toLowerCase();

        // show/hide country suggestions

        e.target.value.length > 0 ? this.props.store.isSugestionsVis = true : this.props.store.isSugestionsVis = false;
      
    };
    
    
   
    CountrySearchHandler = ()=>{
        
        switch (this.props.store.inputValue) {
            case 'poland':
                this.props.store.countryShortcut="PL";
                break;
            case 'france':
                this.props.store.countryShortcut = "FR";
                break;
            case 'spain':
                this.props.store.countryShortcut = "ES";
                break;
            case 'germany':
                this.props.store.countryShortcut = "DE";
                break;
        
        };

        // Api GET city list 
        
        axios.get(`https://api.openaq.org/v1/measurements?country=${this.props.store.countryShortcut}&parameter=pm25&limit=100`)
            .then((res) => {

        // Sorting incoming data

                let editedData: any = [];
                function compareValue(a: any, b: any) {
                    return b.value - a.value
                };
                let incomingData = res.data.results.sort(compareValue);
                
        // Deleting duplicates         

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
                    
                this.props.store.airQData = editedData;
           
                // closing sugestion list
                if(this.props.store.airQData.length>0){
                    this.props.store.isSugestionsVis=false;
                };
                
            });
       
    };

    // Updating chosen suggestion

    updateVal = (e:any)=>{
        if(this.props.store.selectedSugestion.length>0){
            e.target.value=this.props.store.selectedSugestion
            this.props.store.inputValue=e.target.value;
        };
      
        this.props.store.selectedSugestion=""
        this.props.store.isSugestionsVis=false;
    };
    render(){
       
        return(
            <StyledMenu>
                <InputSection>
                    <StyledInput outlined 
                        label="Enter country name"
                        type="text" 
                        onChange={this.InputHandler}
                        value={this.props.store.inputValue}
                         />
                        <StyledBtn raised
                        onClick={this.CountrySearchHandler}>
                            Search
                        </StyledBtn>
                </InputSection>
                { this.props.store.isSugestionsVis?<InputSugestions store={store}  onClick={this.updateVal}/>  : "" }
              <MainList store={store} /> 
            </StyledMenu>
        );
    };
};
const StyledMenu=styled.menu`
    width:100%;
    display:flex;
    flex-direction:column;
    @media (min-width: 768px) {
            align-items:center; 
    };
`

const InputSection = styled.section`
    display:flex;
    width:85%;
    align-items:center;
    @media (min-width: 768px) {
            justify-content:center;
    };
`
const StyledInput = styled(TextField)`
    margin-right:8%;
    &&{
    background-color:#fff;
   };
    @media (min-width: 768px) {
    margin-right:4%;
    };
`
const StyledBtn = styled(Button)`
    &&{
        background-color:#333;
    };
`