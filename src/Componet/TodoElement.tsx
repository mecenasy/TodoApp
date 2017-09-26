import * as React from 'react';

interface ITodoElement {
    key: number
    id: number;
    text: string;
    completed: boolean;
    onClick: () => void;
}
export default class TodoElement extends React.PureComponent<ITodoElement, {}> {
    public render() {
        const {
            completed,
            onClick,
            text,
    } = this.props;
        return (
            <li style={{ textDecoration: completed ? 'line-through' : 'none' }} onClick={onClick} >
                {text}
            </li>
        );
    }
}
