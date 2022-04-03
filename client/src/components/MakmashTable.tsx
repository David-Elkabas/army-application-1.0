import { Box } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import PureComponent from "./PureTable";

interface IProps {
  accessToken: string;
  selectedUnit: string;
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
  ['מזהה מקמ"ש']: string;
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
  params: rcgwParams;
  radioStates: RadioStates;
};
type Data = any;

const MakmashTable = (props: IProps) => {
  const { accessToken, selectedUnit } = props;
  const [tableData, setTableData] = useState<RadioParams[]>([]);
  const [tableHeader, setTableHeader] = useState<string[]>([]);
  const [errorText, setErrorText] = useState(" ");

  const fetchRadioStates = async (): Promise<Data> => {
    // console.log(accessToken);
    try {
      const res = await fetch(
        `http://localhost:5005/radioStates/${selectedUnit}`,
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
    const res = await fetch("http://localhost:5005/headerList", {
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
      const sortData = data.RCGW.map((machine: RCGW) => {
        if (machine.state !== "FAILED") {
          return machine.radioStates.map((device: RadioStatesIn) => {
            if (device.state !== "FAILED") return device.params;
            return {};
          });
        }
        return {};
      });
      let oneArray: RadioParams[] = [];
      sortData.map((array: any) => {
        return (oneArray = oneArray.concat(array));
      });
      oneArray.pop();
      setTableData(oneArray);
    },
  });

  const { isLoading: isLoadingHeader, isError: isErrorHeader } =
    useQuery<Headers>("FileHeader", fetchHeaderList, {
      onSuccess: (headerData) => {
        const { param_headers, radio_state_headers } = headerData ?? {
          param_headers: [],
          radio_state_headers: [],
        };
        setTableHeader(radio_state_headers);
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
