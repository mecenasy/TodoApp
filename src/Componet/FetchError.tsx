import * as React from 'react';

interface IFetchError {
    message: string;
    onReady: any;
}
export default class FetchError extends React.Component<IFetchError, {}> {
    public render() {
        return (
            <div>
                <p>Could not fetch todos {this.props.message}</p>
                <button onClick={this.props.onReady}>Retry</button>
            </div>
        );
    }
}
