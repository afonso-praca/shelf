import { actions } from 'sdk';
import ShelfEditor from './ShelfEditor/ShelfEditor';

let components = [
  {
    name: 'ShelfEditor@pilateslovers.shelf',
    constructor: ShelfEditor
  }
];

actions.ComponentActions.register(components);
