<template>
    <div class="app-main">
        <header>
            <h1> {{ title }} </h1>
        </header>
        <div class="page">
            <contacts-list></contacts-list>
        </div>
    </div>
</template>

<script>

import ContactsList from './ContactsList.vue';

export default {
    components : {
        'contacts-list' : ContactsList,
    },
    data: function () {
        return {
            title: "App Title"
        }
    }
};

</script>

<style lang="less">
    @import "~app_less";
    .app-main {
        header {
            padding: 0 30px;
            margin-bottom: 20px;
            border-bottom: 1px lightgray solid;
        }
        .page {
        }
    }
</style>
