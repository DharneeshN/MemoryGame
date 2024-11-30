import React, { useEffect, useState } from "react";
import CustomCard from "./CustomCard";
import { data } from "./data";
import { Box, Grid } from "@mui/system";

function Game() {
  const [cardValues, setCardValues] = useState(null);
  const [openCards, setOpenCards] = useState([]);
  const [correctedCards, setCorrectedCards] = useState([]);
  const [flipToMemorize, setFlipToMemorize] = useState(true);
  const [successMessage, setSuccessMessage] = useState(false);
  console.log(cardValues, correctedCards.length, "correctedCards");

  useEffect(() => {
    setCardValues(shuffleArray(data));
    setTimeout(() => {
      setFlipToMemorize(false);
    }, 1000);
  }, []);
  // console.log(cardValues / 2, "ds");

  useEffect(() => {
    if (correctedCards.length === cardValues?.length / 2) {
      setSuccessMessage(true);
    }
  }, [correctedCards]);

  function shuffleArray(datas) {
    let options = datas.flatMap((i) => [i, i]);
    for (var i = options?.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = options[i];
      options[i] = options[j];
      options[j] = temp;
    }
    return options;
  }

  const handleClick = (value) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, value]);
    } else {
      setOpenCards([value]);
    }
  };

  const checkIsFlipped = (index) => {
    return (
      correctedCards.flatMap((val) => val).includes(index) ||
      openCards.flatMap((val) => val).includes(index)
    );
  };

  useEffect(() => {
    if (openCards.length === 2) {
      const [first, second] = openCards;
      if (cardValues[first] === cardValues[second]) {
        setCorrectedCards((prev) => [...prev, [first, second]]);
      }
      if (cardValues[first] !== cardValues[second]) {
        setTimeout(() => {
          setOpenCards([]);
        }, 1000);
      }
    }
  }, [openCards]);

  return (
    <div>
      {successMessage && <h1>namma jeichitom maara</h1>}
      <Box
        sx={{
          width: 250,
          height: 20,
          borderRadius: 1,
        }}
      >
        <Grid container spacing={2}>
          {cardValues?.map((val, index) => {
            return (
              <CustomCard
                key={index}
                value={val}
                onClick={handleClick}
                index={index}
                isFlipped={checkIsFlipped(index) || flipToMemorize}
              />
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default Game;
