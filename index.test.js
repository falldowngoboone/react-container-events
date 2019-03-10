import React from 'react';
import { renderWithContainerEvents, useContainerEvent } from './index.js';

test('Custom events dispatched on container trigger useContainerEvent listeners', () => {
  const container = document.createElement('div');
  const spy = jest.fn();
  document.body.appendChild(container);

  renderWithContainerEvents(<Component />, container);
  // force a rerender since useEffect is asyncrhonous to prevent render blocking
  renderWithContainerEvents(<Component />, container);

  container.dispatchEvent(new CustomEvent('test'));

  expect(spy).toHaveBeenCalled();

  function Component() {
    useContainerEvent('test', spy);
    return <div />;
  }
});
