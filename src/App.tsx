import * as React from 'react';
import Layout from './components/Layout'
import {observer, Provider} from 'mobx-react';
import store from './store/store';


@observer
export class App extends React.Component<{}, {}> {
  render() {
    return (
         <Provider store={store}>
            <Layout store={store}/>
         </Provider>
    )
  }
}
