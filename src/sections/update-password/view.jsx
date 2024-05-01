import * as Yup from 'yup';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Container,
  Typography,
  Stack,
  CardContent,
  Card,
  Box,
  CardHeader
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import FormProvider, {
  RHFTextField,
} from '../../components/hook-form'


import { useSnackbar } from 'notistack';

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

      // login axios post
      await axios.post('http://localhost:8000/api/update-password/', data);

      reset();

      enqueueSnackbar('Password Updated Successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to Update Password', { variant: 'error' });
    }

  });

  return (
    <Container maxWidth={false}>
      <Typography variant="h4"> POS </Typography>
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
