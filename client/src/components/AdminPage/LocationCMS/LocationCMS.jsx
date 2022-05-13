import { useState, useEffect } from "react";
import {
  getAllLocations,
  createLocation,
  deleteLocation,
  updateLocation,
} from "../../../api/location/index";
import MaterialTable from "material-table";
import Paper from "@mui/material/Paper";

export const LocationCMS = ({ locationList, setLocationList }) => {
  const [reloadLocation, setReloadLocation] = useState(false);

  // Show location index from 1
  const handleLocationIndex = (rowData) => {
    const index = rowData.tableData.id + 1;
    return index;
  };

  // Create new location
  const handleCreateLocation = async (newRow) => {
    await createLocation(newRow.lname, newRow.lat, newRow.long);
    setReloadLocation(!reloadLocation);
  };

  // Delete selected location
  const handleDeleteLocation = async (selectedRow) => {
    await deleteLocation(selectedRow.lname);
    setReloadLocation(!reloadLocation);
  };

  // Update location info
  const handleUpdateLocation = async (updateRow, oldRow) => {
    await updateLocation(
      oldRow.lname,
      updateRow.lname,
      updateRow.lat,
      updateRow.long
    );
    setReloadLocation(!reloadLocation);
  };

  const locationColumns = [
    {
      title: "#",
      field: "tableData.id",
      render: (rowData) => handleLocationIndex(rowData),
      editable: "never",
    },
    {
      title: "LocName",
      field: "lname",
    },
    {
      title: "Lat",
      field: "lat",
    },
    {
      title: "Long",
      field: "long",
    },
  ];

  // Initialize
  const init = async () => {
    const locationResult = await getAllLocations();
    setLocationList(locationResult.data);
  };

  // Reload when refresh
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadLocation]);

  return (
    <Paper
      elevation={3}
      sx={{ borderRadius: 2 }}
      style={{ maxWidth: "90vw", overflowX: "hidden", margin: "5px" }}
    >
      <MaterialTable
        title="Location Data"
        data={locationList}
        columns={locationColumns}
        options={{
          pageSize: 10,
          actionsColumnIndex: -1,
          addRowPosition: "first",
        }}
        editable={{
          onRowAdd: (newRow) => handleCreateLocation(newRow),
          onRowDelete: (selectedRow) => handleDeleteLocation(selectedRow),
          onRowUpdate: (updatedRow, oldRow) =>
            handleUpdateLocation(updatedRow, oldRow),
        }}
      />
    </Paper>
  );
};
