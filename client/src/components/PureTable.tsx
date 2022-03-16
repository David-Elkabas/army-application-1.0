import { DataGrid, GridToolbar } from "@mui/x-data-grid";

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

type IProps = {
  rows: RadioParams[];
  columns: string[];
};

const PureTable = (props: IProps) => {
  const { rows, columns } = props;
  console.log(rows);

  const editRows = rows.map((row) => Object.assign(row, { id: row.id }));

  const editColumns = columns.map((column) => ({
    field: column,
    headerName: column,
    width: 120,
  }));

  return (
    // <div>
    <div style={{ height: 400, padding: 20 }}>
      <DataGrid
        rows={editRows}
        columns={editColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
};

export default PureTable;
