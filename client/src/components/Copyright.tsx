import { Link, Typography } from "@mui/material";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">מדור לומ"ר</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
