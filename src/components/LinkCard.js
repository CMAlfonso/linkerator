import React from "react";

const LinkCard = ({
    url,
    comment
}) => {
    return (
        <div className="link-card">
            <h2 className="url">{url}</h2>
            <p className="comment">{comment}</p>
            {/* <p className="click-count">Site Click Count: {clickCount}</p>
            <p className="date-shared">{dateShared}</p> */}
        </div>
    )
}

export default LinkCard;