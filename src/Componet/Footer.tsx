import * as React from 'react';
import FilterLink from './FilterLink';
export default class Footer extends React.Component<{}, {}> {
    public render() {
        return (
            <p>
                Show: {' '}
                <FilterLink filter='all' >
                    All
                </FilterLink>
                {' '}
                <FilterLink filter='completed'  >
                    Complited
                </FilterLink>
                {' '}
                <FilterLink filter='active' >
                    Active
                </FilterLink>
            </p>
        );
    }
}
