import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface IFilterLink {
    filter: string;
    children: any;
}
export default class FilterLink extends React.Component<IFilterLink, {}> {
    public render() {
        const {
            children,
            filter,
        } = this.props;
        return (
            <NavLink
                strict
                to={'/' + filter}
                activeStyle={{ textDecoration: 'none', color: 'blue' }}>
                {children}
            </NavLink>
        );
    }
}
