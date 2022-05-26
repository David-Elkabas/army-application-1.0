import { Box, Checkbox, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useState } from "react";

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
  ["שם רכיב"]: string;
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

const ColumnWidthCalc = (string: string) => {
  let stringLength: number = string.length;
  if (stringLength < 8) return 80;
  else if (stringLength > 14) return stringLength * 8;
  else return stringLength * 10;
};

const PureTable = (props: IProps) => {
  const { rows, columns } = props;
  const [pageSize, setPageSize] = useState<number>(25);
  const shortColumn = ["מושאל", "קוד הצפנה", "קידוד שמע", "תדר", "פורט", "adf"];

  const editRows = rows.map((row) =>
    Object.assign(row, { id: row["שם רכיב"] })
  );

  const editColumns = columns.map((column: string) => ({
    field: column,
    headerName: column,
    headerAlign: "center" as const,
    align: "center" as const,
    width: shortColumn.includes(column) ? 50 : ColumnWidthCalc(column),
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
        density="compact"
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 25, 50, 100, 200]}
        rows={editRows}
        columns={editColumns}
        disableSelectionOnClick
        components={{
          Toolbar: CustomToolbar,
        }}
        componentsProps={{ columnsPanel: {} }}
        sx={{
          borderRadius: "12px",
          boxShadow: 1,
        }}
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
