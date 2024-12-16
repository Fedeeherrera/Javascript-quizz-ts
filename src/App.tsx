import { Container, Typography, Stack } from '@mui/material'
import './App.css'

function App() {
  return (
    <>
      <main>
        <Container maxWidth='sm'>
          <Typography variant='h2' component='h1'>
            <Stack direction='row'>
              <h1>JavaScript Quizz</h1>
            </Stack>
          </Typography>
        </Container>
      </main>
    </>
  )
}

export default App
