import * as React from 'react';
import {List} from '@rmwc/list';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import CityListItem from './CityList--items';

interface MainListProps{
    
    store:any
}
@observer
export default class MainList extends React.Component<MainListProps, {}>{

    constructor(props: any) {
        super(props);
    };

   
    render() {
        const list = this.props.store.airQData.map((el: any) => {
            el.value = parseFloat(el.value).toFixed(1);
            
            return (
                <CityListItem 
                key={el.city}
                city={el.city}
                value={el.value}
                unit={el.unit}
                />
            )

        });
        return (
            
                <StyledList twoLine avatarList>
                    {list}
                </StyledList>
           
        );
    };
};


const StyledList = styled(List)`
    width:80%;    
    margin-top:3%;
    @media (min-width: 768px) {
            width:50%;
    };
`





