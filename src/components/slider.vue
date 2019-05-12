<template>
  <div class="slider-container" @mouseover="isCarousel = true" @mouseout="isCarousel = false">
    <div class="slider-inner">
      <div class="item" :key="active">
        <a :href="list[active].link || 'javascript:;'">
          <img :src="list[active].url || list[active]" :alt="list[active].name">
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
  name: 'slider',
  data() {
    return {
      isCarousel: false,
      active: 0,
      time: null,
      leaveToCalss: '',
      interval: 3000,
      arr: [1,2,3]
    }
  },
  computed: {
    imgLen() {
      return this.list.length
    }
  },
  mounted() {
    this.init()
    window.console.log(this.splice(this.arr, 2))
  },
  methods: {
    splice(arr, index) {
      return index += index >= 0 ? 0 : arr.length - 1
    },
    init() {
      const listType = Object.prototype.toString.call(this.list)
      for (var i = 0; i < this.imgLen; i++) {}
      // 容错判断
      if (this.list === undefined || listType !== '[object Array]') {
        window.console.error('传入的数据有误，需要传数组')
      } else if (this.imgLen < 1) {
        window.console.warn('轮播图片不得少于一张')
      } else {
        this.carouselAnimation()
      }
    },
    carouselAnimation() {
      if(!this.isCarousel) { 
        this.move(1)
      }
      setTimeout(this.carouselAnimation.bind(this), this.interval)
    },
    move(direction, index) {
      // direction 为轮播方向，正数为右，负数为左, index 为当前轮播图
      let num = this.active
    }
  },
  props: {
    list: {
      type: Array,
      default() {
        return [
          {
            url: 'http://pic3.iqiyipic.com/common/lego/20190504/c44b550fd0344a04865f7f92df690e1c.jpg',
            name: '',
            link: ''
          }
        ]
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.slider-container
  .slider-inner
    .item
      img
        width 100%
        height 400px
</style>
