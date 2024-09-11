import React from 'react';

function center(props) {
  return (
    <div style={{
      display: 'grid',
     
      alignContent: 'center'
        }}>
            {props.children}
    </div>
  )
}

export default center;