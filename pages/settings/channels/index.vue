<!--eslint-disable-->
<template>
    <div>
        Channels

        <input type="file" id="image">
        <channels/>
    </div>
</template>
<script>
    import Channels from '../../../components/Settings/Channels.vue'
    const root = {root: true}
    export default {
        components: {Channels},
        mounted() {
            let i = document.getElementById('image')
            console.dir(i)
        }, fetch({store}) {
            store.dispatch('channels/load', {}, root)
        }
    }
</script>
