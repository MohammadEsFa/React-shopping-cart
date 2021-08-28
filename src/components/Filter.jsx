import React,{Component} from 'react';

class Filter extends Component {
    state = {  }
    render() { 
        return ( 
            <div className='filter'>
                <div className='filter-result'> {this.props.count} Products</div>
                <div className='filter-sort'>Order:{' '}
                    <select 
                    value={this.props.sort} 
                    onChange={this.props.handlesort}
                    >
                        <option>Latest</option>
                        <option value='Highest'>Highest</option>
                        <option value='Lowset'>Lowest</option>
                    </select>
                </div>
                <div className='filter-size'>Size:{' '}
                <select
                value={this.props.size} 
                onChange={this.props.handlesize}
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
}
 
export default Filter;