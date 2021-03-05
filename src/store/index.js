import {createStore} from 'vuex';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const debug = process.env.NODE_ENV !== 'production';

const modules = require.context('./modules', false, /\.js$/);


export default createStore({
    modules: modules.keys()
        .reduce((acc, key) => ({
            ...acc,
            [key.replace(/(\.\/|\.js)/g, '')]: modules(key).default,
        }), {}),
    state,
    mutations,
    actions,
    getters,
    strict: debug,
    plugins: [],
    // plugins: debug ? [createLogger()] : [],
});
