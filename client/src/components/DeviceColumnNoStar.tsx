import { Avatar, Grid, Paper, Tooltip, Typography } from "@mui/material";
import CCTAvatar from "../images/images-generalBlock/CCT2.png";
import RCGWAvatar from "../images/images-generalBlock/RCGW.png";
import YadbarAvatar from "../images/images-generalBlock/yadbar.png";
import DeployAvatar from "../images/images-generalBlock/deploy2.png";
import CCUAvatar from "../images/images-generalBlock/CCU.png";
import CloseIcon from "@mui/icons-material/Close";
import DeviceTooltip from "./DeviceTooltip";
import CustomProgressBar from "./CustomProgressBar";

type IProps = {
  device: string;
  OK: number;
  ERROR: number;
  FAILED: number;
  type: string;
  location: string;
  favoriteStations: Array<DevicePerems>;
  setFavoriteStations: React.Dispatch<React.SetStateAction<DevicePerems[]>>;
};
type DevicePerems = {
  location: string;
  type: string;
  device: string;
  OK: number;
  ERROR: number;
  FAILED: number;
};

const colorToType = {
  שרתים: "linear-gradient(to bottom , #000600, #44a08d)",
  "אתרי תקשוב": "linear-gradient(to bottom , #000428, #004e92)",
  'תק"שי רדיו': "linear-gradient(to bottom , #200122, #6f0000);",
  'פת"ל': "linear-gradient(to bottom , #061700, #52c234)",
  קידמית: "linear-gradient(to bottom ,#060600, #ff8008)",
  קרונות: "linear-gradient(to bottom , #000005, #6441a5)",
  אחר: "linear-gradient(to bottom, #2b5876, #4e4376);",
};

const colorSelector = (area) => {
  if (area in colorToType) {
    return colorToType[area];
  } else {
    return "#464E2E";
  }
};

const deviceToIcon = {
  CCT: CCTAvatar,
  RCGW: RCGWAvatar,
  Yadbar: YadbarAvatar,
  Deploy: DeployAvatar,
  CCU: CCUAvatar,
};

const percentCalculator = (
  okNum: number,
  errorNum: number,
  failNum: number
) => {
  const sum = okNum + errorNum + failNum;
  const eachNum = 100 / sum;

  const okPercent = okNum * eachNum;
  const errorPercent = errorNum * eachNum;
  const failPercent = failNum * eachNum;

  return { okPercent, errorPercent, failPercent };
};

const DeviceColumnNoStar = (props: IProps) => {
  const {
    device,
    OK,
    ERROR,
    FAILED,
    type,
    location,
    favoriteStations,
    setFavoriteStations,
  } = props;
  const { okPercent, errorPercent, failPercent } = percentCalculator(
    OK,
    ERROR,
    FAILED
  );

  const arrayOfPercents = [okPercent, errorPercent, failPercent];
  const arrayOfLabel = [OK, ERROR, FAILED];

  const handleDeleteClick = () => {
    console.log(type, location, device);

    setFavoriteStations(
      favoriteStations.filter(
        (ele) =>
          ele.device !== device ||
          ele.location !== location ||
          ele.type !== type
      )
    );
  };
  return (
    <Paper
      sx={{
        background: () => colorSelector(type),
        p: 1,
        m: 1,
      }}
    >
      <Tooltip
        followCursor
        title={
          <DeviceTooltip
            device={device}
            OK={OK}
            ERROR={ERROR}
            FAILED={FAILED}
          />
        }
        arrow
        sx={{ fontSize: 10 }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={1}>
            <CloseIcon
              sx={{ color: "white" }}
              onClick={handleDeleteClick}
              style={{ cursor: "pointer" }}
            />
          </Grid>
          <Grid item xs={10}>
            <Typography
              align="center"
              variant="h5"
              component="div"
              color="white"
            >
              {location}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ bgcolor: "#93B0B0" }}>
              <Grid container justifyContent="center" direction="row">
                <Grid item xs={2.5}>
                  <Avatar
                    alt={device}
                    src={
                      deviceToIcon[device] ? deviceToIcon[device] : RCGWAvatar
                    }
                    variant="rounded"
                  />
                </Grid>
                <Grid item xs={7} sx={{ mt: 1.5, mr: 1 }}>
                  <CustomProgressBar
                    percents={arrayOfPercents}
                    labels={arrayOfLabel}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Tooltip>
    </Paper>
  );
};

export default DeviceColumnNoStar;
