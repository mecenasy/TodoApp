import * as React from 'react';
import Counter, { CounterProps } from './Counter';
import { CountersListState, SingleCounterState } from '../constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Action from '../actions';
import { ApplicationState } from '../../../store/reducers';
import { FormattedMessage } from 'react-intl';
import messages from './CounterList.messages';

export interface CounterListProps {
   CounterList: CountersListState;
   onAddCounter;
   onDecrement;
   onIncrement;
   onDeleteCounter;
}
const T = (translationObject: any): JSX.Element => <FormattedMessage {...translationObject} />;

// TODO: zastanowić się nad takimi stanami - co z nimi - wazne to jest state tylko i wyłącznie UI - wewnętrzny
export class CounterList extends React.Component<CounterListProps, { counterName: string }> {
   // TODO: czy tu nie należy mieć defaulta przyjmowanego?
   // constructor(props: CounterListProps, state = {counterName: ''}) {

   constructor(props: CounterListProps) {
      super(props);
      // TODO: bo to nie jest za ładne IMO
      this.state = { counterName: '' };
   }
   public componentWillMount() {
      Action.getCounters();
   }

   private handleChange = (e) => {
      this.setState({ counterName: e.target.value });
   }

   private handleSubmit = (e) => {
      e.preventDefault();
      this.props.onAddCounter(this.state.counterName);
      this.setState({ counterName: '' });
   }

   public componentDidUpdate(prevProps: CounterListProps, prevState: { counterName: string }) {
      if (prevProps.CounterList.length !== this.props.CounterList.length) {
         Action.getCounters();
      }
   }

   public render() {
      const { CounterList, onAddCounter, onDeleteCounter, onDecrement, onIncrement } = this.props;
      let counters;

      if (CounterList.length !== undefined) {
         counters = CounterList.map(c => {
            const props: CounterProps = {
               count: c.count,
               name: c.name,
               onDecrement: () => { onDecrement(c.id); },
               onIncrement: () => { onIncrement(c.id); },
               onDeleteCounter: () => { onDeleteCounter(c.id); },
            };
            return (
               <li key={c.id}>
                  <Counter {...props} />
               </li>);
         });
      }

      return (
         <div>
            <form onSubmit={this.handleSubmit}>{T(messages.name)}
               <FormattedMessage {...messages.placeholder}>{msg => (<input type="text" autoFocus={true} value={this.state.counterName} onChange={this.handleChange} placeholder={msg} />)}</FormattedMessage>
               <FormattedMessage {...messages.addcounter}>{msg => (<input type="submit" formMethod="POST" value={msg} disabled={this.state.counterName === ''} />)}</FormattedMessage>
            </form>
            <ul>
               {counters}
            </ul>
         </div>
      );
   }
}

const mapDispatchToProps = (dispatch) => ({
   onAddCounter(name: string) { dispatch(Action.addCounter(name)); },
   onDecrement(id: number) { dispatch(Action.decrementCounter(id)); },
   onIncrement(id: number) { dispatch(Action.incrementCounter(id)); },
   onDeleteCounter(id: number) { dispatch(Action.removeCounter(id)); },
});

const mapStateToProps = (state: ApplicationState) => {
   return {
      CounterList: state.counterApp,
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(CounterList);
