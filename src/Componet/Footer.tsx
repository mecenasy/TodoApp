import * as React from 'react';
import { connect } from 'react-redux';

import Link from './Link';
export default class Footer extends React.Component<{}, {}> {
    public render() {
        return (
            <p>
                Show: {' '}
                <FilterLink filter='SHOW_ALL' >
                    All
                </FilterLink>
                {' '}
                <FilterLink filter='SHOW_COMPLITED' >
                    Complited
                </FilterLink>
                {' '}
                <FilterLink filter='SHOW_ACTIVE' >
                    Active
                </FilterLink>
            </p>
        );
    }
}

const setVisibleFilter = (filter: string) => {
    return {
        filter,
        type: 'SET_VISIBILITY_FILTER',
    };
};
const mapsStateToLinkProps = (state: any, ownProps: {filter: string}) => {
    return {
        active: ownProps.filter === state.visibilityFlter,
    };
};

const mapDispatchToLinkProps = (dispatch: any, ownProps: {filter: string}) => {
    return {
        onClick: () => {
            dispatch(setVisibleFilter(ownProps.filter));
        },
    };
};
const FilterLink = connect(
    mapsStateToLinkProps,
    mapDispatchToLinkProps,
)(Link);
