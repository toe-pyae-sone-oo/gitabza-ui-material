import React from 'react'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import ChordSvg from '@tombatossals/react-chords/lib/Chord'
import guitar from '@tombatossals/chords-db/lib/guitar.json'
import ukulele from '@tombatossals/chords-db/lib/ukulele.json'
import useStyles from './ChordStyle'

const Chord = ({ 
  chordKey = '', 
  chord = {}, 
  position = 1, 
  total = 1,
  instrument = 'guitar',
  onLeft = f => f,
  onRight = f => f,
}) => {
  const classes = useStyles()

  return (
    <div
      className={classes.root}
    >
      <Typography
        variant="body2"
        className={classes.chordKey}
        gutterBottom
      >
        {chordKey}
      </Typography>
      <div
        className={classes.chord}
      >
        <ChordSvg
          chord={chord}
          instrument={{
            ...(instrument === 'ukulele' ? ukulele.main : guitar.main),
            tunings: {
              standard: (instrument === 'ukulele' ? ukulele : guitar).tunings.standard,
            },
          }}
          lite={false}
        />
      </div>
      <div 
        className={classes.action}
      >
        <IconButton 
          size="small"
          onClick={() => onLeft()}
        >
          <KeyboardArrowLeftIcon 
            fontSize="small" 
          />
        </IconButton>
        <Typography
          display="inline"
          variant="caption"
        >
          {position} of {total}
        </Typography>
        <IconButton 
          size="small"
          onClick={() => onRight()}
        >
          <KeyboardArrowRightIcon
            fontSize="small"
          />
        </IconButton>
      </div>
    </div>
  )
}

export default Chord