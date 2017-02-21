<template>
    <div id="app" :style="{ height: fullHeight - 20 + 'px' }">
        <div v-if="error" class="error">
            {{ error }}
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'app',
    data () {
        return {
            status: {},
            fullHeight: document.documentElement.clientHeight
        };
    },

    computed: mapGetters([
        'error',
        'page'
    ]),

    methods: Object.assign(
        mapActions([
            'setKeyValuePair'
        ]), {
            fetchStatus () {
                let _o = JSON.parse(window.cefInteractionObject.getStatus());
                for (let key in _o) {
                    if (!_o.hasOwnProperty(key)) continue;
                    this.$store.dispatch('setKeyValuePair', { key: key, value: _o[key] });
                    this.$set(this.status, key, _o[key]);
                }
            },
            handleResize (event) {
                this.fullHeight = document.documentElement.clientHeight;
            }
        }
    ),

    mounted () {
        window.emit = () => {
            this.fetchStatus();
        };
        this.fetchStatus();
        window.addEventListener('resize', this.handleResize);
    },

    beforeDestroy: function () {
        window.removeEventListener('resize', this.handleResize);
    }
};
</script>

<style lang="less">
@import "./style/const.less";
@import "~normalize.css/normalize.css";

::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: fade(#fff, 50%);
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-thumb:hover {
  background: #ffffff;
}
::-webkit-scrollbar-thumb:active {
  background: #000000;
}
::-webkit-scrollbar-track {
  background: fade(#fff, 20%);
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-track:hover {
  background: fade(#fff, 50%);
}
::-webkit-scrollbar-track:active {
  background: fade(#fff, 20%);
}
::-webkit-scrollbar-corner {
  background: transparent;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #ddd;

    background: @background-color;

    padding: 10px;
}

.error {
    position: fixed;
    top: 10px;
    left: 10px;
    right: 10px;
    background: #f50;
}

button {
    align-items: center;
    background: @green;
    color: #fff;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    height: 36px;
    font-size: 14px;
    font-weight: 500;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin: 6px;
    min-width: 88px;
    outline: 0;
    padding: 0 16px;
    // text-transform: uppercase;
    text-decoration: none;
    -webkit-transition: .3s cubic-bezier(0,0,.2,1);
    transition: .3s cubic-bezier(0,0,.2,1);
    position: relative;
    vertical-align: middle;
    -webkit-appearance: button;
    text-align: initial;
    border-radius: 28px;
    border-style: none;

    &:hover {
        opacity: 0.9;
    }

    cursor: pointer;

    &:disabled {
        background-color: rgba(0,0,0,.12)!important;
        color: rgba(0,0,0,.26)!important;
    }

    &.red {
        background: darken(@red, 5%);
    }
}
</style>
