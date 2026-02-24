import { createContext, useContext, useState } from "react";

interface LoaderContextValue {
  isLoaderDone: boolean;
  markLoaderDone: () => void;
}

const LoaderContext = createContext<LoaderContextValue>({
  isLoaderDone: false,
  markLoaderDone: () => {},
});

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoaderDone, setIsLoaderDone] = useState(false);
  const markLoaderDone = () => setIsLoaderDone(true);

  return (
    <LoaderContext.Provider value={{ isLoaderDone, markLoaderDone }}>
      {children}
    </LoaderContext.Provider>
  );
}

/** Returns true once the intro video / loader has finished or been skipped. */
export function useLoaderDone() {
  return useContext(LoaderContext).isLoaderDone;
}

export { LoaderContext };
