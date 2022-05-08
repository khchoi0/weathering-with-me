import './AdminPage.css';
import { Layout } from '../Layout/Layout';
import PersonIcon from '@mui/icons-material/Person';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { UserCMS } from './UserCMS/UserCMS';
import { LocationCMS } from './LocationCMS/LocationCMS';

export const AdminPage = () => {
	return (
		<Layout>
			<Box component='div' className='cms-container'>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} md={6}>
						<Box component='div' className='cms-left-container'>
							<Box component='div' className='usercms-container'>
								<PersonIcon className='text-icon' />
								<Typography variant='h5'>Edit User</Typography>
							</Box>
							<UserCMS />
						</Box>
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<Box component='div' className='cms-right-container'>
							<Box component='div' className='locationcms-container'>
								<EditLocationAltIcon className='text-icon' />
								<Typography variant='h5'>Edit Location</Typography>
							</Box>
							<LocationCMS />
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Layout>
	);
};
