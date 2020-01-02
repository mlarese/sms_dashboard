<!--eslint-disable-->
<template>
    <v-dialog v-model="dialog" max-width="500px">
        <button-new/>
        <v-card>
            <component :is="form" />

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import ButtonNew from "./ButtonNew"
    export default {
        name: "EditDialog",
        components: {
            ButtonNew
        },
        color: {default: 'name', type:String},
    }
</script>

<style scoped>

</style>
