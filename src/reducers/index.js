import packages from './packages';
import spreads from './spreads';
import securities from './securities';
import tags from './tags';
import { reducer as formReducer } from 'redux-form';


const form = formReducer.normalize({});

const reducers = { packages, spreads, securities, tags, form };


export default reducers;
