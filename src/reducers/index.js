import packages from './packages';
import spreads from './spreads';
import { reducer as formReducer } from 'redux-form';


const form = formReducer.normalize({});

const reducers = { packages, spreads, form };


export default reducers;
