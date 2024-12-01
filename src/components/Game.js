import React, { useEffect, useState } from "react";
import CustomCard from "./CustomCard";
import { data } from "./data";
import { Box, Container, Grid } from "@mui/system";
import { Button, Typography } from "@mui/material";
import ConfettiExplosion from "react-confetti-explosion";
import mainLogo from "../components/logo.png";

function Game() {
  const [cardValues, setCardValues] = useState(null);
  const [openCards, setOpenCards] = useState([]);
  const [correctedCards, setCorrectedCards] = useState([]);
  const [incorrectMoves, setIncorrectMoves] = useState(0);
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
    setIncorrectMoves(0);
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
          setIncorrectMoves((prev) => prev + 1);
          setOpenCards([]);
        }, 500);
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
        backgroundColor: "rgb(81 155 144)",
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Memory Game
        <img
          src={mainLogo}
          width={50}
          height={50}
          style={{ marginLeft: "10px" }}
          alt="memoryGame"
        />
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        flexWrap="nowrap"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={4} md={3}>
          <Container
            maxWidth="sm"
            sx={{
              fontFamily: "Monospace",
              textAlign: "center",
            }}
          >
            Pairs Matched : {correctedCards.length}/8
          </Container>
        </Grid>

        <Grid item xs={12} sm={4} md={4}>
          <Typography
            variant="h6"
            sx={{
              marginTop: "20px",
              fontFamily: "Monospace",
              textAlign: "center",
            }}
          >
            Match the pairs🤔
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4} md={3}>
          <Container
            maxWidth="sm"
            sx={{
              fontFamily: "Monospace",
              textAlign: "center",
            }}
          >
            Total Moves : {incorrectMoves}
          </Container>
        </Grid>
      </Grid>

      {isWin && (
        <>
          <ConfettiExplosion {...bigExplodeProps} />
          <Typography variant="h4" className="win">
            You Won! 🎉
          </Typography>
        </>
      )}
      <Box
        sx={{
          width: { xs: "70%", sm: "30%", md: "30%" },
          margin: "10px auto",
          padding: 2,
          backgroundColor: "rgb(66 117 109)",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          flexWrap: "nowrap",
        }}
      >
        <Grid container spacing={2} justifyContent="center" alignItems="center">
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
            fontSize: "1.25rem",
            backgroundColor: "rgb(66 117 109)",
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
