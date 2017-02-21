<template>
    <div class="hello">
        <ul class="dongle">
            <li v-for="item in dongle">
                <div>
                    <span>Dongle</span><span>{{ item }}</span>
                </div>
            </li>
        </ul>

        <p>Searching for Dexmo</p>

        <ul class="dexmo">
            <li v-for="item in dexmo">
                <div v-if="item">
                    <span>Dexmo</span><span>{{ item }}</span>
                </div>
            </li>
        </ul>

        <button v-show="!bind[0]" :disabled="!dexmo || !dexmo.length || bind[0] || !dexmo[0]" @click="cef.set('bind_1', 'true')">
            <span v-if="!bind[0]">Bind</span>
        </button>

        <button v-show="bind[0]" :disabled="!dexmo || !dexmo.length || bind[1] || !dexmo[1]" @click="cef.set('bind_2', 'true')">
            <span v-if="!bind[1]">Bind</span>
        </button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import router from '../router';

export default {
    name: 'hello',

    computed: mapGetters([
        'dongle',
        'dexmo',
        'bind',
        'page'
    ]),

    watch: {
        page: function (to, from) {
            router.push({
                name: 'main'
            });
        }
    },

    data () {
        return {
            cef: window.cefInteractionObject
        };
    },

    methods: {
    }
};
</script>

<style scoped lang="less">
@import "../style/const.less";

ul.dongle, ul.dexmo {
    li {
        display: block;
        & > div {
            display: inline-block;
            height: 30px;
            margin: 3px;
            background: @btn-bg;
            border-radius: 15px;

            overflow: hidden;

            & > span {
                display: inline-block;
                height: 30px;
                line-height: 20px;
                padding: 5px 10px;

                &:first-child {
                    padding-right: 5px;
                    background: @green;
                    color: @background-color;
                }
                &:last-child {
                    padding-left: 5px;
                }
            }
        }
    }
}
</style>
