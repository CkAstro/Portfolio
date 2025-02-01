import { About } from './About';
import { Contact } from './Contact';
import { Home } from './Home';
import { Portfolio } from './Portfolio';
import { Research } from './Research';

const contentDict = {
   Home,
   About,
   Portfolio,
   Research,
   Contact,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const content = Object.entries(contentDict).map(([id, Component]) => (
   <Component key={id} id={id} />
));
