import { Box, Button, Grid, Paper, Stack } from "@mui/material";
import React from "react";
import SelectCard from "../components/SelectCard";
import transceiver from "../images/transceiver.png";
import monitor from "../images/monitor.png";
import radio from "../images/radio.png";
import all from "../images/all.png";
import UserInfo from "../components/UserInfo";
import { useNavigate } from "react-router-dom";

interface IProps {
  username: string;
  isAdmin: boolean;
  selectedUnit: string;
}

const cardOptions = [
  {
    value: "transceiver",
    header: " סנן לפי מקמ''שים",
    description:
      "הצגת ניטור עבור כלל המקמ''שים המחוברים ומוגדרים בקובץ הפק''ל כולל ניתוח סטאטוס",
    image: transceiver,
  },
  {
    value: "uvt",
    header: "הצגת גרפים",
    description: "הצגת כלל הגרפים על שלל המקמ''שים, ידב''רים, וישל''קים",
    image: monitor,
  },
  {
    value: "rcgw",
    header: "סנן לפי ישל''קים",
    description:
      "הצגת ניטור עבור כלל הישל''קים המחוברים ומוגדרים בקובץ הפק''ל כולל סטאטוס הישל''קים ופירוט המאזינים בכל ישל'''ק",
    image: radio,
  },
  {
    value: "general-view",
    header: "מבט על",
    description: "הצגת מבט מלמעלה על כלל הכלים באוגדה",
    image: all,
  },
];

const ShowByPage: React.FC<IProps> = (props) => {
  const { username, isAdmin, selectedUnit } = props;

  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate("/unit-page");
  };

  return (
    <Paper sx={{ bgcolor: "#f3f3f3", pb: 5, px: 5 }}>
      <UserInfo
        username={username}
        isAdmin={isAdmin}
        selectedUnit={selectedUnit}
      />
      <Box sx={{ mx: "auto", width: 1 }}>
        <Grid container direction="row" rowSpacing={2} sx={{ width: "42vw" }}>
          {cardOptions &&
            cardOptions.map((card, index) => {
              return (
                <Grid item xs={6} key={index}>
                  <SelectCard
                    index={index}
                    key={card.value}
                    value={card.value}
                    header={card.header}
                    description={card.description}
                    image={card.image}
                  />
                </Grid>
              );
            })}
        </Grid>
        <Stack direction="row" spacing={5} justifyContent="center">
          <Button
            variant="contained"
            onClick={handleClick}
            size="large"
            sx={{ mt: 5 }}
          >
            חזור חזרה{" "}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ShowByPage;
