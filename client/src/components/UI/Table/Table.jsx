import MaterialTable from 'material-table';
import Button from '@mui/material/Button';

export const Table = ({ locationData, handleMarker }) => {
	// Show location index from 1
	const handleLocationIndex = (rowData) => {
		const index = rowData.tableData.id + 1;
		return index;
	};

	// Search single location button
	const handleSingleSearch = (rowData) => {
		return (
			<Button
				variant='outlined'
				onClick={() =>
					handleMarker(rowData._id, rowData.lat, rowData.long, rowData.lname)
				}
			>
				Search
			</Button>
		);
	};

	const columns = [
		{
			title: '#',
			field: 'tableData.id',
			render: (rowData) => handleLocationIndex(rowData),
		},
		{
			title: 'LocName',
			field: 'lname',
		},
		{
			title: 'Add To Fav',
			field: '',
		},
		{
			title: 'Search',
			render: (rowData) => handleSingleSearch(rowData),
		},
	];

	return (
		<MaterialTable
			title='All Locations'
			data={locationData}
			columns={columns}
			options={{ pageSize: 10 }}
		/>
	);
};
