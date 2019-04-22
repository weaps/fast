<template>
  <div class="cube-container">
    <div class="cube-box">
      <div class="cube__item front"></div>
      <div class="cube__item back"></div>
      <div class="cube__item top"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'cube',
  data() {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
  .cube-container
    position absolute
    left 50%
    top 50%
    margin-left -.4rem
    margin-top -2rem
    animation up-down 1s ease-in-out infinite alternate
    .cube-box
      font-size .8rem
      transform rotateX(-33.5deg) rotateY(45deg)
      transform-origin .5em .5em
      transform-style preserve-3d
      animation left-right 2.2s linear infinite
      .cube__item
        position absolute
        width 1em
        height 1em
        &.front,
        &.back,
        &.right,
        &.left
          height 5rem
          border 1px solid
          border-top none
          border-bottom none
          border-image linear-gradient(#ff1224, rgba(0,0,0, 0)) 2 100%
        &.front
          transform translateZ(.5em)
        &.back
          transform translateZ(-.5em)
        &.top
          border 1px solid #ff1224
          transform rotateX(90deg) translateZ(.5em)

@keyframes up-down {
  0% {
    transform translateZ(0)
  }
  100% {
    transform translate3d(0, .4rem, 0)
  }
}
@keyframes left-right {
  0% {
    transform rotateY(0)
  }
  100% {
    transform rotateY(-360deg)
  }
}
</style>

