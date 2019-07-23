import * as React from 'react';
import styled from 'styled-components';
import {
    Toolbar,
    ToolbarRow,
    ToolbarTitle
} from '@rmwc/toolbar';
import { Icon } from '@rmwc/icon';

export default class Header extends React.Component<{},{}>{
    render(){
        return(
            <StyledToolbar>
                <StyledToolbarRow>
                    <Title >
                        <StyledIcon icon="code" iconOptions={{strategy: 'ligature'}} />
                        Most polluted cities
                    </Title >
                </StyledToolbarRow>
            </StyledToolbar>
        );
    };
};

const StyledToolbarRow = styled(ToolbarRow)`
    display:flex;
    justify-content:center;
`

const StyledToolbar = styled(Toolbar)`
    background-color:#333;
    margin-bottom:3%; 
    `

const Title = styled(ToolbarTitle)`
    display:flex;
    align-items:center;
    justify-content:center;
    width:80%;
    font-size:1.2rem;
    @media (min-width: 525px) {
        font-size:1.6rem;
    };
`
const StyledIcon = styled(Icon)`
    &&{
        font-size:2rem;
        margin-right:2%;
    };
`