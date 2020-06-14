import { useEffect, useState } from "react";

import { IOfflineData } from "./../types";

type TypeProps = [
  IOfflineData | null,
  (data: IOfflineData) => void,
  () => void,
];

export const useOfflineHook = (): TypeProps => {
  const [offlineData, setData] = useState<IOfflineData | null>(null);

  useEffect(() => {
    try {
      const { offline } = localStorage;
      if (offline) {
        setData(JSON.parse(offline));
      }
    } catch (e) {
      console.error("Failed to access local storage");
    }
  }, []);

  const setOfflineData = (data: IOfflineData) => {
    try {
      localStorage.offline = JSON.stringify(data);
      setData(data);
    } catch (e) {
      console.error("Unable to write to localstorage");
    }
  };

  const clearOffline = () => {
    delete localStorage.offline;
    setData(null);
  };

  return [offlineData, setOfflineData, clearOffline];
};
