import * as React from 'react';
interface ILink {
    active: boolean;
    onClick: () => void;
}

export default class Link extends React.Component<ILink, {}> {
    public render() {
        const {
            active,
            onClick,
            children,
            } = this.props;
        if (active) {
            return <span>{children}</span>;
        }
        return (
            <a href='#' onClick={() => { onClick(); }}>{children}</a>
        );
    }
}
