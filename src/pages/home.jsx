import {
    Box,
    Card,
    Stack,
    Button,
    Typography,
    CardHeader,
    CardContent
} from '@mui/material'

import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify/iconify';

export default function HomePage() {
    const router = useRouter();

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Card
            >
                <CardHeader
                    title='Development'
                    sx={{
                        width: {
                            xs: '100vw',
                            sm: '100vw',
                            md: '40vw',
                            lg: '40vw'
                        }
                    }}
                />
                <CardContent>
                    <Stack
                        direction={{ md: 'row', lg: 'row', sm: 'column', xs: 'column' }}
                        alignItems='center'
                        justifyContent='space-between'
                        spacing={2}
                    >
                        <Typography>The server is running successfully (v0.1.0)</Typography>
                        <Button
                            color='primary'
                            variant='contained'
                            onClick={() => {
                                router.push('/auth/jwt/login')
                            }}
                            startIcon={
                                <Iconify icon='ion:open' />
                            }
                        >
                            Open Dashboard
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}