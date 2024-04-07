import { useState,useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const BASE_URL = "https://localhost:7148";

interface Key {
  notes: string;
}

function App() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0)
  const [data, setData] = useState<Key[]>([])

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/keys`, {
                    signal: abortControllerRef.current?.signal,
        });
        const jsonData = await response.json() as Key[];
        setData(jsonData);
//        if (!response.ok) {
//          throw new Error('Network response was not ok');
//        }
      } catch (e: any) {
        if (e.name === "AbortError") {
          console.log("Aborted");
          return;
        }

        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Something went wrong! Please try again.</div>;
  }

  return (
    <>
      <select>
        {data.map(item => (
          <option value={item.notes}>{item.notes}</option>
        ))}
      </select>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
