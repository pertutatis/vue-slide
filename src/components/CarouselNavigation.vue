<template>
  <div class="navigation">
      <a class="arrow arrow--prev" data-testid="previous-arrow" href="#" @click.prevent="toPreviousCarousel">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
      </a>

      <a class="arrow arrow--next" data-testid="next-arrow" href="#" @click.prevent="toNextCarousel">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
      </a>

      <div class="bullets">
        <a
          class="bullets__link"
          data-testid="bullets" 
          v-for="(item, index) in carouselLength" 
          href="#" 
          :class="{ 'bullets__link--active': activeCarousel == index }" 
          @click.prevent="updateCarousel(index)" 
          :key="index"></a>
      </div>
    </div>
</template>


<script>
export default {
  name: 'CarouselNavigation',
  props: {
    carouselLength: {
      type: Number,
      required: true
    },
    activeCarousel: {
      type: Number,
      required: true
    }
  },
	methods: {
		toNextCarousel() {
			this.$emit('toNextCarousel')
		},
		toPreviousCarousel() {
			this.$emit('toPreviousCarousel')
		},
    updateCarousel(index) {
      this.$emit('updateCarousel', index)
    }
	}
};
</script>

<style scoped lang="postcss">
.arrow {
  position: absolute;
  z-index: 1;
  top: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;  
  background: #FFF;
  transform: translateY(-50%);
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
}

.arrow--prev {
  left: 0;
}

.arrow--next {
  right: 0;
}

.bullets {
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 8px;
  left: 0;
  display: flex;
  justify-content: center;
}
.bullets__link {
  display: block;
  margin-right: 8px;
  margin-left: 8px;
  width: 16px;
  height: 16px;
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transition: 0.3s;
}
.bullets__link:hover, .bullets__link--active {
  background: #fff;
}
</style>
