import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '../src/Link';
import ProTip from '../src/ProTip';
import Footer from '../components/Footer';

export default function About() {
    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Visit my resume website!
                </Typography>
                <Box maxWidth="sm">
                    <Button
                        variant="contained"
                        component={Link}
                        noLinkStyle
                        href="https://eduardosacco.github.io/"
                    >
                        eduardosacco.github.io
                    </Button>
                </Box>
                <ProTip />
            </Box>
        </Container>
    );
}
