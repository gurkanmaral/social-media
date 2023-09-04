import React from 'react'
import "./Spinner.scss"
import {Circles} from 'react-loader-spinner'

const Spinner = () => {

  return (
    <div className='spinner'>
        <Circles 
        type="Circles"
        color="#000"
        height={50}
        width={200}
        />
    </div>
  )
}

export default Spinner