<template>
  <div class="custom-select-container" @click.stop="isShow = !isShow" v-clickHide="test">
    <div class="value-text">
      {{title}}
      <i :class="['glyphicon', isShow ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down']"></i>
    </div>
    <ul class="select-ul" v-show="isShow">
      <li
        class="li-item"
        v-for="item of list"
        :key="item.id"
        :class="id === item.id ? 'selected' : ''"
        @click.stop="clickSelect(item)"
      >
        {{item.name}}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'custom-select',
  data() {
    return {
      title: '请选择',
      id: null,
      isShow: false
    }
  },
  created() {
    this.currentIdCon()
  },
  mounted() {
    let that = this
  },
  directives: {
    clickHide: {
      bind:function(el, binding, vnode) {
        document.addEventListener('click', function(e) {
          let ee = el.contains(e.target)
          let tar = e.target
          let bb = binding
          let vn = vnode
          debugger
          binding.value()
        })
      }
      // bind: function(el, binding) {
      //   // document.addEventListener('click', function(e) {
      //   //   debugger
      //   //   // if (el.contains(e.target)) return false
      //   //   // if (binding.expression) {
      //   //   //   binding.value()
      //   //   // }
      //   // })
      // }

      // [test]()
    }
  },
  methods: {
    test() {
      // debugger
      this.isShow = false
      window.console.log(this.isShow)
    },
    // 如果有传id,将默认显示传过来的id的内容
    currentIdCon() {
      const that = this
      if(this.currentId !== '' && this.currentId !== null) {
        this.list.filter(item => {
          if(item.id === that.currentId) {
            that.title = item.name
            that.id = item.id
          }
        })
      }
    },
    clickSelect(item) {
      if (item.name !== this.title) {
        this.title = item.name
        this.id = item.id
        this.isShow = false
      }
      // window.console.log(e)
    }
  },
  props: {
    currentId: {
      type: [Number, String],
      default() {
        return null
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
      &.selected
        background #eeeeee
        color #333
</style>
