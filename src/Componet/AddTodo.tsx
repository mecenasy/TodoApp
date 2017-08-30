import * as React from 'react';
import { connect } from 'react-redux';

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
let nextId = 0;
const addTodo = (text: string) => {
    return {
        id: nextId++,
        text,
        type: 'ADD_TODO',
    };
};
export default connect()(AddTodo);
