import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useQuery } from "react-query";

type IProps = {
  accessToken: string;
  selectedUnit: string;
};
type LastModifiedDate = {
  time: Array<string>;
};

const LastModifiedDate = (props: IProps) => {
  const { accessToken, selectedUnit } = props;
  const [errorText, setErrorText] = useState(" ");
  const [dateArray, setDateArray] = useState<any>([]);

  const fetchFileLastModifiedDate = async (): Promise<LastModifiedDate> => {
    const res = await fetch(
      `http://localhost:5005/api/last-modified-date/${selectedUnit}`,
      {
        headers: { authorization: "Bearer " + accessToken },
      }
    );
    if (!res.ok) {
      console.log("error at fetching file last modified date");
      setErrorText(
        `status code: ${res.status} status text: ${res.statusText} url: ${res.url}`
      );
      throw new Error("Problem fetching data");
    }
    return res.json();
  };

  const { data, isLoading, isError } = useQuery<LastModifiedDate>(
    "FileLastModifiedDate",
    fetchFileLastModifiedDate,
    {
      onSuccess: (data) => {
        console.log(data);

        setDateArray(data);
      },
    }
  );
  if (isLoading) return <>"Loading..."</>;

  if (isError) return <>"An error has occurred: " {errorText}</>;

  return (
    <Box sx={{ justifyContent: "center", alignItems: "center" }}>
      <Typography variant="h5" component="div">
        <Box display="inline"> תאריך אחרון לעדכון: </Box>
        <Box sx={{ fontWeight: "bold" }} display="inline">
          {dateArray[0]}
        </Box>
        <Box display="inline"> בשעה: </Box>
        <Box sx={{ fontWeight: "bold" }} display="inline">
          {dateArray[1]}
        </Box>
      </Typography>
    </Box>
  );
  //   return <>
  //   {dateArray}</>;
};

export default LastModifiedDate;
