import React from 'react'

const Component = () => {
  return (
    <div style={{ marginTop: '-4px' }}>
      <h4
        style={
          window.innerWidth < 960
            ? {
                color: 'white',
                margin: '5px',
                marginBottom: '35px',
                borderTop: '2px solid black',
              }
            : {
                color: 'white',
                margin: '5px',
                borderTop: '2px solid black',
              }
        }
      >
        © 2021 by Why is Coin?.
      </h4>
    </div>
  )
}

export default Component
