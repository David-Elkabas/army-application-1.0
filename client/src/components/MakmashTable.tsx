import { Box } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import PureComponent from "./PureTable";

interface IProps {
  accessToken: string;
  selectedUnit: string;
  table: string;
}

type Headers = {
  param_headers: Array<string>;
  radio_state_headers: Array<string>;
};
type rcgwParams = {
  ip?: string;
  state: string;
  בלהבלה?: string;
  עכד?: string;
  סוללה?: string;
};
type RadioParams = {
  שם?: string;
  ["שם משפחה"]?: string;
  עיר?: string;
  רחוב?: string;
  יחידה?: string;
  ["שם רכיב"]: string;
  id: string;
  מאזינים?: string | string[];
};

type RadioStatesIn = {
  deviceId: string;
  state: string;
  params: RadioParams;
};
type RadioStates = Array<RadioStatesIn>;

type RCGW = {
  deviceId: string;
  state: string;
  params: Array<rcgwParams>;
  radioStates: RadioStates;
};
type Other = {
  deviceId: string;
  state: string;
  params: Array<rcgwParams>;
};
type Data = any;

const MakmashTable = (props: IProps) => {
  const { accessToken, selectedUnit, table } = props;
  const [tableData, setTableData] = useState<RadioParams[]>([]);
  const [tableHeader, setTableHeader] = useState<string[]>([]);
  const [errorText, setErrorText] = useState(" ");

  const fetchRadioStates = async (): Promise<Data> => {
    // console.log(accessToken);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/radioStates/${selectedUnit}`,
        {
          headers: { authorization: "Bearer " + accessToken },
          // unit,
        }
      );
      if (!res.ok) {
        console.log("error at fetching radioStates");
        setErrorText(
          `status code: ${res.status} status text: ${res.statusText} url: ${res.url}`
        );
        throw new Error("Problem fetching data");
      }
      return res.json();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHeaderList = async (): Promise<Headers> => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/headerList`, {
      headers: { authorization: "Bearer " + accessToken },
    });
    if (!res.ok) {
      console.log("error at fetching headerList");
      setErrorText(
        `status code: ${res.status} status text: ${res.statusText} url: ${res.url}`
      );
      // console.log(res.status, res.statusText, res.url);

      throw new Error("Problem fetching data");
    }
    return res.json();
  };
  const {
    data,
    isLoading: isLoadingData,
    isError: isErrorData,
  } = useQuery<Data>("FileData", fetchRadioStates, {
    onSuccess: (data) => {
      //   console.log(data);
      const { RCGW } = data ?? {
        RCGW: [],
      };

      let oneArray = [];
      if (table === "Makmash") {
        const sortRCGWData = data.RCGW.map((machine: RCGW) => {
          if (machine.state !== "FAILED") {
            return machine.radioStates.map((device: RadioStatesIn) => {
              if (device.state !== "FAILED") return device.params;
              return {};
            });
          }
          return {};
        });
        sortRCGWData.map((array: any) => {
          return (oneArray = oneArray.concat(array));
        });
      } else {
        const sortData = data[table].map((machine: Other) => {
          if (machine.state !== "FAILED") {
            return machine.params;
          }
          return {};
        });
        sortData.map((array: any) => {
          return (oneArray = oneArray.concat(array));
        });
      }

      // oneArray.pop();

      let newArray = oneArray.filter(
        (element) => Object.keys(element).length !== 0
      );
      setTableData(newArray);
    },
  });

  const { isLoading: isLoadingHeader, isError: isErrorHeader } =
    useQuery<Headers>("FileHeader", fetchHeaderList, {
      onSuccess: (headerData) => {
        const { param_headers, radio_state_headers } = headerData ?? {
          param_headers: [],
          radio_state_headers: [],
        };
        if (table === "Makmash") {
          setTableHeader(radio_state_headers);
        } else {
          setTableHeader(param_headers);
        }
      },
    });

  if (isLoadingData || isLoadingHeader) return <>"Loading..."</>;

  if (isErrorHeader || isErrorData)
    return <>"An error has occurred: " {errorText}</>;

  return (
    <Box>
      <PureComponent rows={tableData} columns={tableHeader} />
    </Box>
  );
};
export default MakmashTable;
