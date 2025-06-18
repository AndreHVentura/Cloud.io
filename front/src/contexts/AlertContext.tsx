import { createContext, PropsWithChildren, useEffect, useState } from "react";

type AlertDataType = {
  wind: number;
  timestamp: string;
  message?: string;
  hasNotif: boolean;
  setHasNotif: (value: boolean) => void;
};

export const AlertContext = createContext<AlertDataType>({
    wind: 0,
    timestamp: "",
    message: undefined,
    hasNotif: false,
    setHasNotif: () => {}
});

export default function AlertProvider({children}: PropsWithChildren) {
    const [hasNotif, setHasNotif] = useState(false);
    const [wind, setWind] = useState(0);
    const [timestamp, setTimestamp] = useState("");
    const [message, setMessage] = useState<string | undefined>();

    useEffect(() => {
        async function fetchData() {
            const dados = await fetch("http://localhost:5000/api/sensors?page=1&limit=1");
            const json = await dados.json();
            
            let windAvgSpeed = json.data[0].wind_avg
            let timestamp = json.data[0].reading_time

            setWind(windAvgSpeed);
            setTimestamp(timestamp);

            if(windAvgSpeed >= 17) {
                setMessage("É perigoso navegar");
                setHasNotif(true);
            } else if(windAvgSpeed >= 10) {
                setMessage("Cuidado ao navegar");
                setHasNotif(true);
            } else {
                setMessage(undefined);
            }
        }

        fetchData()

        const intervalId = setInterval(() => {
          fetchData();
        }, 600000);

        return () => clearInterval(intervalId);
    }, []);

    return(
        <AlertContext.Provider value={{wind, timestamp, message, hasNotif, setHasNotif}}>
            {children}
        </AlertContext.Provider>
    )
}
