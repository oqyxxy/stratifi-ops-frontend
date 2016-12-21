import packages from './packages';
import spreads from './spreads';
import securities from './securities';
import tags from './tags';
import options from './options';
import models from './models';
import backtests from './backtests';
import { reducer as formReducer } from 'redux-form';


const form = formReducer.normalize({});

const reducers = { packages, spreads, securities, tags, options, models, backtests, form };


export default reducers;
