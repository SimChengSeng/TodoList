import React from 'react';

function center(props) {
  return (
    <div style={{
      display: 'grid',
      height: '40vh',
      alignContent: 'center'
        }}>
            {props.children}
    </div>
  )
}

export default center;