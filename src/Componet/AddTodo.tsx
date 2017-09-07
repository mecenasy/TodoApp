import * as React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../Action';
class AddTodo extends React.Component<{ dispatch: any }, {}> {

    public render() {
        let input: any;
        return (
            <div>
                <input ref={(node) => { input = node; }} />
                <button onClick={() => { this.props.dispatch(addTodo(input.value)); input.value = ''; }}>
                    AddTodo
                </button>
            </div>
        );
    }
}
export default connect()(AddTodo);
