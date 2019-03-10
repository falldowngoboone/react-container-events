# React Container Events

Trigger custom events in a React app from outside the app.

## Usage

First, render your app with the Container Events context provider:

```js
// index.js
import React from 'react';
import { render } from 'react-dom';
import { ContainerEventsProvider } from './path/to/react-container-events';
import App from './App';

const root = document.getElementById('react-app-root-id');

render(
  <ContainerEventsProvider container={root}>
    <App />
  </ContainerEventsProvider>,
  root,
);
```

Next, register an event listener with the container event hook:

```js
// MyComponent.js
import { useContainerEvent } from './path/to/react-container-events';

function MyComponent() {
  useContainerEvent('myCustomEvent', function() {
    // do side effects here...
  });
  return <div>Component stuff</div>;
}
```

Finally, outside of the React DOM, simply dispatch this custom event from a DOM event:

```js
const button = document.getElementById('custom-event-trigger');
const reactContainer = document.getElementById('react-app-root-id');
button.addEventListener('click', function() {
  // Note: CustomEvent constructor requires a polyfill for IE
  reactContainer.dispatchEvent(new CustomEvent('myCustomEvent'));
});
```

You can pass data into the event by adding `detail` to the init object of CustomEvent.
