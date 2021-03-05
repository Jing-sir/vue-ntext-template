<template>
  <div class="hello">
    121323
    {{msg}}
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  name: 'HelloWorld',
  setup() {
    const msg = inject('msgVal');
    return {
      msg,
    }
  },
}
</script>

<style scoped lang="scss">
</style>
