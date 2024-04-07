import React from 'react';
import { useState,useRef, useEffect } from 'react'

const BASE_URL = "https://localhost:7148";

interface KeysDropDownProps {
    label: string;
    onClick: () => void;
  }

interface Key {
  notes: string;
}

const KeysDropDown: React.FC<KeysDropDownProps> = ({ label, onClick }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Key[]>([])
  
    const [error, setError] = useState();
  
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

    return (<select>
        {data.map(item => (
        <option value={item.notes}>{item.notes}</option>
        ))}
        </select>);
}

export default KeysDropDown;