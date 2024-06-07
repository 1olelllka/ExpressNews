import { useState } from "react";
import "./App.css";
import ArticleDetail from "./components/pages/articleDetail";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <ArticleDetail />
      </div>
    </>
  );
}

export default App;
