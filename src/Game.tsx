//import { IconButton, Stack } from '@mui/material'
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { useQuestionsStore } from './store/questions'
import { type Question as QuestionType } from './types'
import SyntaxHighLighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const Question = ({ info }: { info: QuestionType }) => {
  return (
    <Card variant="outlined" sx={{ bgColor: '#222', p: 2, textAlign: 'left' }}>
      <Typography variant="h5">{info.question}</Typography>
      <SyntaxHighLighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighLighter>

      <List sx={{ bgColor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index}>
            <ListItemButton>
              <ListItemText primary={answer}></ListItemText>
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

  const questionInfo = questions[currentQuestion]
  return (
    <>
      <Question info={questionInfo} />
    </>
  )
}
export default Game
