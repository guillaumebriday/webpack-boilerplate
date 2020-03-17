<template lang="pug">
  div
    p I'm an example component.

    img(:src="Logo" class="mx-auto")
</template>

<script>
import Logo from '../../assets/logo.png'

export default {
  data () {
    return {
      Logo
    }
  },

  mounted () {
    console.log('Component mounted.')
  }
}
</script>
