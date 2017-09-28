import * as React from 'React';
import Counter from '../Counter';
import { shallow } from 'enzyme';
import { mountWithIntl } from './IntlHelper';
import { FormattedMessage } from 'react-intl';

// const createComponentWithIntl = (children, props = { locale: 'pl' }) => {
//    return create(
//       <IntlProvider {...props}>
//          {children}
//       </IntlProvider>
//    );
// };

// const shallowWithIntl = (children, props = { locale: 'pl' }) => {
//    return shallow(
//       <IntlProvider {...props}>
//          {children}
//       </IntlProvider>
//    );
// }

describe('Counter component`s', () => {
   let component;
   let actions;
   beforeEach(() => {
      actions = {
         onIncrement: jest.fn(),
         onDecrement: jest.fn(),
         onDeleteCounter: jest.fn(),
      };
      component = mountWithIntl(<Counter {...actions} {...{} as any} />);
      // console.log(component);
      // component = shallowWithIntl(<Counter {...actions} {...{} as any} />);
      // component = createComponentWithIntl(<Counter {...actions} {...{} as any} />)
   });

   describe('UI', () => {
      it('should render', () => {
         expect(component.length).toBeGreaterThan(0);
      });
      it('contains a h1 title', () => {
         expect(component.find('h1')).toHaveLength(1);
      });
      it('contains 3 buttons', () => {
         expect(component.find('button')).toHaveLength(3);
      });
      describe('buttons', () => {
         let buttons;
         beforeEach(() => {
            buttons = component.find('button');
         });
         describe('first button', () => {
            let button;
            beforeEach(() => {
               button = buttons.at(0);
            });
            it('should have an increment label', () => {
               expect(button.text()).toBe('Zwiększ');
            });
            it('should call increment', () => {
               button.simulate('click');
               expect(actions.onIncrement).toBeCalled();
            });
            it('should have an increment FormattedMessage', () => {
               const form = <FormattedMessage id={'xkom.components.counter.increment.message'} defaultMessage={'counter.increment.message'} />;
               expect(button.contains(form)).toBe(true);
            });
         });

         describe('second button', () => {
            let button;
            beforeEach(() => {
               button = buttons.at(1);
            });

            it('should have an decrement label', () => {
               expect(button.text()).toBe('Zmniejsz');
            });
            it('should have an decrement FormattedMessage', () => {
               const form = <FormattedMessage id={'xkom.components.counter.decrement.message'} defaultMessage={''} />;
               expect(button.contains(form)).toBe(true);
            });
            it('should call decrement', () => {
               button.simulate('click');
               expect(actions.onDecrement).toBeCalled();
            });
         });

         describe('third button', () => {
            let button;
            beforeEach(() => {
               button = buttons.at(2);
            });

            it('should have a delete label', () => {
               expect(button.text()).toBe('Usuń licznik');
            });
            it('should have an deleteCounter FormattedMessage', () => {
               const form = <FormattedMessage id={'xkom.components.counter.deleteCounter.message'} defaultMessage={''} />;
               // console.log(button);
               expect(button.contains(form)).toBe(true);
            });
            it('should call delete counter', () => {
               button.simulate('click');
               expect(actions.onDeleteCounter).toBeCalled();
            });
         });
      });
   });
});
