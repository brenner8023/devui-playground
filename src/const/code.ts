
import { genLink } from '@/utils'

export const setupDevui = 'devui.js'

export const devuiCode = `
import { getCurrentInstance } from 'vue'
import DevUI from 'vue-devui'

const install = (app) => {
  app.use(DevUI)
};

const loadCss = () => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = '${genLink('vue-devui', '1.0.0-beta.14', '/style.css')}'
  document.body.appendChild(link)
}

export const setupDevui = () => {
  const instance = getCurrentInstance()
  instance.appContext.app.use({ install })
  loadCss()
};`

export const defaultFile = 'App.vue'

export const defaultCode = `<template>
  <h1>
    Hello, DevUI!
  </h1>
  <d-button
    :showLoading="showLoading"
    @click="handleClick">
    click me!
  </d-button>
</template>

<script setup lang="ts">
import { setupDevui } from './devui.js'
import { ref, onBeforeUnmount } from 'vue'

// don't remove
setupDevui()

const showLoading = ref(false)
const timerId = ref<number | null>(null)
const handleClick = () => {
  showLoading.value = true;
  timerId.value = window?.setTimeout(() => {
    showLoading.value = false;
  }, 2000);
}

onBeforeUnmount(() => {
  timerId.value && window?.clearTimeout(timerId.value)
})
</script>`
