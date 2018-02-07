<template>
    <div class="contact-list mdl-grid">
        <contact-item v-for="i in 5" :key="i" class="mdl-cell mdl-cell--6-col"></contact-item>
    </div>
</template>

<script>

import ContactItem from './ContactItem.vue';

export default {
    components : {
        'contact-item' : ContactItem,
    }
};

</script>