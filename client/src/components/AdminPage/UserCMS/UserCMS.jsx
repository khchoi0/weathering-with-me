import { useState, useEffect } from "react";
import {
  readUser,
  createUser,
  deleteUser,
  updateUser,
} from "../../../api/auth";
import MaterialTable from "material-table";
import Paper from "@mui/material/Paper";

export const UserCMS = ({ userList, setUserList }) => {
  // const [userList, setUserList] = useState([]);
  const [reloadUser, setReloadUser] = useState(false);

  // Show user index from 1
  const handleUserIndex = (rowData) => {
    const index = rowData.tableData.id + 1;
    return index;
  };

  // Only show 12 characters
  const handlePasswordShow = (rowData) => {
    const hashedPassword = rowData.password;
    if (hashedPassword.length > 10) {
      return hashedPassword.substring(0, 12) + "...";
    }
    return hashedPassword;
  };

  // Create new user
  const handleCreateUser = async (newRow) => {
    await createUser(newRow.username, newRow.password);
    setReloadUser(!reloadUser);
  };

  // Delete a selected user
  const handleDeleteUser = async (selectedRow) => {
    await deleteUser(selectedRow.username);
    setReloadUser(!reloadUser);
  };

  // Update user info
  const handleUpdateUser = async (updatedRow, oldRow) => {
    await updateUser(oldRow.username, updatedRow.username, updatedRow.password);
    setReloadUser(!reloadUser);
  };

  const userColumns = [
    {
      title: "#",
      field: "tableData.id",
      render: (rowData) => handleUserIndex(rowData),
      editable: "never",
    },
    {
      title: "Username",
      field: "username",
    },
    {
      title: "Password",
      field: "password",
      render: (rowData) => handlePasswordShow(rowData),
    },
  ];

  // Initialize
  const init = async () => {
    const userResult = await readUser();
    setUserList(userResult.data);
  };

  // Reload when refresh
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadUser]);

  return (
    <Paper
      elevation={3}
      sx={{ borderRadius: 2 }}
      style={{ maxWidth: "90vw", overflowX: "hidden", margin: "5px" }}
    >
      <MaterialTable
        title="User Data"
        data={userList}
        columns={userColumns}
        options={{
          pageSize: 10,
          actionsColumnIndex: -1,
          addRowPosition: "first",
        }}
        editable={{
          onRowAdd: (newRow) => handleCreateUser(newRow),
          onRowDelete: (selectedRow) => handleDeleteUser(selectedRow),
          onRowUpdate: (updatedRow, oldRow) =>
            handleUpdateUser(updatedRow, oldRow),
        }}
      />
    </Paper>
  );
};
