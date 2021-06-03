import React from 'react'
import HeaderImg from '../resources/images/page-not-found.png'

const PageNotFound = () => {
  return (
    <div
      style={{
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        alt="404 Page Not Found"
        src={HeaderImg}
        style={{ width: '80vw', maxWidth: '900px' }}
      />
    </div>
  )
}

export default PageNotFound
