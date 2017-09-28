// TODO move to npm package
import { shallow, mount, render } from 'enzyme';
import * as React from 'React';
import { IntlProvider, FormattedMessage, intlShape } from 'react-intl';

import { translationMessages } from '../../../../languages';

const intlProvider = new IntlProvider({ locale: 'pl', messages: translationMessages.pl }, {});
const { intl } = intlProvider.getChildContext();

export function nodeWithIntlProp(node) {
   return React.cloneElement(node, { intl });
}

export function mountWithIntl(node) {
   return mount(nodeWithIntlProp(node), {
      context: { intl },
      childContextTypes: { intl: intlShape },
   });
}
