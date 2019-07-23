import * as React from 'react';
import {
    List,
    ListItem,
} from '@rmwc/list';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import {Store} from '../../../store/store';
interface StoreProps {
    store: Store,
    onClick:any
};

@observer
export default class InputSuggestions extends React.Component<StoreProps,{}>{
  
    changeValueHandler = (e:any)=>{
        this.props.store.selectedSugestion=e.target.textContent;
    };

    render(){
            const suggestions = this.props.store.sugestions.map((el:string,id:number)=>{
                return(
                    <ListItem key={id}
                        onClick={this.props.onClick}
                        onFocus={this.changeValueHandler} >
                        {el}
                    </ListItem>
                );
            });

            return (
                < StyledSList >
                    {suggestions}
                </StyledSList >
            );
    };
};

const StyledSList = styled(List)`
    border:1px solid #ccc;
    border-radius:5%;
    display:flex;
    justify-content:center;
    font-size:0.7rem;
    margin: 3% 5%;
    padding:2px;
    width:78%;
   
    @media (min-width:470px)and (max-width:766px) {
                width:45%;
                margin: 3% auto;
    };      
    @media (min-width:767px) {
                width:30%;
                margin-top:2%;      
    };  
    @media (min-height:1023px) and (min-width:767px) {
        width:35%;
    };
`