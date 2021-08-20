import { mount } from "@vue/test-utils";
import DomestikCarousel from "@/components/DomestikCarousel.vue";

const selectors = {
  carouselImage: '[data-testid="carousel-image"]',
  previousArrow: '[data-testid="previous-arrow"]',
  nextArrow: '[data-testid="next-arrow"]',
  bullets: '[data-testid="bullets"]'
}

const timerDelay = 5000;
const carousels = [
  {
    img: 'https://picsum.photos/900/506?image=1081',
  },
  {
    img: 'https://picsum.photos/900/506?image=1068',
  },
  {
    img: 'https://picsum.photos/900/506?image=989',
  }
];

function build(props = {carousels}) {
  return mount(DomestikCarousel, {
    propsData: props
  });
}

function checkVisibleCarousel(carousel, visibleCarousel) {
  for (let index = 0; index < carousel.length; index++) {
    let result = index == visibleCarousel ? true : false;

    expect(carousel.at(index).isVisible()).toBe(result);   
  }
}

describe("Carousel load", () => {
  it("loads the carousel", () => {
    const wrapper = build();

    const carousel = wrapper.findAll(selectors.carouselImage);

    expect(carousel.length).toBe(carousels.length);
  });

  it("shows the only the first slide", () => {
    const wrapper = build();

    const carousel = wrapper.findAll(selectors.carouselImage);

    checkVisibleCarousel(carousel, 0);
  });
});

describe("Carousel navigation", () => {
  it("loads the next carousel", async () => {
    const wrapper = build();

    const nextArrow = wrapper.find(selectors.nextArrow);
    await nextArrow.trigger('click');

    const carousel = wrapper.findAll(selectors.carouselImage);
    checkVisibleCarousel(carousel, 1);
  });

  it("loads the previous carousel", async () => {
    const wrapper = build();

    const previousArrow = wrapper.find(selectors.previousArrow);
    await previousArrow.trigger('click');

    const carousel = wrapper.findAll(selectors.carouselImage);
    checkVisibleCarousel(carousel, carousel.length -1);
  });

  it("changes with the bullets", async () => {
    const wrapper = build();

    const bullets = wrapper.findAll(selectors.bullets);

    for (let index = 0; index < bullets.length; index++) {
      let bullet = bullets.at(index);
      await bullet.trigger('click'); 
      
      let carousel = wrapper.findAll(selectors.carouselImage);
      checkVisibleCarousel(carousel, index);
    }
  });
});

describe("autoplay", () => {
  it("autoplays one loop", async () => {
    jest.useFakeTimers()
    const wrapper = build({carousels, timerDelay});

    jest.runTimersToTime(timerDelay);
    const carousel = await wrapper.findAll(selectors.carouselImage);

    checkVisibleCarousel(carousel, 1)
  });

  it("autoplays two loops", async () => {
    jest.useFakeTimers()
    const wrapper = build({carousels, timerDelay});

    jest.runTimersToTime(timerDelay * 2);
    const carousel = await wrapper.findAll(selectors.carouselImage);

    checkVisibleCarousel(carousel, 2)
  });

  it("disables autoplay", async () => {
    jest.useFakeTimers()
    const wrapper = build({carousels, timerDelay, autoplay: false});

    jest.runTimersToTime(timerDelay);
    const carousel = await wrapper.findAll(selectors.carouselImage);

    checkVisibleCarousel(carousel, 0)
  });
})
