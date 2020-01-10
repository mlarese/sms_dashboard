<!--eslint-disable-->
<template>
    <div>
        Users
        <input type="file" id="image">
        <user-list/></div>
</template>
<script>
    import UserList from '../../../components/Users/UserList'
    const root = {root: true}
    export default {
        components: {UserList},
        fetch ({store}) {
            store.dispatch('users/load', {}, root)
        },
        mounted () {
            let i = document.getElementById('image')
            console.dir(i)
        }
    }
</script>
