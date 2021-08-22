# vue-carousel

# Intro

- Powered with Vue, easy to use.
- Fully responsive. Scales with its container.
- CSS3 powered
- Swipe enabled. Or disabled, if you prefer.
- Desktop mouse dragging.
- Infinite looping
- Autoplay, dots, arrows, etc...

# Getting Started

## Add component

```bash
yarn add domestik-carousel

//or

npm i domestik-carousel
```

## Load component

```jsx
<template>
  <div id="app">
    <DomestikCarousel 
			:carousels="carousels" 
			:fade="true"
		/>
  </div>
</template>

<script>
import DomestikCarousel from 'domestik-carousel'

export default {
  name: 'App',
  components: {
    DomestikCarousel
  },
  data() {
    return {
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
        ]
    }
  },
}
</script>
```

# settings

### autoplay

**Type:** boolean

**Default:** true

Enables Autoplay

### autoplaySpeed

**Type:** int(ms)

**Default: 5**000

Autoplay Speed in milliseconds

### arrows

**Type:** boolean

**Default:** true

Prev/Next Arrows

### dots

**Type:** boolean

**Default:** false

Show dot indicators

### fade

**Type:** boolean

**Default:** false

Enable fade

### carousels

**Type:** element

**Default:** REQUIRED

Collection of elements for the carousel


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build:package
```
