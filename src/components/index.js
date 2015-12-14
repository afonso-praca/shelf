import { actions, redux } from 'sdk';
import Shelf from './Shelf/Shelf';

let components = [
  {
    name: 'Shelf@vtex.shelf',
    constructor: Shelf,
  }
];

redux.store.dispatch(redux.actionCreators.component.register(components));
actions.ComponentActions.register(components);
