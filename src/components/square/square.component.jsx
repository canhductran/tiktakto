import React from 'react';
import './square.css';

const Square = ({ rowIndex, columnIndex, value, onTick }) => (
    <div className='square' onClick={(event) => onTick(rowIndex, columnIndex)}>
        <div className='square-value'>
            {value ?
                value
                : ''
            }
        </div>

    </div>
)

export default Square;