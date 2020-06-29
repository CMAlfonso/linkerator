import React from "react";
import ReactDOM from "react-dom";

import './index.css';

import {
    NewLinkForm,
    SearchBar,
    SearchResults
} from "./components";

const App = () => {
    return (
        <div>
            <h1>The Great Linkerator</h1>
            <NewLinkForm />
            <SearchBar />
            <SearchResults />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));