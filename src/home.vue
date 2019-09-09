<template>
  <div class="box">
    <map-chart></map-chart>
  </div>
</template>

<script>
  import mapChart from './pages/About'
  export default {
    name: "home",
    components: {
      mapChart
    }
  }
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
}
</style>
