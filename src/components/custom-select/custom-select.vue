<template>
  <div class="custom-select-container">
    <div class="value-text" @click="isShow = !isShow">
      {{title}}
      <i :class="['glyphicon', isShow ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down']"></i>
    </div>
    <ul class="select-ul" v-show="isShow">
      <li class="li-item" v-for="item of list" :key="item.id" @click.stop="clickSelect(item)">{{item.name}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'custom-select',
  data() {
    return {
      title: '请选择',
      isShow: false
    }
  },
  created() {

  },
  methods: {
    // 如果有传id,将默认显示传过的内容
    clickSelect(item) {
      if (item.name !== this.title) {
        this.title = item.name
        this.isShow = false
      }
      // window.console.log(e)
    }
  },
  props: {
    currentId: {
      type: [Number, String],
      default() {
        return 0
      }
    },
    list: {
      type: Array,
      default() {
        return [
          {
            id: 1,
            name: '青椒肉丝'
          },
          {
            id: 2,
            name: '土豆牛肉'
          },
          {
            id: 3,
            name: '西红柿鸡蛋'
          },
        ]
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.custom-select-container
  position relative
  .value-text
    height: 30px;
    line-height 1.5
    border 1px solid #dddddd
  .select-ul
    position absolute
    left 0
    top 34px
    width 100%
    box-shadow 0 0 3px rgba(100, 100, 100, .3)
    .li-item
      line-height 30px
</style>
