import { useEffect, useState } from "react";

function ArticleDetail() {
  const [article, setArticle] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/home/story/66602dc1ffa5714637243b76", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        Authorization:
          "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjU2MWFjZTQ1ZTZiZmMzZDY1ZTZmNzciLCJ1c2VybmFtZSI6IjFvbGVsbGxrYSIsImlhdCI6MTcxNzc1MjAyNSwiZXhwIjoxNzE3NzU1NjI1fQ.fjPkVuLWJsyqDTaPeVdrjV94L2yX2BCqW3vkxdvh8Os",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setArticle(data);
      });
  }, []);

  return (
    <>
      <div>
        <h1>{article.title}</h1>
        <h4>Published by: {article.author}</h4>
        <img src={article.urlToImage} width={300} height={300} />
        <p>{article.content}</p>
      </div>
    </>
  );
}

export default ArticleDetail;
