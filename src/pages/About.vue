<template>
  <div id="map">about</div>
</template>

<script>
  export default {
    name: "About",
    data() {
      return {
        data: [{
          "location": {
            "schoolId": 2134000001000634000,
            "schoolName": "合肥市蜀山中学",
            "lng": "117.17747794245062",
            "lat": "31.870311382125775"
          },
          "paperTotalNum": 7,
          "quesTotalNum": 158,
          "schoolId": "2134000001000634093",
          "schoolName": "合肥市蜀山中学",
          "stuRate": 21.467889908256883,
          "stuTotalNum": 545,
          "tchRate": 80,
          "tchTotalNum": 35,
          "userTotalNum": 617,
          "value": 0
        }, {
          "location": {
            "schoolId": 1010000001000022500,
            "schoolName": "蜀山区行知学校",
            "lng": "117.2312804436141",
            "lat": "31.83818492880319"
          },
          "paperTotalNum": 7,
          "quesTotalNum": 134,
          "schoolId": "1010000001000022505",
          "schoolName": "蜀山区行知学校",
          "stuRate": 20.754716981132077,
          "stuTotalNum": 159,
          "tchRate": 76.31578947368422,
          "tchTotalNum": 38,
          "userTotalNum": 200,
          "value": 0
        }, {
          "location": {
            "schoolId": 1010000001000022500,
            "schoolName": "合肥市五十中学东校（望江路校区）",
            "lng": "117.26966917026081",
            "lat": "31.83582706092553"
          },
          "paperTotalNum": 17,
          "quesTotalNum": 158,
          "schoolId": "1010000001000022495",
          "schoolName": "合肥市五十中学东校（望江路校区）",
          "stuRate": 10.74074074074074,
          "stuTotalNum": 540,
          "tchRate": 75,
          "tchTotalNum": 44,
          "userTotalNum": 656,
          "value": 1
        }, {
          "location": {
            "schoolId": 4444000020000001500,
            "schoolName": "合肥市第五十中西校",
            "lng": "117.26410371847374",
            "lat": "31.85631704280379"
          },
          "paperTotalNum": 102,
          "quesTotalNum": 1928,
          "schoolId": "4444000020000001423",
          "schoolName": "合肥市第五十中西校",
          "stuRate": 59.625962596259626,
          "stuTotalNum": 2727,
          "tchRate": 74.60317460317461,
          "tchTotalNum": 189,
          "userTotalNum": 4343,
          "value": 1
        }],
        myChart: null,
        BMap: null
      }
    },
    mounted() {
      this.BMap = window.BMap
      this.myChart = this.$echarts.init(document.getElementById('map'))
      this.setOption()
    },
    methods: {
      setOption() {
        let that = this
        let option = {
          bmap: {
            roam: true,
            // mapStyle: {}
            mapStyle: {
              'styleJson': [{
                'featureType': 'land', //调整土地颜色
                'elementType': 'geometry',
                'stylers': {
                  'color': '#0B183C'
                }
              }, {
                'featureType': 'building', //调整建筑物颜色
                'elementType': 'geometry',
                'stylers': {
                  'color': '#04406F'
                }
              }, {
                'featureType': 'building', //调整建筑物标签是否可视
                'elementType': 'labels',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'highway', //调整高速道路颜色
                'elementType': 'geometry',
                'stylers': {
                  'color': '#003051'
                }
              }, {
                'featureType': 'highway', //调整高速名字是否可视
                'elementType': 'labels',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'arterial', //调整一些干道颜色
                'elementType': 'geometry',
                'stylers': {
                  'color': '#003051'
                }
              }, {
                'featureType': 'arterial',
                'elementType': 'labels',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'green',
                'elementType': 'geometry',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'water',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#044161'
                }
              }, {
                'featureType': 'subway', //调整地铁颜色
                'elementType': 'geometry.stroke',
                'stylers': {
                  'color': '#003051'
                }
              }, {
                'featureType': 'subway',
                'elementType': 'labels',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'railway',
                'elementType': 'geometry',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'railway',
                'elementType': 'labels',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'all', //调整所有的标签的边缘颜色
                'elementType': 'labels.text.stroke',
                'stylers': {
                  'color': '#313131'
                }
              }, {
                'featureType': 'all', //调整所有标签的填充颜色
                'elementType': 'labels.text.fill',
                'stylers': {
                  'color': '#069aff'
                  // 'visibility': 'off'
                }
              }, {
                'featureType': 'manmade',
                'elementType': 'geometry',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'manmade',
                'elementType': 'labels',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'local',
                'elementType': 'geometry',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'local',
                'elementType': 'labels',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'subway',
                'elementType': 'geometry',
                'stylers': {
                  'lightness': -65
                }
              }, {
                'featureType': 'railway',
                'elementType': 'all',
                'stylers': {
                  'lightness': -40
                }
              }, {
                'featureType': 'boundary',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#8b8787',
                  'weight': '1',
                  'lightness': -29
                }
              }]
            }
          },
          visualMap: {
            type: 'piecewise',
            pieces: [
              { lte: 0 },
              { gt: 0, lte: 1 }
            ],
            dimension: 11,
            inRange: {
              //'image://img/flag_green.png'
              symbol: [`<div style='background: red'>55</div>`, 'image://img/flag_red.png']
            },
            outOfRange: {
              //symbol: 'image://img/flag.png'
            },
            show: false
          },
          series: [{
            name: 'map',
            type: 'scatter',
            coordinateSystem: 'bmap',
            //data: convertData(data),
            silent: false,//相应鼠标事件
            symbol: 'image://img/flag.png',
            hoverAnimation: false,
            legendHoverLink: false,
            label: {
              normal: {
                formatter: '{b}',
                position: 'bottom',
                show: false,
                textStyle: {
                  color: '#ffffff'
                }
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#fbef25',
                shadowColor: 'rgba(250, 250, 30, 1)',
                shadowBlur: 50
              },
              emphasis: {
                show: false
              }
            },
            zlevel: 0
          }]
        }
        option.series[0].data = this.data
        this.myChart.setOption(option);
        let map = this.myChart.getModel().getComponent('bmap').getBMap();
        this.myChart.setOption(option);
        let pois = [];
        this.data.forEach(item => {
          pois.push(new that.BMap.Point(item.location.lat, item.location.lng))
        })
        let v = map.getViewport(pois); //此类代表视野，不可实例化，通过对象字面量形式表示
        that.myChart.setOption({
          bmap: {
            center: [v.center.lng, v.center.lat],
            zoom: v.zoom
          }
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #map {
    width 100%
    height: 100%
  }
</style>
