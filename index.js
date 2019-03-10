import React, { createContext, useContext, useEffect } from 'react';

const ContainerContext = createContext(window.document);

export function ContainerEventsProvider({ container, children }) {
  return (
    <ContainerContext.Provider value={container}>
      {children}
    </ContainerContext.Provider>
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
