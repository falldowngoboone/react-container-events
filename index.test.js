import React from 'react';
import { render } from 'react-dom';
import { ContainerEventsProvider, useContainerEvent } from './index.js';

test('Custom events dispatched on container trigger useContainerEvent listeners', () => {
  const container = document.createElement('div');
  const spy = jest.fn();
  document.body.appendChild(container);

  render(
    <ContainerEventsProvider container={container}>
      <Component />
    </ContainerEventsProvider>,
    container,
  );
  // force a rerender since useEffect is asyncrhonous to prevent render blocking
  render(
    <ContainerEventsProvider container={container}>
      <Component />
    </ContainerEventsProvider>,
    container,
  );

  container.dispatchEvent(new CustomEvent('test'));

  expect(spy).toHaveBeenCalled();

  function Component() {
    useContainerEvent('test', spy);
    return <div />;
  }
});
