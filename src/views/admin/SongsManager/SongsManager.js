import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Pagination from '@material-ui/lab/Pagination'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { getIndex, getOffset, getTotalPages } from '../../../helpers/pagination'
import { LOAD_ADMIN_SONGS } from '../../../constants/actionTypes'
import { find, remove } from '../../../api/songs'
import useStyles from './SongsManagerStyle'

const LIMIT_PER_PAGE = 10

const mapStateToProps = state => ({
  loading: state.loading,
  songs: state.adminSongs.data,
  count: state.adminSongs.count,
  changed: state.adminSongs.changed,
  page: state.adminSongs.page,
  verified: state.adminToken.verified,
})

const mapDispatchToProps = dispatch => ({
  loadSongs: ({ songs, count, page = 1, changed }) => dispatch({
    type: LOAD_ADMIN_SONGS,
    payload: {
      data: songs,
      count,
      page, 
      changed,
    },
  })
})

const fetchSongs = ({ title, skip = 0 }) => 
  find({
    title,
    limit: LIMIT_PER_PAGE,
    sort: 'created_at',
    order: 'desc',
    skip,
  })

const SongsManager = ({ 
  songs, 
  count, 
  page,
  changed,
  loading, 
  loadSongs,
  history,
  verified,
}) => {

  const classes = useStyles()

  const [search, setSearch] = useState('')
  const [dialog, setDialog] = useState(false)
  const [deleteId, setDeleteId] = useState(undefined)

  useEffect(() => {
    verified && 
    changed &&
    fetchSongs({}).then(loadSongs)
  }, [loadSongs, verified])

  const handlePageChange = (_, newPage) => {
    fetchSongs({ 
      skip: getOffset({ 
        page: newPage, 
        limit: LIMIT_PER_PAGE 
      }),
    })
      .then(({ songs, count }) => 
        loadSongs({ songs, count, page: newPage, changed: false })
      )
  }

  const handleSearchChange = e => setSearch(e.target.value)

  const handleSearch = () => 
    fetchSongs({
      title: search.trim(),
    })
      .then(loadSongs)

  const handleSearchKeyDown = e => {
    e.keyCode === 13 && handleSearch()
  }

  const confirmDelete = id => {
    openDialog()
    setDeleteId(id)
  }

  const handleDelete = () => {
    remove(deleteId).then(handleSearch)
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
            Songs
          </Typography>
          <Button
            className={classes.addButton}
            variant="outlined"
            color="primary"
            startIcon={<AddIcon/>}
            onClick={() => history.push('/admin/songs/new')}
          >
            New
          </Button>
        </div>
        <div className={classes.searchContainer}>
          <TextField 
            variant="outlined" 
            label="Title"
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
                <TableCell className={classes.titleCol}>Title</TableCell>
                <TableCell className={classes.actionCol}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading
                ? songs.map((song, index) =>
                    <TableRow key={song.uuid}>
                      <TableCell>
                        {getIndex({ 
                          page, 
                          limit: LIMIT_PER_PAGE, 
                          index,
                        })}
                      </TableCell>
                      <TableCell>
                        {song.title}
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          size="small"
                          className={classes.edit}
                          onClick={() => 
                            history.push(`/admin/songs/${song.uuid}/edit`)
                          }
                        >
                          <EditIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton 
                          size="small"
                          className={classes.delete}
                          onClick={() => confirmDelete(song.uuid)}
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
                    >
                      Loading...
                    </TableCell>
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

export default connect(mapStateToProps, mapDispatchToProps)(SongsManager)