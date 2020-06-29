import React, {useState, useEffect} from "react";

import axios from "axios";
import LinkCard from "./LinkCard";

const SearchResults = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/links").then((response) => {
        const results = response.data.links;
        console.log(results)

        setResults(results);
      })
    }, [])

    return(
        <div className="search-results">
            Search Results!
            {results.map(link => (
                <LinkCard
                    key={link.id}
                    {...link} />
            ))}
        </div>
    )
}

export default SearchResults;