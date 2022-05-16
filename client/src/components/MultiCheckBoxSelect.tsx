import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useState } from "react";
type IProps = {
  stationsData: Array<dataParam>;
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

const MultiCheckBoxSelect = (props: IProps) => {
  const { stationsData } = props;

  const [selectedOptions, setSelectedOptions] = useState<Array<dataParam>>([]);

  const handleChange = (event, value) => setSelectedOptions(value);

  return (
    <>
      <Autocomplete
        onChange={handleChange}
        multiple
        id="checkboxes-tags-demo"
        options={stationsData}
        disableCloseOnSelect
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
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField {...params} label="מיקומים" placeholder="בחר מיקום" />
        )}
      />
      {selectedOptions &&
        selectedOptions?.map((ele) => {
          return ele.location;
        })}
    </>
  );
};

export default MultiCheckBoxSelect;
