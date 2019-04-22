<template>
  <div class="loading">
    <div class="c-cube-1">
      <div class="c-cube">
        <div class="c-cube__side test front"></div>
        <div class="c-cube__side test back"></div>
        <div class="c-cube__side test left"></div>
        <div class="c-cube__side test right"></div>
        <div class="c-cube__side top"></div>
      </div>
    </div>
    <div class="line line-1"></div>
    <div class="line line-2"></div>
    <div class="line line-3"></div>
    <div class="line line-4"></div>
    <div class="progress-text origin-font">{{num}}%</div>
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
      if (this.num === 100) {
        this.timer = null
        this.flag = true
        this.$emit('loaderComplete')
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
