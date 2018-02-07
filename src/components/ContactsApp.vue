<template>
    <div class="app-main">
        <header>
            <h1> {{ title }} </h1>
        </header>
        <div class="page">
            <contacts-list v-show="!editing" :contacts="contacts" @set-edited="setEdited" @delete-contact="deleteContact"></contacts-list>
            <contact-editor v-show="editing" :contact="edited_contact" @set-contact="setContact" @close-edit="closeEdit" @create-contact="createContact"></contact-editor>
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
            editing: false,
        }
    },
    methods: {
        setEdited (contact_id) {
            if(!contact_id) {
                this.edited_contact = null;
                this.editing = true;
                return;
            }
            let contact = this.contacts.filter(contact => contact.id === contact_id)[0];
            if(!contact) return;
            this.edited_contact = contact;
            this.editing = true;
        },
        closeEdit (contact_id) {
            this.editing = false;
            if(contact_id) this.$nextTick(() => this.lookupContactCoordinates(contact_id));
        },
        setContact (contact_id, prop, val) {
            this.contacts.forEach(contact => {
                if(contact.id === contact_id) {
                    contact[prop] = val;
                    if(prop === 'location' && !val) {
                        contact.lat = null;
                        contact.lng = null;
                    }
                }
            });
        },
        deleteContact (contact_id) {
            let index = null;
            this.contacts.forEach((contact, i) => {
                if(contact.id === contact_id) index = i;
            });
            console.log('Index for delete:', index);
            this.contacts.splice(index, 1);
        },
        createContact (new_contact) {
            let contact = {};
            Object.keys(new_contact).forEach(key => contact[key] = new_contact[key] );
            contact.id = uuid().split('-')[4];
            contact.image = "john-smith.jpg",
            contact.looking_for_coordinates = false,
            contact.lng = null;
            contact.lat = null;
            this.contacts.push(contact);
            this.lookupContactCoordinates(contact.id);
        },
        lookupContactCoordinates (contact_id) {
            let contact = this.contacts.filter(contact => contact.id === contact_id)[0];
            if(!contact) return;
            contact.looking_for_coordinates = true;
            let url = 'https://maps.googleapis.com/maps/api/geocode/json?' + $.param({
                address : contact.location,
                key : "AIzaSyDKvvBgAkSCugEbXckutuAFuqPzthsCnJ8",
            });
            $.get(url).then(geocode_response => {
                console.log('GeoCode response:', geocode_response);
                if(geocode_response && geocode_response.results && geocode_response.results.length) {
                    if(geocode_response.results[0].geometry && geocode_response.results[0].geometry.location) {
                        let location = geocode_response.results[0].geometry.location;
                        if(location.lat && location.lng) {
                            contact.lng = parseFloat(location.lng).toFixed(3);
                            contact.lat = parseFloat(location.lat).toFixed(3);
                        };
                    }

                }
                contact.looking_for_coordinates = false;
            })
            // console.log(url);
        }
    },
    created: function () {
        example_contacts.forEach(contact => {
            contact.id = uuid().split('-')[4];
            this.contacts.push(contact)
        });

        // TMP:
        // this.edited_contact = this.contacts[1];

        this.contacts.forEach(contact => this.lookupContactCoordinates(contact.id));
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
