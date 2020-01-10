<!--eslint-disable-->
<template>
    <div>
Brands

        <input type="file" id="image">
    </div>
</template>
<script>
  export default {
    components: {},
    mounted () {
      let i = document.getElementById('image')
      console.dir(i)
    }
  }
</script>
