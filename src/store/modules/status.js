import * as types from '../mutation-types';
// import Vue from 'vue';

const state = {
    error: null,
    dongle: null,
    dexmo_1: null,
    dexmo_2: null,
    log: null,
    bind_1: null,
    bind_2: null,
    page: 'hello',
    handRate: null,
    packetRate: null,
    serialPortRate: null,
    rawStreaming: null,
    frameRate: null,
    serverInfo: null
};

const getters = {
    error: state => state.error,
    dongle: state => state.dongle,
    dexmo: state => [state.dexmo_1, state.dexmo_2],
    bind: state => [state.bind_1, state.bind_2],
    page: state => state.page,
    handRate: state => state.handRate,
    packetRate: state => state.packetRate,
    serialPortRate: state => state.serialPortRate,
    rawStreaming: state => state.rawStreaming,
    frameRate: state => state.frameRate,
    serverInfo: state => state.serverInfo
};

const mutations = {
    [types.SET_KEYVALUEPAIR] (state, { key, value }) {
        state[key] = value;
    },
    [types.PUSH_KEYVALUEPAIR] (state, { key, value }) {
        state[key] = value;
    }
};

export default {
    state,
    getters,
    mutations
};
