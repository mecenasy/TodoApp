import * as React from 'React';
import { CounterList, CounterListProps } from '../CounterList';
import { shallow } from 'enzyme';
import { SingleCounterState } from '../../constants';
import * as Action from '../../actions';
import { mountWithIntl } from './IntlHelper';
import { FormattedMessage } from 'react-intl';

describe('CounterList component', () => {
   let props: CounterListProps;
   let component;
   let counters: SingleCounterState[];
   describe('UI', () => {
      it('should render', () => {
         counters = [];
         props = {
            CounterList: counters,
            onAddCounter: Action.addCounter,
            onDecrement: Action.decrementCounter,
            onIncrement: Action.incrementCounter,
            onDeleteCounter: Action.removeCounter,
         };
         component = mountWithIntl(<CounterList {...props} />);
         expect(component.length).toBeGreaterThan(0);
      });
      it('should display only an add counter button if no counters are passed', () => {
         counters = [];
         props = {
            CounterList: counters,
            onAddCounter: Action.addCounter,
            onDecrement: Action.decrementCounter,
            onIncrement: Action.incrementCounter,
            onDeleteCounter: Action.removeCounter,
         };
         component = mountWithIntl(<CounterList {...props} />);
         expect(component.find('input')).toHaveLength(2);
         expect(component.find('ul')).toHaveLength(1);
         expect(component.find('ul').children()).toHaveLength(0);
      });

      it('should have an counter name FormattedMessage', () => {
         const p = component.find('form');
         const form = <FormattedMessage id={'xkom.components.counterList.counterName.message'} defaultMessage={''} />;
         expect(p.contains(form)).toBe(true);
      });
      it('should have an palceHolder FormattedMessage', () => {
         const p = component.find('form');
         const form = <FormattedMessage id={'xkom.components.counterList.placeHolder.message'} defaultMessage={''} />;
         expect(p.contains(form)).toBe(true);
      });
      it('If the input element input is empty it should show placeholder Podaj nazwę', () => {
         const inputs = component.find('input');
         const inputTapeText = inputs.at(0);
         const inputTapeSubmit = inputs.at(1);
         expect(inputTapeText.props()).toHaveProperty('placeholder', 'Podaj nazwę');
         expect(inputTapeText.props()).toHaveProperty('type', 'text');
         expect(inputTapeText.props()).toHaveProperty('value', '');
         expect(inputTapeSubmit.props()).toHaveProperty('value', 'Dodaj licznik');
         expect(inputTapeSubmit.props()).toHaveProperty('type', 'submit');
         expect(inputTapeSubmit.props()).toHaveProperty('disabled', true);
      });
      it('If the input element input contains Counter', () => {
         const input = component.find('input');
         input.value = 'Counter';
         expect(input.value).toBe('Counter');
      });
      describe('counters', () => {
         let listElements;
         beforeEach(() => {
            counters = [
               {
                  count: 1,
                  id: 0,
                  name: 'first counter',
               }, {
                  count: 3,
                  id: 1,
                  name: 'second counter',
               },
            ];
            props = {
               CounterList: counters,
               onAddCounter: Action.addCounter,
               onDecrement: Action.decrementCounter,
               onIncrement: Action.incrementCounter,
               onDeleteCounter: Action.removeCounter,
            };
            component = shallow(<CounterList {...props} />);
            listElements = component.find('li');
         });
         it('should have good ammount of counters rendered', () => {
            expect(listElements).toHaveLength(2);
         });
         it('should pass proper props', () => {
            const firstCounter = listElements.at(0).children();
            expect(firstCounter.props()).toHaveProperty('count', 1);
            expect(firstCounter.props()).toHaveProperty('name', 'first counter');
         });
      });
   });
});
