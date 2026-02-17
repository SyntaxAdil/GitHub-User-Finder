import { useEffect, useState } from "react";
import UserCarts from "../components/UserCarts";

const HomePage = () => {
  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [user, setUser] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  let perPage = 10;
  let maxPage = Math.min(Math.ceil(totalCount / perPage), 10);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const url = `https://api.github.com/search/users?q=${query}&per_page=${perPage}&page=${currentPage}`;
        const res = await fetch(url);
        const data = await res.json();
        setUser(data.items || []);
        setTotalCount(data.total_count);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchData();
  }, [query, currentPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(input);
    setCurrentPage(1);
  };

  return (
<section className="container">
  <h2 className="title"><img src="/github.png" alt="" /> User Finder</h2>
  <p className="subtitle">Search any Github user profile</p>

  <form onSubmit={handleSubmit} className="search-form">
    <input
      type="text"
      onChange={(e) => setInput(e.target.value)}
      placeholder="Enter Github username..."
      className="search-input"
    />
    <button className="search-btn">Search</button>
  </form>

  {isLoading && <p className="loading">Loading....</p>}
  {error && <p className="error">{error.message}</p>}

 {totalCount===0 && <p className="no-result-err">No result found</p>}
  <div className="user-grid">
    {user.map((githubUser) => (
     <UserCarts githubUser={githubUser} />
    ))}
  </div>

  {user.length > 0 && (
    <div className="pagination">
      <button
        onClick={() => setCurrentPage((prev) => prev - 1)}
        disabled={currentPage === 1}
      >
        ◀
      </button>

      <span >{currentPage<10 ? "0"+currentPage :currentPage}</span>

      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={currentPage === maxPage}
      >
        ▶
      </button>
    </div>
  )}



  <p id="copy"><small>&copy;{new Date().getFullYear() }; <a  target="_blank"href="https://github.com/SyntaxAdil">Abdur Rahman Adil</a></small></p>
</section>

  );
};

export default HomePage;
