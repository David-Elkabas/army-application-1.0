import { Box, Checkbox, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridSlotsComponentsProps,
} from "@mui/x-data-grid";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        csvOptions={{
          fileName: "ויטלי מקמשים בעמ",
          utf8WithBom: true,
        }}
        printOptions={{
          hideFooter: true,
          hideToolbar: true,
          // allColumns: true,
          fileName: "ויטלי מקמשים בעמ",
        }}
      />
    </GridToolbarContainer>
  );
}

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

const EliavColumnsPanel = () => {
  return (
    <>
      <Checkbox checked />
    </>
  );
};

const PureTable = (props: IProps) => {
  const { rows, columns } = props;
  // console.log(rows);
  const shortColumn = ["מושאל", "קוד הצפנה", "קידוד שמע", "תדר", "פורט", "adf"];

  const editRows = rows.map((row) =>
    Object.assign(row, { id: row['מזהה מקמ"ש'] })
  );

  const editColumns = columns.map((column) => ({
    field: column,
    headerName: column,
    headerAlign: "center" as const,
    align: "center" as const,
    width: shortColumn.includes(column) ? 50 : 100,
    // flex: 1,
    renderCell: (params: any) => (
      <Tooltip title={params.value ? params.value : "temp"}>
        <span>{params.value}</span>
      </Tooltip>
    ),
  }));

  return (
    // <div>
    <Box sx={{ height: 700 }}>
      <DataGrid
        rows={editRows}
        columns={editColumns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        components={{
          Toolbar: CustomToolbar,
          // ColumnMenu: () => <></>,
          // ColumnFilteredIcon: () => <></>,
          // ColumnsPanel: (props) => {
          //   console.log(props);
          //   return <EliavColumnsPanel />;
          // },
          // FilterPanel: () => <></>,
          // FilterPanelColumns: () => <></>,
        }}
        componentsProps={{ columnsPanel: {} }}
        localeText={{
          //for change titles for Hebrew
          // columns panel
          toolbarColumns: "סינון עמודות",
          columnsPanelTextFieldLabel: "הכנס שם עמודה",
          columnsPanelTextFieldPlaceholder: "חיפוש לפי שם עמודה",
          columnsPanelShowAllButton: "הצג את כולם",
          columnsPanelHideAllButton: "בטל את כולם",
          // filters panel
          toolbarFilters: "סינון טקסט",
          filterPanelOperators: "סינון בעזרת",
          filterPanelColumns: "עמודה לסינון",
          filterPanelInputLabel: "ערך לסינון",
          filterPanelInputPlaceholder: "הכנס ערך",
          // Filter operators text
          filterOperatorContains: "מכיל",
          filterOperatorEquals: "שווה",
          filterOperatorStartsWith: "מתחיל ב",
          filterOperatorEndsWith: "מסתיים ב",
          filterOperatorIsEmpty: "תוכן ריק",
          filterOperatorIsNotEmpty: "תוכן לא ריק",
          filterOperatorIsAnyOf: "חלק מ",

          // density panel
          toolbarDensity: "צפיפות",
          toolbarDensityCompact: "קטן",
          toolbarDensityStandard: "רגיל",
          toolbarDensityComfortable: "גדול",

          // export panel
          toolbarExport: "ייצוא קובץ",
          toolbarExportCSV: "הורדת קובץ אקסל",
          toolbarExportPrint: "PDF הדפסת קובץ",

          // Column menu text
          columnMenuShowColumns: "סינון עמודות",
          columnMenuFilter: "סינון טקסט",
          columnMenuHideColumn: "הסתר",
          columnMenuUnsort: "ביטול מיון",
          columnMenuSortAsc: "מיון לפי א-ב",
          columnMenuSortDesc: "מיון מילון הפוך",
        }}
      />
    </Box>
  );
};
export default PureTable;
