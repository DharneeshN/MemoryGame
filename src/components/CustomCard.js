import { Card, CardContent } from "@mui/material";
import React from "react";

function CustomCard(props) {
  const { value, index, onClick, isFlipped } = props;

  function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  return (
    <>
      <Card
        sx={{
          width: "50px",
          height: "50px",
          cursor: "pointer",
          display: "flex",
        }}
        onClick={() => {
          onClick(index);
        }}
      >
        <div className={`card ${!isFlipped ? "" : "flipped"}`}>
          <div className="card-inner">
            <CardContent className="card-front">
              {decodeHtml(value.image)}
            </CardContent>
            <CardContent className="card-back"></CardContent>
          </div>
        </div>
      </Card>
    </>
  );
}

export default CustomCard;
