<template>
    <div :width="width" id="chart">
        <svg :width="cw" :height="height">
            <g :style="{transform: `translate(${margin.left}px, ${margin.top}px)`}">
                <path class="area" :d="paths.area" />
                <path class="line" :d="paths.line" />
                <!-- <path class="selector" :d="paths.selector" /> -->
            </g>
        </svg>
    </div>
</template>

<script>
import * as d3 from 'd3';

export default {
    name: 'chart',
    props: {
        data: {
            type: Array,
            default: () => []
        },
        margin: {
            type: Object,
            default: () => ({
                left: 0,
                right: 0,
                top: 10,
                bottom: 10
            })
        },
        ceil: {
            type: Number,
            default: 100
        }
    },

    data () {
        return {
            width: 0,
            height: 0,
            paths: {
                area: '',
                line: '',
                selector: ''
            },
            lastHoverPoint: {},
            scaled: {
                x: null,
                y: null
            },
            animatedData: [],
            points: []
        };
    },
    computed: {
        padded () {
            const width = this.width - this.margin.left - this.margin.right;
            const height = this.height - this.margin.top - this.margin.bottom;
            return { width, height };
        },
        cw () {
            return Math.max(this.width, this.data.length * 2);
        }
    },
    mounted () {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.onResize);
    },
    watch: {
        data: function dataChanged (newData, oldData) {
            this.update();
        },
        width: function widthChanged () {
            this.initialize();
            this.update();
        }
    },
    methods: {
        onResize () {
            this.width = this.$el.offsetWidth;
            this.height = this.$el.offsetHeight;
        },
        createArea: d3.area().x(d => d.x).y0(d => d.max).y1(d => d.y),
        createLine: d3.line().x(d => d.x).y(d => d.y),
        createValueSelector: d3.area().x(d => d.x).y0(d => d.max).y1(0),
        initialize () {
            // this.scaled.x = d3.scaleLinear().range([0, this.data.length]);
            this.scaled.x = d3.scaleIdentity();
            this.scaled.y = d3.scaleLinear().range([this.padded.height, 0]);
            d3.axisLeft().scale(this.scaled.x);
            d3.axisBottom().scale(this.scaled.y);
        },
        update () {
            this.scaled.x = d3.scaleLinear().range([0, this.data.length * 2]);
            this.scaled.x.domain(d3.extent(this.data, (d, i) => i));
            this.scaled.y.domain([0, this.ceil]);
            this.points = [];
            for (const [i, d] of this.data.entries()) {
                this.points.push({
                    x: this.scaled.x(i),
                    y: this.scaled.y(d),
                    max: this.height
                });
            }
            this.paths.area = this.createArea(this.points);
            this.paths.line = this.createLine(this.points);
            this.$nextTick(() => {
                document.getElementById('chart').scrollLeft = this.data.length * 2;
            });
        }
        // mouseover ({ offsetX }) {
        //     if (this.points.length > 0) {
        //         const x = offsetX - this.margin.left;
        //         const closestPoint = this.getClosestPoint(x);
        //         if (this.lastHoverPoint.index !== closestPoint.index) {
        //             const point = this.points[closestPoint.index];
        //             this.paths.selector = this.createValueSelector([point]);
        //             this.$emit('select', this.data[closestPoint.index]);
        //             this.lastHoverPoint = closestPoint;
        //         }
        //     }
        // },
        // getClosestPoint (x) {
        //     return this.points
        //         .map((point, index) => ({ x:
        //             point.x,
        //             diff: Math.abs(point.x - x),
        //             index
        //         }))
        //         .reduce((memo, val) => (memo.diff < val.diff ? memo : val));
        // }
    }
};
</script>

<style lang="less" scoped>
@import "../style/const.less";

div {
    overflow-x: scroll;
    overflow-y: hidden;
}
.area {
    fill: fade(@green, 50%);
}
.line {
    stroke: @green;
    stroke-width: 1px;
    fill: none;
}
.selector {
    stroke: lighten(@green, 10%);
    stroke-width: 1px;
    fill: none;
}
</style>