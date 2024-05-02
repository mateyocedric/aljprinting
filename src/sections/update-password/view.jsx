import axios from 'axios';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Card,
  Stack,
  Container,
<<<<<<< Updated upstream
  Typography,
  CardHeader,
=======
  CardHeader,
  Typography,
>>>>>>> Stashed changes
  CardContent
} from '@mui/material';

import FormProvider, {
  RHFTextField,
} from '../../components/hook-form'

<<<<<<< Updated upstream
=======


>>>>>>> Stashed changes
// ----------------------------------------------------------------------

export default function UpdatePasswordView() {

  const { enqueueSnackbar } = useSnackbar();


  const UpdateUserSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'), // Example: Adding a minimum length constraint
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'), // Ensure confirmPassword matches password
  });

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = handleSubmit(async (data) => {
    try {
      const id2 = localStorage.getItem('user_id')
      // console.log(id)
      // console.log('asdfasdfasdf',data)
      // login axios post

      const send = {
        id: id2,
        password: data.password
      }
      console.log(send)

      await axios.post('https://alj-django.onrender.com/api/user-update/', send);
      // await axios.post('http://127.0.0.1:8000/api/user-update/', send);

      reset();

      enqueueSnackbar('Password Updated Successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to Update Password', { variant: 'error' });
    }

  });

  return (
    <Container maxWidth={false}>
      <Typography variant="h4"> Settings </Typography>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card
            sx={{
              width: 650,
              marginTop: 5
            }}
          >
            <CardHeader
              title="Update Password"
              subheader="Update your password here"
            />
            <CardContent>
              <Stack
                direction='row'
                spacing={2}
                mb={2}
              >
                <RHFTextField name="password" label="Password" />
                <RHFTextField name="confirmPassword" label="Confirm Password" />
              </Stack>

              <LoadingButton type="submit" variant="contained" sx={{ marginTop: 2 }} size='large' fullWidth loading={isSubmitting}>
                Update Password
              </LoadingButton>
            </CardContent>
          </Card>
        </Box>
      </FormProvider>
    </Container>
  );
}
