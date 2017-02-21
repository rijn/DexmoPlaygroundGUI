import * as types from './mutation-types';

export const setKeyValuePair = ({ commit }, value) => {
    commit(types.SET_KEYVALUEPAIR, value);
};

export const pushKeyValuePair = ({ commit }, value) => {
    commit(types.PUSH_KEYVALUEPAIR, value);
};
