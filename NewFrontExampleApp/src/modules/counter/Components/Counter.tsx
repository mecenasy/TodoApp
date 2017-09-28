import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './Counter.messages';

export interface CounterProps {
   name: string;
   count: number;
   onIncrement;
   onDecrement;
   onDeleteCounter?;
}

// TODO: sample Translate function for future purposes - should be probably moved to some GLOBAL scope
const T = (translationObject: any): JSX.Element => <FormattedMessage {...translationObject} />;

export default class Counter extends React.PureComponent<CounterProps> {
   public render() {
      const {
         count,
         name,
         onIncrement,
         onDecrement,
         onDeleteCounter,
      } = this.props;
      return (
         <div>
            <h1>{T(messages.title)}</h1>
            <p><FormattedMessage {...messages.name} />: {name}</p>
            <p><FormattedMessage {...messages.count} />: {count}</p>
            <button onClick={onIncrement}><FormattedMessage {...messages.increment} /></button>
            <button onClick={onDecrement}><FormattedMessage {...messages.decrement} /></button>
            {onDeleteCounter && <button onClick={onDeleteCounter}><FormattedMessage {...messages.deleteCounter} /></button>}
         </div>
      );
   }
}
