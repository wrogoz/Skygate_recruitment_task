import * as React from 'react';
import { observer } from 'mobx-react';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import styled from 'styled-components';
import MainList from './core--elements/MainList';
import store,{Store} from '../../store/store';
import InputSugestions from './core--elements/InputSugestions';

interface CoreProps {
    store: Store;
  };

@observer
export default class Core extends React.Component<CoreProps,{}>{
    inputRef: React.RefObject<TextField> = React.createRef();

    InputHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        this.props.store.inputValue = e.target.value.toLowerCase();
        e.target.value.length > 0 ? this.props.store.isSugestionsVis = true : this.props.store.isSugestionsVis = false;
    };

    onKeyPressHandler = (event: any)=>{
        if (event.which === 13){
            this.props.store.CountrySearchHandler();
        }
    };

    updateVal = (e:any)=>{
        if(this.props.store.selectedSugestion.length>0){
            e.target.value=this.props.store.selectedSugestion
            this.props.store.inputValue=e.target.value;
        };
        
        this.props.store.selectedSugestion=""
        this.props.store.isSugestionsVis=false;
        this.inputRef.current.input_.focus();
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
                        onKeyPress={this.onKeyPressHandler}
                        innerRef={this.inputRef}
                         />
                        <StyledBtn raised
                        onClick={this.props.store.CountrySearchHandler}>
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
    justify-content:center;
`

const StyledInput = styled(TextField)`
    margin-right:4%;
    &&{
    background-color:#fff;
    };
`

const StyledBtn = styled(Button)`
    &&{
        background-color:#333;
    };
`