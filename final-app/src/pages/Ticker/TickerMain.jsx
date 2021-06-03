import React, { useState } from 'react'
import './TickerMain.css'

import { ResponsiveLine } from '@nivo/line'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const tableData = [
  {
    id: 'HistPrice',
    data: [
      {
        x: 'plane',
        y: 250,
      },
      {
        x: 'helicopter',
        y: 207,
      },
      {
        x: 'boat',
        y: 61,
      },
      {
        x: 'train',
        y: 61,
      },
      {
        x: 'subway',
        y: 250,
      },
      {
        x: 'bus',
        y: 156,
      },
      {
        x: 'car',
        y: 133,
      },
      {
        x: 'moto',
        y: 180,
      },
      {
        x: 'bicycle',
        y: 169,
      },
      {
        x: 'horse',
        y: 243,
      },
      {
        x: 'skateboard',
        y: 260,
      },
      {
        x: 'others',
        y: 285,
      },
    ],
  },
]

const TickerMain = ({ id, data, dataQuotes }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [graphTime, setGraphTime] = useState('7d')

  const handleChange = (event, newValue) => {
    setGraphTime(newValue)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClose7d = () => {
    if (graphTime === '7d') {
    } else {
      setGraphTime('7d')
    }
    setAnchorEl(null)
  }

  const handleClose30d = () => {
    if (graphTime === '30d') {
    } else {
      setGraphTime('30d')
    }
    setAnchorEl(null)
  }

  const handleClose1y = () => {
    if (graphTime === '1y') {
    } else {
      setGraphTime('1y')
    }
    setAnchorEl(null)
  }

  const handleCloseAll = () => {
    if (graphTime === 'all') {
    } else {
      setGraphTime('all')
    }
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          height: '30px',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 15,
        }}
      >
        <h3>{data.name} Graph</h3>
        {window.innerWidth < 960 ? (
          <React.Fragment>
            <Button
              color="primary"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              variant="contained"
              size="small"
              style={{ height: '25px' }}
            >
              <h3>{graphTime}</h3>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              variant="filled"
            >
              <MenuItem onClick={handleClose7d}>7D</MenuItem>
              <MenuItem onClick={handleClose30d}>30D</MenuItem>
              <MenuItem onClick={handleClose1y}>1Y</MenuItem>
              <MenuItem onClick={handleCloseAll}>All</MenuItem>
            </Menu>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Paper square>
              <Tabs
                value={graphTime}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
              >
                <Tab value="7d" label="7D" />
                <Tab value="30d" label="30D" />
                <Tab value="1y" label="1Y" />
                <Tab value="all" label="All" />
              </Tabs>
            </Paper>
          </React.Fragment>
        )}
      </div>
      <div style={{ width: '100%', height: '40vh' }}>
        <ResponsiveLine
          data={tableData}
          margin={{ top: 10, right: 10, bottom: 10, left: 50 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-$,.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Price',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          enableGridX={false}
          enablePoints={false}
          colors={{ scheme: 'red_yellow_green' }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[]}
        />
      </div>
    </React.Fragment>
  )
}

export default TickerMain
