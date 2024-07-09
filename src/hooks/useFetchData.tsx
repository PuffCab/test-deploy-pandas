import { useEffect, useState } from "react";

type HookReturn<T> = {
  data: T | null;
  isLoading: boolean;
  error: string;
};

function useFetchData<T>(url: string): HookReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!url || typeof url !== "string") {
        // throw new Error("you need a UIRL");
        setError("No VALID URL provided");
      }
      try {
        const response = await fetch(url);
        //handle error in case response is not ok
        if (!response.ok) throw new Error("something went wrong");
        const result = (await response.json()) as T;
        console.log("result :>> ", result);
        setData(result);
      } catch (e) {
        console.log("error :>> ", e);
        const error = e as Error;
        setError(error.message);
      } finally {
        if (url === "https://jsonplaceholder.typicode.com/users/1") {
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        } else {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

export default useFetchData;
