<template>
    <div class="main">
        <button :class="{ 'red': rawStreaming != 'true' }" @click="toggleRawStreaming">Raw Streaming</button>
        <div class="container">
            <a class="start" :class="{ 'active': server }" @click="startServer">
                <span v-if="!server">Start</span>
                <span v-if="server">Starting...</span>
                <div class="light">
                </div>
            </a>
        </div>
        <div class="status">
            <ul>
                <li><span>Hand Rate</span> <b>{{ handRate || 0 }}</b> hands/s</li>
                <li><span>Packet Rate</span> <b>{{ packetRate || 0 }}</b> packet/s</li>
                <li><span>SerialPort Rate</span> <b>{{ serialPortRate || 0 }}</b> KByte/s</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import router from '../router';

export default {
    name: 'main',

    computed: mapGetters([
        'page',
        'dongle',
        'dexmo',
        'rawStreaming',
        'handRate', 'packetRate', 'serialPortRate'
    ]),

    watch: {
        page: function () {
            router.push({
                name: 'server'
            });
        }
    },

    data () {
        return {
            cef: window.cefInteractionObject,
            server: false
        };
    },

    methods: {
        toggleRawStreaming () {
            if (this.rawStreaming === 'true') {
                this.cef.set('operate', 'stopRawStreaming');
            } else {
                this.cef.set('operate', 'startRawStreaming');
            }
        },
        startServer () {
            this.cef.set('operate', 'startServer');
            this.server = true;
        }
    }
};
</script>

<style scoped lang="less">
@import "../style/const.less";

ul li {
    list-style: none;
}

.status {
    display: inline-block;
    position: absolute;
    left: 10px;
    bottom: 0px;

    background: darken(@background-color, 5%);

    ul {
        text-align: left;
        padding: 10px;
        margin: 0;

        li {
            padding: 3px;

            span {
                display: inline-block;
                width: 110px;
            }
        }
    }
}

@radius: 150px;

a.start {
    // border: 0.3em solid @green;
    border-radius: @radius;
    height: @radius;
    width: @radius;
    display:inline-block;
    transition: all 1s ease;

    cursor: pointer;

    span {
        line-height: @radius;
    }

    position: relative;
    div.light {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        border-top: 3px solid lighten(@green, 50%);
        border-radius: 100%;

        opacity: 0;

        transition: all 1s ease;

        animation: spin 3s linear infinite;
    }

    background: @green;

    text-align: center;

    font-size: 1.4em;

    margin: 50px;

    background-size: 100% Auto;

    box-shadow: 0 0 50px fade(darken(@green, 10%), 80%), 0 0px 10px fade(darken(@green, 50%), 50%);

    &:hover, &.active {
        transform:scale(1.1);
        // border: 0.3em solid rgba(255,255,255, 0.9);
        background-size: 100% Auto;

        box-shadow: 0 0 100px darken(@green, 10%), 0 0px 10px fade(darken(@green, 50%), 50%);

        div.light {
            opacity: 0.5;
        }
    }
}

@keyframes spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
</style>
