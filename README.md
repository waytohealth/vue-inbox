# vue-inbox
A Vue frontend for interacting with a Way to Health participant

# Requirements

This component leverages pinia, so your application should load this before using the component


```
import { createPinia, PiniaVuePlugin } from 'pinia'

const pinia = createPinia()
Vue.use(PiniaVuePlugin);
Vue.use(pinia);
```