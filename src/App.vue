<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <transition v-if="isLoaderShow">
      <!-- <hello-world @loaderComplete="loaderComplete"></hello-world> -->
    </transition>
    <div class="container">
      <router-view/>
      <!--<router-view/>-->
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
// import CustomSelect from './components/custom-select/custom-select'
// import Slider from './components/slider'
// import cubeContainer from './pages/test';
export default {
  name: 'app',
  data() {
    return {
      isLoaderShow: true,
      flag: false,
      obj: {
        time: '2017-03-11',
        name: 'net',
        _r: 123
      }
    }
  },
  mounted() {
    this.viewSize()
    // offsetHeight scrollHeight scrollTop
    // window.addEventListener('scroll', () => {
    //   window.console.log(document.documentElement.scrollTop)
    // })
    // this.STop = document.documentElement.scrollTop
    let viewHeight = document.documentElement.clientHeight || document.body.clientHeight,
        contentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    window.onscroll = function() {
      let stop = document.documentElement.scrollTop || document.body.scrollTop
      // window.console.log(stop)
      if((stop + viewHeight) >= contentHeight) {
        window.console.log('到底啦')
      }
    }
    window.console.log('可视区域高度：',document.documentElement.clientHeight)
    window.console.log('内容高度：',document.documentElement.scrollHeight)
    let monitor = new Proxy(this.obj, {
      get(target, key) {
        return target[key].replace('2017', '2099')
      }
    })
    window.console.log('get', monitor.time)
    class Person {
      constructor(name = 'xxx') {
        this.name = name
      }
    }
    class Son extends Person {
      constructor(name) {
        super(name)
      }
    }
    window.console.log(new Son())
    this.promiseTest()
  },
  methods: {
    viewSize() {
      let viewWidth = document.documentElement.clientWidth || document.body.clientWidth
      let html = document.getElementsByTagName('html')[0]
      html.style.fontSize = viewWidth / 10 + 'px'
    },
    loaderComplete() {
      this.isLoaderShow = false
    },
    loadImg(src) {
      return new Promise((resolve, reject) => {
        let img = document.createElement('img')
        img.src = src
        img.onload = function () {
          resolve(img)
        }
        img.onerror = function (err) {
          reject(err)
        }
      })
    },
    showImg(imgs) {
      window.console.log(imgs)
      // imgs.forEach(img => {
      //   let container = document.querySelector('.container')
      //   container.appendChild(img)
      // })
    },
    promiseTest() {
      let that = this
      return Promise.all([
        that.loadImg('https://cdn.dribbble.com/users/466659/screenshots/6618258/worldwide_team_collaboration_teaser.png'),
        that.loadImg('https://cdn.dribbble.com/users/466659/screenshots/6612492/sd_dashboard_teaser.png'),
        that.loadImg('https://cdn.dribbble.com/users/466659/screenshots/6591633/lazy_sloths_illustration_teaser.png'),
        that.loadImg('https://cdn.dribbble.com/users/1875714/screenshots/6623273/dribbble_-_3_2x.png')
      ]).then(img => {
        window.console.log(img)
        that.showImg(img)
      })
    }
  },
  components: {
    // CustomSelect,
    // HelloWorld,
    // cubeContainer,
    // Slider
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.container {
  height: 100%;
}
</style>
