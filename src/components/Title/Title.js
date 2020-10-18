import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const Title = ({ icon, content = '' }) =>
  <Typography 
    variant="h6"
    gutterBottom
  >
    <Box 
      display="flex"
      alignItems="center"
    >
      {icon ?? {}}
      {content}
    </Box>
  </Typography>

export default Title