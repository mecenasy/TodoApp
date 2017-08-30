import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import App from '../App';
interface IRoot {
    store: any
}
export default class Root extends React.Component<IRoot, {}> {

    public render() {
        let history = createBrowserHistory();
        return (
            <Provider store={this.props.store}>
                <Router history={history}>
                    <Route path='/' component={App} />
                </Router>
            </Provider>
        );
    }
}
