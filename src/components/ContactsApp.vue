<template>
    <div class="app-main">
        <header>
            <h1> {{ title }} </h1>
        </header>
        <div class="page">
            <contacts-list :contacts="contacts"></contacts-list>
            <contact-editor :contact="edited_contact" @set-contact="setContact" @create-contact="createContact"></contact-editor>
        </div>
    </div>
</template>

<script>

const uuid = require('uuid/v4');
const example_contacts = require('../data/contacts.json');

import ContactsList from './ContactsList.vue';
import ContactEditor from './ContactEditor.vue';

export default {
    components : {
        'contacts-list' : ContactsList,
        'contact-editor' : ContactEditor,
    },
    data: function () {
        return {
            title: "App Title",
            contacts: [],
            edited_contact: null,
        }
    },
    methods: {
        setContact (id, prop, val) {
            this.contacts.forEach(contact => {
                if(contact.id === id) contact[prop] = val;
            });
        },
        createContact (new_contact) {
            console.log(new_contact);
            this.contacts.push(new_contact);
        }
    },
    created: function () {
        example_contacts.forEach(contact => {
            contact.id = uuid().split('-')[4];
            this.contacts.push(contact)
        });

        // TMP:
        // this.edited_contact = this.contacts[1];
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
