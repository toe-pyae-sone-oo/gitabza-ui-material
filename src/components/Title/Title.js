import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import useStyles from './TitleStyle'

const Title = ({ icon, content = '', gutterBottom = true, ...rest }) => {
  const classes = useStyles()
  return (
    <Typography 
      variant="h6"
      gutterBottom={gutterBottom}
      {...rest}
    >
      <Box 
        display="flex"
        alignItems="center"
      >
        {icon ?? {}}
        <span 
          className={classes.content}
        >
          {content}
        </span>
      </Box>
    </Typography>
  )
}

export default Title