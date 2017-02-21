<template>
    <div class="main">
        <span class="info">{{ serverInfo }}</span>
        <chart
            :data="data"
            :ceil="100"
            class="chart" />
        <br/>
        <button @click="cef.set('operate', 'stopServer')">
            <span>Stop Server and Exit</span>
        </button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Chart from './Chart';

export default {
    name: 'server',

    components: { Chart },

    computed: mapGetters([
        'dongle',
        'dexmo',
        'frameRate',
        'serverInfo'
    ]),

    data () {
        return {
            cef: window.cefInteractionObject,
            data: []
        };
    },

    mounted () {
        setInterval(() => {
            this.data.push(Number(this.frameRate) || 0);
            if (this.data.length > 1000) {
                this.data.splice(0, 500);
            }
        }, 100);
    },

    methods: {
    }
};
</script>

<style scoped lang="less">
@import "../style/const.less";

.chart {
    height: 200px;
}

.main {
    span.info {
        display: inline-block;
        padding: 5px 20px;
        height: 20px;
        line-height: 20px;
        background: @btn-bg;
        border-radius: 15px;
        font-size: 0.8em;
    }
}
</style>
