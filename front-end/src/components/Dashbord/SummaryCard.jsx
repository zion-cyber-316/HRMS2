import React from 'react'

const SummaryCard = ({icon,text,number,color}) => {
  return (
    <div className='rounded flex text-white bg-white'>
        <div className={`text-3xl flex justify-center items-center ${color} text-white px-4`}>
{icon}
        </div>
        <div className='pl-4 py-1'>
            <p className='text-lg font-semibold text-black'>{text}</p>
            <p className='text-xl font-bold text-black'>{number}</p>
        </div>
    </div>
  )
}

export default SummaryCard