import { useEffect, useState } from "react";
import Title from "./components/Title";
import Loader from "./components/Loader";
import Item from "./components/Item";
import RegenerateButton from "./components/RegenerateButton";
import type { ICohoiResponse } from "@cohoi/common/types";

const RANDOM_ITEM_URL = "http://localhost:3000/randomItem";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [item, setItem] = useState<ICohoiResponse>();
  const [triggerCount, setTriggerCount] = useState(0);

  function regenerate() {
    setTriggerCount(triggerCount + 1);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setItem(undefined);
        setError(undefined);
        setIsLoading(true);
        const response = await fetch(RANDOM_ITEM_URL);
        const data = await response.json();
        setItem(data);
      } catch (e) {
        console.error(e);
        if (e instanceof Error) {
          setError(e);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [triggerCount]);

  return (
    <>
      <main>
        <Title />
        {isLoading && <Loader />}
        {item && <Item item={item} />}
        {error && <div>Error, try again !</div>}
        {!isLoading && <RegenerateButton handler={regenerate} />}
      </main>
    </>
  );
}

export default App;
