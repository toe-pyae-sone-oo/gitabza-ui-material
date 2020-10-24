import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Pagination from '@material-ui/lab/Pagination'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { LOAD_ADMIN_ARTISTS } from '../../../constants/actionTypes'
import { find } from '../../../api/artists'
import { getTotalPages, getOffset, getIndex } from '../../../helpers/pagination'
import useStyles from './ArtistsManagerStyle'

const LIMIT_PER_PAGE = 10

const mapStateToProps = state => ({
  loading: state.loading,
  artists: state.adminArtists.data,
  count: state.adminArtists.count,
})

const mapDispatchToProps = dispatch => ({
  loadArtists: ({ artists, count }) => dispatch({ 
    type: LOAD_ADMIN_ARTISTS, 
    payload: {
      data: artists,
      count,
    },
  }),
})

const fetchArtists = ({ name, page = 0, skip = 0 }) => {
  console.log(skip)
  return find({ 
    name, 
    page, 
    limit: LIMIT_PER_PAGE,
    sort: 'created_at',
    order: 'desc',
    skip,
  })
}

const ArtistsManager = ({
  loading,
  artists,
  count,
  loadArtists,
}) => {
  const classes = useStyles()

  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchArtists({}).then(loadArtists)
  }, [loadArtists])

  const handlePageChange = (_, newPage) => {
    setPage(newPage)
    fetchArtists({ 
      page: newPage, 
      skip: getOffset({ 
        page: newPage, 
        limit: LIMIT_PER_PAGE 
      }),
    })
      .then(loadArtists)
  }

  return (
    <Card 
      className={classes.root}
      variant="outlined"
    >
      <Typography variant="h5">Artists</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.indexCol}>#</TableCell>
              <TableCell className={classes.nameCol}>Name</TableCell>
              <TableCell className={classes.actionCol}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading 
              ? artists.map((artist, index) => 
                  <TableRow key={artist.uuid}>
                    <TableCell>
                      {getIndex({ 
                        page, 
                        limit: LIMIT_PER_PAGE, 
                        index,
                      })}
                    </TableCell>
                    <TableCell
                      className={classes.artistName}
                    >
                      {artist.name}
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        size="small"
                        className={classes.edit}
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton 
                        size="small"
                        className={classes.delete}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              : <TableRow>
                  <TableCell 
                    colSpan={3}
                    className={classes.loadingCell}
                  >Loading...</TableCell>
                </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.paginationWrapper}>
        {!loading && 
          <Pagination
            count={getTotalPages({ count, limit: LIMIT_PER_PAGE })} 
            className={classes.pagination} 
            color="primary"
            page={page}
            onChange={handlePageChange}
          />
        }
      </div>
    </Card>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsManager)