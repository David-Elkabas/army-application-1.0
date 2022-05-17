import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect, useRef, useState } from "react";
import PieChart from "./PieChart";
import { Grid } from "@mui/material";
import useDeepCompareEffect from "../hooks/useDeepCompareEffect";
type IProps = {
  stationsData: Array<dataParam>;
  title: string;
};

type dataParam = {
  id: number;
  location: string;
  network: string | null;
  status: Status;
};

type Status = {
  OK: number;
  ERROR: number;
  FAILED: number;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const labels = ["OK", "ERROR", "FAILED"];

const useRerender = () => {
  const [, reRender] = useState({});
  return () => reRender({});
};

const MultiCheckBoxSelect = (props: IProps) => {
  const render = useRerender();
  const { stationsData, title } = props;

  // const [selectedOptions, setSelectedOptions] = useState<Array<dataParam>>([]);
  const [totalNumbers, setTotalNumbers] = useState({
    totalOK: 0,
    totalFAILED: 0,
    totalERROR: 0,
  });

  // useEffect(() => {}, [stationsData]);

  const [lastValue, setLastValue] = useState(null);

  const handleAutocompleteChange = (event, value: Array<dataParam>) => {
    // setSelectedOptions(value);
    // console.log(value);
    setLastValue(value as any);
    let totalOkTemp = 0;
    let totalErrorTemp = 0;
    let totalFailedTemp = 0;
    value?.forEach((ele) => {
      totalOkTemp = totalOkTemp + ele.status.OK;
      totalErrorTemp = totalErrorTemp + ele.status.ERROR;
      totalFailedTemp = totalFailedTemp + ele.status.FAILED;
    });
    setTotalNumbers({
      totalOK: totalOkTemp,
      totalERROR: totalErrorTemp,
      totalFAILED: totalFailedTemp,
    });
  };

  useDeepCompareEffect(() => {
    // console.log("useDeepCompareEffect", lastValue);
    render();
    // setTotalNumbers((prev) => stationsData.filter(s=>s.id==prev.));
    // handleAutocompleteChange(undefined, lastValue as any);
  }, [stationsData]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <PieChart
            labels={labels}
            data={[
              totalNumbers.totalOK,
              totalNumbers.totalERROR,
              totalNumbers.totalFAILED,
            ]}
            chartTitle={title}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={stationsData}
            onChange={handleAutocompleteChange}
            multiple
            limitTags={2}
            id="checkboxes-tags-demo"
            disableCloseOnSelect
            filterOptions={(options) =>
              options.filter((option) => option.location !== "")
            }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.location}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.location}
              </li>
            )}
            sx={{ width: "15vw" }}
            renderInput={(params) => (
              <TextField {...params} label="מיקומים" placeholder="בחר מיקום" />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MultiCheckBoxSelect;
