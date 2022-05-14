import './FavLists.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { removeFromFav, readFav } from '../../../api/user';

export const FavLists = ({ favLists, setFavLists, handleMarker }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	// Get current login user
	const { user } = useContext(AuthContext);

	// Trigger update fav lists
	const [updateFavList, setUpdateFavList] = useState(true);

	const handleOpenFavLists = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleCloseFavLists = () => {
		setAnchorEl(null);
	};

	const handleRemoveFromFav = async (username, locId) => {
		await removeFromFav(username, locId);
		setUpdateFavList(!updateFavList);
	};

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
		<Box component='div'>
			<Button
				variant='contained'
				id='basic-button'
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleOpenFavLists}
				sx={{
					my: 2,
					color: 'white',
					display: 'flex',
					alignItems: 'center',
					'&:hover': { color: 'quinary.main' },
					margin: '20px',
					width: 'fit-content',
				}}>
				<FavoriteIcon sx={{ paddingRight: '6px' }} />
				<Typography variant='p'>Favourite Lists</Typography>
			</Button>
			<Menu
				className='menu-container'
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleCloseFavLists}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}>
				<TableContainer component={Paper}>
					<Table aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell align='center'>Location</TableCell>
								<TableCell align='center'>Remove</TableCell>
								<TableCell align='center'>Search</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{favLists.map((favLocation) => (
								<TableRow
									key={favLocation._id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component='th' scope='row'>
										{favLocation.lname}
									</TableCell>
									<TableCell align='center'>
										<Button
											variant='outlined'
											color='quinary'
											onClick={() =>
												handleRemoveFromFav(user.username, favLocation._id)
											}>
											Remove
										</Button>
									</TableCell>
									<TableCell>
										<Button
											variant='outlined'
											color='primary'
											onClick={() =>
												handleMarker(
													favLocation._id,
													favLocation.lat,
													favLocation.long,
													favLocation.lname
												)
											}>
											Search
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Menu>
		</Box>
	);
};
