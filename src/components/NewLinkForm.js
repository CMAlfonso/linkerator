import React from "react";
import axios from "axios";
import { response } from "express";

const NewLinkForm = () => {
    async function handleSubmit(event) {
        event.preventDefault();


    }

    return (
        <div className="new-link-form">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="site url" />
                <input
                    type="text"
                    placeholder="comments" />
                <input
                    type="text"
                    placeholder="tags" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewLinkForm;