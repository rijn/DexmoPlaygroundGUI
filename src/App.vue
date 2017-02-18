<template>
    <div id="app">
        <router-view></router-view>
        {{status.error}}
    </div>
</template>

<script>
import Hello from './components/Hello';

export default {
    name: 'app',
    data () {
        return {
            status: {}
        };
    },
    components: {
        Hello
    },
    methods: {
        fetchStatus () {
            let _o = JSON.parse(window.cefInteractionObject.getStatus());
            for (let key in _o) {
                if (!_o.hasOwnProperty(key)) continue;
                this.$set(this.status, key, _o[key]);
            }
        }
    },
    mounted () {
        window.emit = () => {
            this.fetchStatus();
        };
        this.fetchStatus();
    }
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
