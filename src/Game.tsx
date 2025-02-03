//import { IconButton, Stack } from '@mui/material'
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  IconButton,
} from '@mui/material'
import { useQuestionsStore } from './store/questions'
import { type Question as QuestionType } from './types'
import SyntaxHighLighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import Footer from './Footer'

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info

  //Usuario no ha seleccionado nada todavia
  if (userSelectedAnswer == null) return 'transparent'
  //Si ya selecciono pero es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return 'transparent'
  //Si es la solucion correcta
  if (index === correctAnswer) return 'green'
  //Si esta es la seleccion del usuario pero es incorrecta
  if (index === userSelectedAnswer) return 'red'
  //Si no es ninguna de las anteriores

  return 'transparent'
}

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)
  const createHandleClick = (answreIndex: number) => () => {
    selectAnswer(info.id, answreIndex)
  }

  return (
    <Card
      variant="outlined"
      sx={{ bgColor: '#222', p: 2, textAlign: 'left', marginTop: 4 }}
    >
      <Typography variant="h5">{info.question}</Typography>
      <SyntaxHighLighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighLighter>

      <List sx={{ bgColor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} divider>
            <ListItemButton
              disabled = {info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{ backgroundColor: getBackgroundColor(info, index) }}
            >
              <ListItemText
                primary={answer}
                sx={{ textAlign: 'center' }}
              ></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

function Game() {
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion)
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore((state) => state.goPreviousQuestion)

  const questionInfo = questions[currentQuestion]
  return (
    <>
    <Stack direction='row' gap={2} alignItems='center' justifyContent='center' >
      <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
        <ArrowBackIosNew/>
      </IconButton>
      {currentQuestion + 1 } / {questions.length}
      <IconButton onClick={goNextQuestion} disabled={currentQuestion > questions.length - 1}>
        <ArrowForwardIos/>
      </IconButton>
      <Question info={questionInfo} />
      <Footer/>
    </Stack>
    </>
  )
}
export default Game
