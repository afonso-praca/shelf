import { actions, redux } from 'sdk';
import ShelfEditor from './ShelfEditor/ShelfEditor';

let components = [
  {
    name: 'ShelfEditor@vtex.shelf',
    constructor: ShelfEditor
  }
];

redux.store.dispatch(redux.actionCreators.component.register(components));
actions.ComponentActions.register(components);
