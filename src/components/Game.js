import React, { useEffect, useState } from "react";
import CustomCard from "./CustomCard";
import { data } from "./data";
import { Box, Grid } from "@mui/system";
import { Button, Typography } from "@mui/material";
import ConfettiExplosion from "react-confetti-explosion";

function Game() {
  const [cardValues, setCardValues] = useState(null);
  const [openCards, setOpenCards] = useState([]);
  const [correctedCards, setCorrectedCards] = useState([]);
  const [flipToMemorize, setFlipToMemorize] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);

  const bigExplodeProps = {
    force: 0.6,
    duration: 5000,
    particleCount: 200,
    floorHeight: 1600,
    floorWidth: 1600,
  };

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

  useEffect(() => {
    setCardValues(shuffleArray(data));
    setCorrectedCards([]);
    setOpenCards([]);
    setIsWin(false);
    setFlipToMemorize(false);
    setTimeout(() => {
      setFlipToMemorize(true);
    }, 2000);
  }, [resetTrigger]);

  useEffect(() => {
    if (correctedCards.length === cardValues?.length / 2) {
      setIsWin(true);
    }
  }, [correctedCards, cardValues]);

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
  }, [openCards, cardValues]);

  const checkIsFlipped = (index) => {
    return (
      correctedCards.flatMap((val) => val).includes(index) ||
      openCards.flatMap((val) => val).includes(index)
    );
  };

  const handleClick = (value) => {
    if (correctedCards.flat().includes(value) || openCards.includes(value)) {
      return;
    }
    setOpenCards((prev) => (prev.length === 1 ? [...prev, value] : [value]));
  };

  const handleRetry = () => {
    setResetTrigger((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#282c34",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          marginBottom: 3,
          fontFamily: "Monospace",
        }}
      >
        Memory Game
      </Typography>
      {isWin && (
        <>
          <ConfettiExplosion {...bigExplodeProps} />
          <Typography
            variant="h4"
            sx={{
              color: "#4caf50",
              animation: "fadeIn 2s ease-in-out",
              marginTop: 3,
            }}
          >
            You Win! 🎉
          </Typography>
        </>
      )}
      <Box sx={{ width: 250, height: 100, marginTop: 10 }}>
        <Grid container spacing={2}>
          {cardValues?.map((val, index) => (
            <CustomCard
              key={index}
              value={val}
              onClick={handleClick}
              index={index}
              isFlipped={!checkIsFlipped(index) && flipToMemorize}
            />
          ))}
        </Grid>
      </Box>
      {isWin && (
        <Button
          variant="text"
          size="small"
          onClick={handleRetry}
          sx={{
            marginTop: 15,
            fontSize: "1.25rem",
            backgroundColor: "#1976d2",
            color: "#fff",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
          }}
        >
          ⟳
        </Button>
      )}
    </Box>
  );
}

export default Game;
