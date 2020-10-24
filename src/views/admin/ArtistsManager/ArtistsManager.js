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
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Pagination from '@material-ui/lab/Pagination'
import InputAdornment from '@material-ui/core/InputAdornment'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'
import { LOAD_ADMIN_ARTISTS } from '../../../constants/actionTypes'
import { find, remove } from '../../../api/artists'
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
  history,
}) => {
  const classes = useStyles()

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [dialog, setDialog] = useState(false)
  const [deleteId, setDeleteId] = useState(undefined)

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

  const handleSearchChange = e => setSearch(e.target.value)

  const handleSearch = () => 
    fetchArtists({
      name: search.trim(),
    })
      .then(loadArtists)

  const handleSearchKeyDown = e => {
    e.keyCode === 13 && fetchArtists({ 
      name: search.trim() 
    })
      .then(loadArtists)
  }

  const confirmDelete = id => {
    openDialog()
    setDeleteId(id)
  }

  const handleDelete = () => {
    remove(deleteId)
      .then(() => fetchArtists({ name: search.trim() }))
      .then(loadArtists)
    setDeleteId(undefined)
    closeDialog()
  }

  const closeDialog = () => setDialog(false)
  const openDialog = () => setDialog(true)

  return (
    <>
      <Card 
        className={classes.root}
        variant="outlined"
      >
        <div className={classes.header}>
          <Typography 
            variant="h5"
            className={classes.title}
          >
            Artists
          </Typography>
          <Button 
            className={classes.addButton}
            variant="outlined"
            color="primary"
            startIcon={<AddIcon/>}
            onClick={() => history.push('/admin/artists/new')}
          >
            New
          </Button>
        </div>
        <div 
          className={classes.searchContainer}
        >
          <TextField 
            variant="outlined" 
            label="Name"
            size="small"
            className={classes.search}
            InputProps={{
              endAdornment: (
                <InputAdornment positon="end">
                  <SearchIcon/>
                </InputAdornment>
              )
            }}
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
          <Button 
            variant="contained"
            color="primary"
            className={classes.searchButton}
            disableElevation
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
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
                          onClick={() => 
                            history.push(`/admin/artists/${artist.uuid}/edit`)
                          }
                        >
                          <EditIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton 
                          size="small"
                          className={classes.delete}
                          onClick={() => confirmDelete(artist.uuid)}
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
      <Dialog 
        open={dialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">
          Delete Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>
            Cancel
          </Button>
          <Button 
            color="primary"
            onClick={handleDelete}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsManager)