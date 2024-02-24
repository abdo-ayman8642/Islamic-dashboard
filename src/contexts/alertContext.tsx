import { createContext, useContext, useState } from "react";



export interface AlertObj {
  open: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

type AlertContextType = {
  alert: AlertObj | null;
  setAlert: (site: AlertObj | null) => void;
};

const AlertContextDefaultValues: AlertContextType = {
  alert: { open: false, message: "", type: "success" },
  setAlert: () => { },
};

const AlertContext = createContext<AlertContextType>(AlertContextDefaultValues);

export function useAlert() {
  return useContext(AlertContext);
}

interface Props {
  children: React.ReactNode;
}

interface IState {
  alert: AlertObj | null;
}

const INITIAL_STATE: IState = {
  alert: { open: false, message: "", type: "success" }
};

export const AlertProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState<IState>(INITIAL_STATE);
  const { alert } = state;

  const setAlert = (alert: AlertObj | null) => setState({ ...state, alert });
  const value = { alert, setAlert };

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
};
