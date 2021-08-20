import { mount } from "@vue/test-utils";
import DomestikCarousel from "@/components/DomestikCarousel.vue";

const selectors = {
  carouselImage: '[data-testid="carousel-image"]',
  previousArrow: '[data-testid="previous-arrow"]',
  nextArrow: '[data-testid="next-arrow"]',
  bullets: '[data-testid="bullets"]'
}

function build(props = {}) {
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

    expect(carousel.length).toBe(3);
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
