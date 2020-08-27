import React from 'react';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';
import { connect } from 'react-redux';

const CounterContainer = ({ number, increase, decrease }) => {
    return (
        <div>
            <Counter number={number} onIncrease={increase} onDecrease={decrease} />
        </div>
    );
};

export default connect(
    state => ({
        number:state.counter
    }),
    {
        increase,
        decrease
    }
)(CounterContainer);
