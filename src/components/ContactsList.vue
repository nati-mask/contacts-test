<template>
    <div class="contact-list mdl-grid">
        <contact-item v-for="contact in contacts" :key="contact.id" class="mdl-cell mdl-cell--4-col"
                      :contact="contact"
                      @set-edited="$emit('set-edited', $event)"
                      @delete-contact="$emit('delete-contact', $event)"></contact-item>
        <div class="add-cell mdl-card mdl-cell mdl-cell--4-col">
            <i class="material-icons" @click="$emit('set-edited')">add_circle</i>
        </div>
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

<style lang="less">
    .add-cell {
        position: relative;
        .material-icons {
            cursor: pointer;
            font-size: 60px;
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
        }
    }
</style>