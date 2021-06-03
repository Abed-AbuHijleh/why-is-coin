import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import { BsChevronUp } from 'react-icons/bs'
import { BsChevronDown } from 'react-icons/bs'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
})

function circSuppCalc(post) {
  const max = parseInt(post.data[1].value.split(',').join(''))
  const current = parseInt(post.data[0].value.split(',').join(''))
  if (max > 0) {
    return returnSigFigs((current / max) * 100, 4)
  } else {
    return '--'
  }
}

function numberWithCommas(x) {
  const parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

function returnSigFigs(value, sigFigs) {
  if (sigFigs === 4) {
    if (value < 1 && value > -1) {
      if (value < 0.001 && value > -0.001) {
        return Math.round(value * 10000000) / 10000000
      } else {
        return Math.round(value * 10000) / 10000
      }
    } else {
      return Math.round(value * 100) / 100
    }
  } else if (sigFigs === 2) {
    if (value > 0) {
      return '+' + Math.round(value * 100) / 100
    } else {
      return Math.round(value * 100) / 100
    }
  } else {
    return Math.round(value)
  }
}

const Row = (props) => {
  const { row } = props
  const [open, setOpen] = React.useState(true)
  const classes = useRowStyles()

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <BsChevronUp /> : <BsChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="h6" gutterBottom component="div">
            {row.header}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {row.index === '2' ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  {row.data[0].map((value, index) => {
                    return (
                      <Chip
                        key={index}
                        variant="outlined"
                        color="primary"
                        label={value.split('-').join(' ')}
                        style={{ margin: 2 }}
                      />
                    )
                  })}
                </div>
              ) : (
                <Table size="small" aria-label="info">
                  <TableBody>
                    {row.data.map((dataRow) => (
                      <TableRow key={dataRow.date}>
                        <TableCell component="th" scope="row">
                          {dataRow.key}
                        </TableCell>
                        <TableCell>{dataRow.value}</TableCell>
                      </TableRow>
                    ))}
                    {row.index === '1' ? (
                      <TableRow>
                        <TableCell>
                          <Slider
                            style={{ color: 'rgb(52, 52, 255)' }}
                            defaultValue={circSuppCalc(row)}
                            aria-labelledby="disabled-slider"
                            disabled
                          />
                        </TableCell>
                        <TableCell>{circSuppCalc(row)}%</TableCell>
                      </TableRow>
                    ) : (
                      <TableRow />
                    )}
                  </TableBody>
                </Table>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

const TickerInfo = ({ data, dataQuotes }) => {
  try {
    const rows = [
      {
        index: '0',
        header: 'Percent Change',
        data: [
          {
            key: '1 Hour',
            value: returnSigFigs(dataQuotes.percent_change_1h, 2) + '%',
          },
          {
            key: '24 Hours',
            value: returnSigFigs(dataQuotes.percent_change_24h, 2) + '%',
          },
          {
            key: '7 Days',
            value: returnSigFigs(dataQuotes.percent_change_7d, 2) + '%',
          },
          {
            key: '30 Days',
            value: returnSigFigs(dataQuotes.percent_change_30d, 2) + '%',
          },
          {
            key: '60 Days',
            value: returnSigFigs(dataQuotes.percent_change_60d, 2) + '%',
          },
          {
            key: '90 Days',
            value: returnSigFigs(dataQuotes.percent_change_90d, 2) + '%',
          },
        ],
      },
      {
        index: '1',
        header: 'Circulating Supply',
        data: [
          {
            key: 'Circulating Supply',
            value: numberWithCommas(returnSigFigs(data.circulating_supply, 4)),
          },
          {
            key: 'Max Supply',
            value: numberWithCommas(returnSigFigs(data.max_supply, 4)),
          },
        ],
      },
      {
        index: '2',
        header: 'Tags',
        data: [data.tags],
      },
    ]

    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant="h6" gutterBottom component="div">
                  Price
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" gutterBottom component="div">
                  {'$' +
                    numberWithCommas(returnSigFigs(data.quote.USD.price, 4))}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography gutterBottom component="div">
                  24h Volume
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography gutterBottom component="div">
                  {'$' +
                    numberWithCommas(
                      returnSigFigs(data.quote.USD.volume_24h, 4),
                    )}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography gutterBottom component="div">
                  Platform
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography gutterBottom component="div">
                  {data.platform === null ? data.name : data.platform}
                </Typography>
              </TableCell>
            </TableRow>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  } catch (e) {
    return <div>Loading</div>
  }
}

export default TickerInfo
