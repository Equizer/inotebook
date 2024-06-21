import React from 'react'
import ItemLoadingPlaceholder from './ItemLoadingPlaceholder'

const LoadingPlaceholder = () => {
  return (
    <div className='row row-cols-md-4'>
     <ItemLoadingPlaceholder />
     <ItemLoadingPlaceholder />
     <ItemLoadingPlaceholder />
     <ItemLoadingPlaceholder />
    </div>
  )
}

export default LoadingPlaceholder
