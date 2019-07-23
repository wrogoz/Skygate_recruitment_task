import * as React from 'react';
import {
    ListGroup,
    ListDivider,
    ListItem,
    ListItemGraphic,
} from '@rmwc/list';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import axios from 'axios';

interface listItemsProps{
    city:string,
    unit:string,
    value:number
}
interface listItemsState {
    visibility: boolean;
    city: string;
    description: string;
}

@observer
export default class CityListItem extends React.Component<listItemsProps, listItemsState>{
    description:string;
    visibility:boolean;
    _isMounted:boolean;
    constructor(props: listItemsProps) {
        super(props);
    this._isMounted=false;   
        this.state={
            visibility:false,
            city:this.props.city,
            description:"",
        };
    };

    // api get description 

    componentDidUpdate(){
        this._isMounted=true;
        const url = `https://en.wikipedia.org/w/api.php?action=query&prop=description&titles=${this.props.city}&format=json&origin=*&formatversion=2`;

        axios.get(url)
            .then( (res) => {
                if(this._isMounted){
                    if(res.data.query.pages[0].description.length>0){
                    this.setState({description:res.data.query.pages[0].description})
                    }else{
                    this.setState({description:"There is no description in mediawiki... yet:)"})
                }
            };
            })
            .catch( () => {
                this.setState({description:"There is no description in mediawiki... yet :)"})
            });
    };
    
    componentWillUnmount(){
        this._isMounted=false;
    };

    showDescriptionHandler = ()=>{
        this.setState({visibility:!this.state.visibility})  
    };

    render() {
            return (
                <StyledListBox key = { this.props.city }>
                    <StyledListItem onClick = { this.showDescriptionHandler } >
                        <ListItemGraphic icon="place" />
                        <span>
                            { this.props.city } 
                        </span>
                        <Parameters>
                            pm25 = { this.props.value } { this.props.unit } 
                        </Parameters>
                        { this.state.visibility ? <StyledInfo icon="arrow_upward"/> : <StyledInfo icon="arrow_downward" />}
                    </StyledListItem>
                    <ListDivider />
                    { this.state.visibility ? <StyledDescription> {this.state.description} </StyledDescription> : null }
                </StyledListBox>
            );
        };
};

const StyledListBox=styled(ListGroup)`
    display:flex;
    flex-direction:column
`

const StyledInfo = styled(ListItemGraphic)`
    &&{
        font-size:2rem;
        color:#661fff;
    };
`

const StyledListItem = styled(ListItem)`
    width:100%; 
`

const Parameters = styled.div`
    display:flex;
    justify-content:flex-end;
    width:100%;
    padding-right:5%;
    font-size:0.65rem;
    @media (min-width: 768px) {
            font-size:1rem;
    };
`

const StyledDescription = styled.p`
    display:flex;
    justify-content:center;
`



