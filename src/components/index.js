import 'matchmedia-polyfill';
import { actions } from 'sdk';
import Shelf from './Shelf/Shelf';

let components = [
  {
    name: 'Shelf@pilateslovers.shelf',
    constructor: Shelf
  }
];

actions.ComponentActions.register(components);
