import React from "react";
import { useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import PureComponent from "./PureTable";

type Props = {};

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

const fetchRadioStates = async (): Promise<Data> => {
  const res = await fetch("http://localhost:5005/radioStates");
  if (!res.ok) {
    console.log("error at fetching radioStates");
    throw new Error("Problem fetching data");
  }
  return res.json();
};

const fetchHeaderList = async (): Promise<Headers> => {
  const res = await fetch("http://localhost:5005/headerList");
  if (!res.ok) {
    console.log("error at fetching headerList");
    throw new Error("Problem fetching data");
  }
  return res.json();
};

const MakmashTable = (props: Props) => {
  const [tableData, setTableData] = useState<RadioParams[]>([]);
  const [tableHeader, setTableHeader] = useState<string[]>([]);

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
      //   console.log("sortData:", sortData);
      let oneArray: RadioParams[] = [];
      sortData.map((array: any) => {
        oneArray = oneArray.concat(array);
      });
      oneArray.pop();
      setTableData(oneArray);
      //   console.log(oneArray);
    },
  });

  const {
    // data: { param_headers, radio_state_headers },
    // headerData,
    isLoading: isLoadingHeader,
    isError: isErrorHeader,
  } = useQuery<Headers>("FileHeader", fetchHeaderList, {
    onSuccess: (headerData) => {
      const { param_headers, radio_state_headers } = headerData ?? {
        param_headers: [],
        radio_state_headers: [],
      };
      // headerData, isHeaderLoading, headerError;
      console.log(headerData);

      setTableHeader(radio_state_headers);
      // console.log(data.radio_state_headers);
    },
  });

  if (isLoadingData || isLoadingHeader) return <>"Loading..."</>;

  if (isErrorHeader || isErrorData) return <>"An error has occurred: "</>;

  return (
    <div>
      <PureComponent rows={tableData} columns={tableHeader} />{" "}
    </div>
  );
};
export default MakmashTable;