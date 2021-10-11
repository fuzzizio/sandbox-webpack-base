import { initializeSentry } from './sentry';
import { join } from 'lodash';
import './style.css';
import logo from './webpack-logo.svg';
import { print } from './print.js';

initializeSentry();
// myUndefinedFunction();

function component() {
  const element = document.createElement('div');
  element.innerHTML = join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  const image = new Image();
  image.src = logo;
  image.width = 122;
  image.height = 35;
  element.appendChild(image);

  print()

  return element;
}

document.getElementById('app').appendChild(component());
