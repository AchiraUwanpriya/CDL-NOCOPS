import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const [selectedTicketId, setSelectedTicketId] = useState('');
  const [selectedModel, setSelectedModel] = useState('U');
  const [selectedTab, setSelecteTab] = useState(2);
  

  return (
    <>
      <AppContext.Provider
        value={{
          setSelectedTicketId,
          setSelectedModel,
          setSelecteTab,
          selectedTicketId,
          selectedModel,
          selectedTab
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};
