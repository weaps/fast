<template>
  <div class="loading">
    <div class="con">
      <div class="cube-1">
        <div class="cube-side cube-side-front"></div>
        <div class="cube-side cube-side-back"></div>
        <div class="cube-side cube-side-left"></div>
        <div class="cube-side cube-side-right"></div>
        <div class="cube-side cube-side-top"></div>
      </div>
    </div>
    <div class="line line-1"></div>
    <div class="line line-2"></div>
    <div class="line line-3"></div>
    <div class="line line-4"></div>
    <div class="progress-text">{{num}}%</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      num: 0,
      flag: false,
      timer: null
    }
  },
  mounted() {
    this.progress()
    this.timer = setInterval(() => {
      this.progress()
    }, 50);
  },
  methods: {
    progress() {
      this.num ++
      if (this.num === 1) {
        clearTimeout(this.timer)
        // this.timer = null
        // this.flag = true
        // this.$emit('loaderComplete')
      }
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
</style>
