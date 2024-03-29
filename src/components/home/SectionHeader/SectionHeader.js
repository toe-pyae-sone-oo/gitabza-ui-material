import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import useStyles from './SectionHeaderStyle'

const SectionHeader = ({ title = '', onShowAll = f => f }) => {
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
      {onShowAll && 
        <Button
          className={classes.showAllBtn}
          color="primary"
          onClick={onShowAll}
          variant="outlined"
          size="small"
        >
          Show all
        </Button>
      }
    </div>
  )
}

export default SectionHeader