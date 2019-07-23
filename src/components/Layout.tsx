import * as React from 'react';
import {observer} from 'mobx-react';
import Header from './Header';
import Core from './core/Core' ;
import store, {Store} from '../store/store';
import styled from 'styled-components';

 interface LayoutProps {
    store: Store;
  };

@observer  
export default class Layout extends React.Component<LayoutProps,{}>{
   
    render(){
        return(
            <Container>
                <Header/>
                <Core store={store}/>
            </Container>
        );
    };
};

const Container=styled.div`
display:flex;
flex-direction:column;
align-items:center;
height:100vh;
`

