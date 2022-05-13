import "./AdminPage.css";
import { Layout } from "../Layout/Layout";
import { useState } from "react";
import { readUser } from "../../api/auth";
import { getAllLocations } from "../../api/location";
import PersonIcon from "@mui/icons-material/Person";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { UserCMS } from "./UserCMS/UserCMS";
import { LocationCMS } from "./LocationCMS/LocationCMS";
import { Notification } from "../UI/Notification/Notification";

export const AdminPage = () => {
  const [userList, setUserList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [notifText, setNotifText] = useState("");

  // Admin refresh action
  const handleRefresh = async () => {
    const userResult = await readUser();
    const locationResult = await getAllLocations();
    setUserList(userResult.data);
    setLocationList(locationResult.data);
    setNotifText("REFRESH_SUCCESS");
    setShowNotif(true);
  };

  // Show notification
  const handleShowNotification = () => (
    <>
      {showNotif && (
        <Notification
          type={notifText}
          show={showNotif}
          setShow={setShowNotif}
        />
      )}
    </>
  );

  return (
    <Layout>
      {handleShowNotification()}
      <Box component="div" className="admin-container">
        <Button
          variant="contained"
          sx={{
            my: 2,
            color: "white",
            alignItems: "center",
            "&:hover": { color: "tertiary.dark" },
            padding: "10px 50px",
          }}
          onClick={handleRefresh}
        >
          <AutorenewIcon sx={{ paddingRight: "6px" }} />
          REFRESH
        </Button>
        <Box component="div" className="cms-container">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <Box component="div" className="cms-left-container">
                <Box component="div" className="usercms-container">
                  <PersonIcon className="text-icon" />
                  <Typography variant="h5">Edit User</Typography>
                </Box>
                <Box className="cms-table-container">
                  <UserCMS userList={userList} setUserList={setUserList} />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box component="div" className="cms-right-container">
                <Box component="div" className="locationcms-container">
                  <EditLocationAltIcon className="text-icon" />
                  <Typography variant="h5">Edit Location</Typography>
                </Box>
                  <LocationCMS
                    locationList={locationList}
                    setLocationList={setLocationList}
                  />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};
