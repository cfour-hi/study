<template>
  <div class="agu-slider">
    <div class="agu-slider-content" :style="{ transform: 'translateX(' + transformX + 'px)' }">
      <div class="agu-slider-item" v-for="(item, index) in content">
        <img :src="item">
      </div>
    </div>
    <button class="flip per-page" v-if="showEar" @click="togglePerNext('per')">前</button>
    <button class="flip next-page" v-if="showEar" @click="togglePerNext('next')">后</button>
  </div>
</template>

<script>
let nContentWidth = 0

export default {
  name: 'agu-slider',
  props: ['content', 'showEar'],
  mounted () {
    let eContent = document.querySelector('.agu-slider-content')
    let eItems = document.querySelectorAll('.agu-slider-item')
    nContentWidth = eContent.offsetWidth
    Array.prototype.forEach.call(eItems, function (el, index, err) {
      el.style.width = nContentWidth + 'px'
    })
    eContent.style.width = (nContentWidth * this.itemLen) + 'px'
  },
  data () {
    return {
      point: 0
    }
  },
  computed: {
    itemLen () {
      return this.content.length
    },
    transformX () {
      return -(this.point * nContentWidth)
    }
  },
  methods: {
    togglePerNext (state) {
      switch (state) {
        case 'per':
          this.point = this.point ? (this.point - 1) : (this.itemLen - 1)
          break
        case 'next':
          this.point = (this.point === this.itemLen - 1) ? 0 : (this.point + 1)
          break
        default:
          this.point = 0
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.agu-slider {
  position: relative;
  width: 600px; height: 300px;
  overflow: hidden;
}
.agu-slider .agu-slider-content {
  width: 100%; height: 100%;
  transition: transform 0.3s ease-in-out;
}
.agu-slider .agu-slider-item {
  float: left;
  width: 100%; height: 100%;
}
.agu-slider .agu-slider-item img {
  width: 100%; height: 100%;
  object-fit: cover;
}
.flip {
  position: absolute;
  top: 40%;
  width: 10%; height: 20%;
  border: none;
  text-align: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
.flip:focus {
  outline: none;
}
.flip.per-page {
  left: 0;
}
.flip.next-page {
  right: 0;
}
</style>
