import { render } from 'react-dom';
import React, { createContext, useContext, useEffect } from 'react';

const ContainerContext = createContext(window.document);

export function renderWithContainerEvents(element, container, callback) {
  return render(
    <ContainerContext.Provider value={container}>
      {element}
    </ContainerContext.Provider>,
    container,
    callback,
  );
}

export function useContainerEvent(event, listener) {
  const container = useContext(ContainerContext);
  useEffect(() => {
    container.addEventListener(event, listener);
    return function cleanup() {
      container.removeEventListener(event, listener);
    };
  }, [event, listener]);
}
