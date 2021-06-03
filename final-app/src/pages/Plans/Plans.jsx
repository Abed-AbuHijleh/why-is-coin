import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import { BsCheck } from 'react-icons/bs'
import { BsX } from 'react-icons/bs'

import './Plans.css'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width: '80vw',
    marginLeft: '10vw',
    marginTop: '3vh',
    marginBottom: '5vh',
    overflow: 'scroll',
  },
})

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Price', 'Free', 'Free', '$5 per Month', '$15 per Month'),
  createData(
    'Basic Statistics',
    <BsCheck color="green" size="2rem" />,
    <BsCheck color="green" size="2rem" />,
    <BsCheck color="green" size="2rem" />,
    <BsCheck color="green" size="2rem" />,
  ),
  createData(
    '7-Day Graph',
    <BsCheck color="green" size="2rem" />,
    <BsCheck color="green" size="2rem" />,
    <BsCheck color="green" size="2rem" />,
    <BsCheck color="green" size="2rem" />,
  ),
  createData(
    'Search News Upto 1 Month Old',
    <BsCheck color="green" size="2rem" />,
    <BsCheck color="green" size="2rem" />,
    <BsCheck color="green" size="2rem" />,
    <BsCheck color="green" size="2rem" />,
  ),
  createData(
    'Save and Track Coins',
    <BsX color="red" size="2rem" />,
    <BsCheck color="green" size="2rem" />,
    <BsCheck color="green" size="2rem" />,
    <BsCheck color="green" size="2rem" />,
  ),
  createData(
    'News Upto 3 Years Old',
    <BsX color="red" size="2rem" />,
    <BsX color="red" size="2rem" />,
    <BsCheck color="green" size="2rem" />,
    <BsCheck color="green" size="2rem" />,
  ),
  createData(
    'Interactive All Time Graphs',
    <BsX color="red" size="2rem" />,
    <BsX color="red" size="2rem" />,
    <BsCheck color="green" size="2rem" />,
    <BsCheck color="green" size="2rem" />,
  ),
  createData(
    'NewsFind Pro Filtering and Tools',
    <BsX color="red" size="2rem" />,
    <BsX color="red" size="2rem" />,
    <BsX color="red" size="2rem" />,
    <BsCheck color="green" size="2rem" />,
  ),
  createData(
    'Alerts and Notifications',
    <BsX color="red" size="2rem" />,
    <BsX color="red" size="2rem" />,
    <BsX color="red" size="2rem" />,
    <BsCheck color="green" size="2rem" />,
  ),
]

const Plans = () => {
  const classes = useStyles()

  return (
    <div className="plans-outer-div">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <h3>Features</h3>
              </TableCell>
              <TableCell align="right">
                <h3>Everyone</h3>
                <Button variant="outlined" color="primary" disabled>
                  Current
                </Button>
              </TableCell>
              <TableCell align="right">
                <h3>NewsFind Lite</h3>
                <Button variant="outlined" color="primary">
                  Upgrade
                </Button>
              </TableCell>
              <TableCell align="right">
                <h3>NewsFind Plus</h3>
                <Button variant="outlined" color="primary">
                  Upgrade
                </Button>
              </TableCell>
              <TableCell align="right">
                <h3>NewsFind Pro</h3>
                <Button variant="outlined" color="primary">
                  Upgrade
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Plans
