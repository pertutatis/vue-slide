<template>
  <div class="container">
    <div 
      class="carousel" 
      ref="carousel" 
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
  components: {
    CarouselNavigation
  },
  data() {
      return {
        carouselDirection: 'carousel-next',
        carousels: [
          {
            img: 'https://picsum.photos/900/506?image=1081',
          },
          {
            img: 'https://picsum.photos/900/506?image=1068',
          },
          {
            img: 'https://picsum.photos/900/506?image=989',
          }
        ],
        show: 0,
        minHeight: 0 
  }
   },
  computed: {
    carouselLength() {
      return this.carousels.length || 0;
    }
  },
	methods: {
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

	},
	mounted() {
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
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
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
  background: #000;
  color: #FFF;
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
