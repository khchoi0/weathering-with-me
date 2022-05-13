import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import { addToFav, readFav } from '../../../api/user';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';

export const Table = ({
  locationData,
  handleMarker,
  setFavLists,
  setShowNotif,
  setNotifText,
}) => {
  // Get current login user
  const { user } = useContext(AuthContext);

  // Trigger update fav lists
  const [updateFavList, setUpdateFavList] = useState(true);

  // Show location index from 1
  const handleLocationIndex = (rowData) => {
    const index = rowData.tableData.id + 1;
    return index;
  };

  // Search single location button
  const handleSingleSearch = (rowData) => {
    return (
      <Button
        variant="outlined"
        onClick={() =>
          handleMarker(rowData._id, rowData.lat, rowData.long, rowData.lname)
        }
      >
        Search
      </Button>
    );
  };

  const handleAddToFav = async (username, locId) => {
    await addToFav(username, locId);
    setUpdateFavList(!updateFavList);
    setShowNotif(true);
    setNotifText("ADD_TO_FAV_SUCCESS");
  };

  // Add to fav lists
  const renderAddToFav = (rowData) => {
    return (
      <Button
        variant="outlined"
        color="tertiary"
        onClick={() => handleAddToFav(user.username, rowData._id)}
      >
        Add
      </Button>
    );
  };

  const columns = [
		{
			title: '#',
			field: 'tableData.id',
			render: (rowData) => handleLocationIndex(rowData),
			editable: 'never',
		},
    {
      title: "Name",
      field: "lname",
    },
    {
      title: "Add To Fav",
      render: (rowData) => renderAddToFav(rowData),
    },
    {
      title: "Search",
      render: (rowData) => handleSingleSearch(rowData),
    },
  ];

  // Initialize
  const init = async () => {
    const favLists = await readFav(user._id);
    setFavLists(favLists.data);
  };

  // Reload when refresh
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateFavList]);

  return (
    <MaterialTable
      title="Locations"
      data={locationData}
      columns={columns}
      options={{
        paging: false,
        headerStyle: {
          position: "sticky",
          top: "0",
        },
        tableLayout: "fixed",
      }}
    />
  );
};
