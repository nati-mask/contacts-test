<template>
    <form action="#">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" v-model="fullname">
            <label class="mdl-textfield__label" > Full Name </label>
            <!-- <span class="mdl-textfield__error">{{ patternError }}</span> -->
        </div>
        <div class="mdl-layout-spacer"></div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" v-model="position">
            <label class="mdl-textfield__label" > Position </label>
            <!-- <span class="mdl-textfield__error">{{ patternError }}</span> -->
        </div>
        <div class="mdl-layout-spacer"></div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" v-model="location">
            <label class="mdl-textfield__label" > Location </label>
            <!-- <span class="mdl-textfield__error">{{ patternError }}</span> -->
        </div>
        <button v-if="!contact" class="mdl-button mdl-js-button mdl-button--fab" @click="createContact">
            <i class="material-icons">add</i>
        </button>
    </form>
</template>

<script>

const uuid = require('uuid/v4');

export default {
    props: ['contact'],
    data: function () {
        return {
            new_contact : {
                fullname : "",
                location : "",
                position : "",
            }
        }
    },
    methods: {
        createContact () {
            
            this.$emit('create-contact', this.new_contact);
            this.new_contact.id = null;
        }
    },
    // mounted: function () {
    //     let el = $(this.$el).find('.mdl-textfield').get(0);
    //     componentHandler.downgradeElements(el);
    //     componentHandler.upgradeElement(el);
    // },
    watch: {
        contact () {
            $(this.$el).find('.mdl-textfield').each((i, el) => {
                this.$nextTick(() => {
                    componentHandler.downgradeElements(el);
                    componentHandler.upgradeElement(el);
                })
            });
        }
    },
    computed: {
        fullname : {
            get () { if(this.contact) return this.contact.fullname; return this.new_contact.fullname; },
            set (val) { if(this.contact) this.$emit('set-contact', this.contact.id, 'fullname', val); else this.new_contact.fullname = val; },
        },
        position : {
            get () { if(this.contact) return this.contact.position; return this.new_contact.position; },
            set (val) { if(this.contact) this.$emit('set-contact', this.contact.id, 'position', val); else this.new_contact.position = val; },
        },
        location : {
            get () { if(this.contact) return this.contact.location; return this.new_contact.location; },
            set (val) { if(this.contact) this.$emit('set-contact', this.contact.id, 'location', val); else this.new_contact.location = val; },
        }
    }
};

</script>