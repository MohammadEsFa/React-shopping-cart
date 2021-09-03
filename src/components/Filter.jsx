import React from 'react';

const Filter = ({count , size , sort , handlesort , handlesize}) => {
    
        return ( 
            <div className='filter'>
                <div className='filter-result'> {count} Products</div>
                <div className='filter-sort'>Order:{' '}
                    <select 
                    value={sort} 
                    onChange={handlesort}
                    >
                        <option>Latest</option>
                        <option value='Highest'>Highest</option>
                        <option value='Lowset'>Lowest</option>
                    </select>
                </div>
                <div className='filter-size'>Size:{' '}
                <select
                value={size} 
                onChange={handlesize}
                >
                    <option value=''>All</option>
                    <option value='XS'>XS</option>
                    <option value='S'>S</option>
                    <option value='M'>M</option>
                    <option value='L'>L</option>
                    <option value='XL'>XL</option>
                    <option value='XXL'>XXL</option>
                </select>
                </div>
            </div>
         );
    }
 
export default Filter;