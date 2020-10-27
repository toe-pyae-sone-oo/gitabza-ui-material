import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import useStyles from './SectionHeaderStyle'

const SectionHeader = ({ title = '' }) => {
  const classes = useStyles()
  return (
    <div 
      className={classes.header}
    >
      <Typography
        variant="h6"
        className={classes.title}
      >
        {title}
      </Typography>
      <Button
        className={classes.showAllBtn}
        color="primary"
      >
        Show all
      </Button>
    </div>
  )
}

export default SectionHeader