<template>
  <div class="container">
    <div 
      class="carousel" 
      ref="carousel" 
      @mouseenter.stop="toggleTimer = false" 
      @mouseleave.stop="toggleTimer = true" 
      @touchstart.stop="touchStart" 
      @touchmove.stop="touchMove" 
      :style="'min-height:' + minHeight "
    >
      <keep-alive>
        <transition-group :name="carouselDirection">
          <div 
            class="carousel__item" 
            data-testid="carousel-image"
            v-for="(carousel, activeCarousel) in carousels" 
            v-show="show == activeCarousel" 
            :key="carousel.img"
          >
            <img class="carousel__image" :src="carousel.img"/>
          </div>
        </transition-group>
      </keep-alive>

      <CarouselNavigation
        :carousel-length="carouselLength"
        :active-carousel="show"
        @toNextCarousel="toNextCarousel"
        @toPreviousCarousel="toPreviousCarousel"
        @updateCarousel="updateCarousel"
      ></CarouselNavigation>
    </div>
  </div>
</template>


<script>
import CarouselNavigation from './CarouselNavigation.vue'

export default {
  name: 'DomestikCarousel',
  props: {
    carousels: {
      type: Array,
      required: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    timerDelay: {
      type: Number,
      default: 5000
    }
  },
  components: {
    CarouselNavigation
  },
  data() {
      return {
        carouselDirection: 'carousel-next',
        show: 0,
        xDown: null, // for touch
        yDown: null, // for touch
        toggleTimer: true,
        minHeight: 0
  }
   },
  computed: {
    carouselLength() {
      return this.carousels.length || 0;
    }
  },
	methods: {
    //Navigation
		toNextCarousel() {
			this.carouselDirection = 'carousel-next';
			this.show + 1 >= this.carouselLength ? this.show = 0 : this.show = this.show + 1;
		},
		toPreviousCarousel() {
			this.carouselDirection = 'carousel-prev';
			this.show - 1 < 0 ? this.show = this.carouselLength - 1 : this.show = this.show - 1;
		},
    updateCarousel(index) {
      index >= this.show ? this.carouselDirection = 'carousel-next' : this.carouselDirection = 'carousel-prev';
      this.show = index
    },

		// swiper event(for mobile)
		touchStart(e) {
			this.xDown = e.touches[0].clientX;
			this.yDown = e.touches[0].clientY;
		},
		touchMove(e) {
			const _this = this;
			if(!this.xDown || !this.yDown) { 
        return; 
      }

			let xUp = e.touches[0].clientX;
			let yUp = e.touches[0].clientY;

			let xDiff = this.xDown - xUp;
			let yDiff = this.yDown - yUp;

			if(Math.abs(xDiff) > Math.abs(yDiff)) {
				xDiff > 0 ? _this.toNextCarousel() : _this.toPreviousCarousel();
			}

			this.xDown = null;
			this.yDown = null;
		},
    
		autoPlay() {
			setInterval(() => {
				if(this.toggleTimer) this.toNextCarousel();
			}, this.timerDelay);
		}
	},
	mounted() {
		if(this.autoplay) this.autoPlay();

		window.addEventListener('load', () => {
			this.minHeight = this.$refs.carousel.offsetHeight + 'px';
		});
	},
};
</script>

<style scoped lang="postcss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
  margin-right: auto;
  margin-left: auto;
  padding-top: 5vh;
  max-width: 900px;
}

.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel__item {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: black;
  color: white;
  opacity: 1;

  &:first-of-type {
    position: relative;
  }
}

.carousel__image {
  display: block;
  max-width: 100%;
}

/*  Animations */
.carousel-prev-enter-active, .carousel-prev-leave-active,
.carousel-next-enter-active, .carousel-next-leave-active {
  transition: transform 1s cubic-bezier(0.215, 0.61, 0.355, 1);
  will-change: transform;
}

.carousel-next-enter, .carousel-prev-leave-to {
  transform: translateX(100%);
}

.carousel-next-leave-to, .carousel-prev-enter {
  transform: translateX(-100%);
}
</style>
