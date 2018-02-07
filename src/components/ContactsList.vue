<template>
    <div class="contact-list mdl-grid">
        <contact-item v-for="contact in contacts" :key="contact.id" class="mdl-cell mdl-cell--6-col"
                      :contact="contact"
                      @set-edited="$emit('set-edited', $event)"
                      @delete-contact="$emit('delete-contact', $event)"></contact-item>
    </div>
</template>

<script>

import ContactItem from './ContactItem.vue';

export default {
    props: ['contacts'],
    components : {
        'contact-item' : ContactItem,
    }
};

</script>