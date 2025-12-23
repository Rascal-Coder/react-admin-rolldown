import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from "react";

export enum SignInStateEnum {
  LOGIN = 0,
  MOBILE = 1,
  QR_CODE = 2,
}

interface SignInContextType {
  signInState: SignInStateEnum;
  setSignInState: (signInState: SignInStateEnum) => void;
  backToSignIn: () => void;
}
const SignInContext = createContext<SignInContextType>({
  signInState: SignInStateEnum.LOGIN,
  setSignInState: () => {},
  backToSignIn: () => {},
});

export function useSignInContext() {
  const context = useContext(SignInContext);
  return context;
}

export function SignInProvider({ children }: PropsWithChildren) {
  const [signInState, setSignInState] = useState(SignInStateEnum.LOGIN);

  const backToSignIn = () => setSignInState(SignInStateEnum.LOGIN);

  const value: SignInContextType = {
    signInState,
    setSignInState,
    backToSignIn,
  };

  return (
    <SignInContext.Provider value={value}>{children}</SignInContext.Provider>
  );
}
