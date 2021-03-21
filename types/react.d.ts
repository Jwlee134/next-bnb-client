declare module "redux-persist/integration/react" {
  import { ReactNode } from "react";
  import { Persistor } from "redux-persist/es/types";

  /** @see PersistGate */
  interface PersistGateProps {
    persistor: Persistor;
    onBeforeLift?(): void | Promise<void>;
    children?: ReactNode | ((bootstrapped: boolean) => ReactNode);
    loading?: ReactNode;
  }

  /** @see PersistGate */
  interface PersistorGateState {
    bootstrapped: boolean;
  }

  /**
   * @see Persistor
   * @see Persistor
   * @see PersistGateProps
   * @see PersistGateState
   */
  class PersistGate extends React.PureComponent<
    PersistGateProps,
    PersistorGateState
  > {}
}
