<template>
    <form action="#">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" v-model="fullname">
            <label class="mdl-textfield__label" > Full Name </label>
        </div>
        <div class="mdl-layout-spacer"></div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" v-model="position">
            <label class="mdl-textfield__label" > Position </label>
        </div>
        <div class="mdl-layout-spacer"></div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" v-model="location">
            <label class="mdl-textfield__label" > Location </label>
        </div>
        <div class="mdl-layout-spacer"></div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" v-model="company_name">
            <label class="mdl-textfield__label" > Company </label>
        </div>
        <div class="mdl-layout-spacer"></div>
        <div class="mdl-textfield mdl-js-textfield">
            <textarea class="mdl-textfield__input" type="text" rows= "3" v-model="address_lines"></textarea>
            <label class="mdl-textfield__label"> Address </label>
        </div>
        <div class="mdl-layout-spacer"></div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" v-model="phone">
            <label class="mdl-textfield__label" > Phone </label>
            <span v-show="phone_error" class="input-error">Invalid phone number</span>
        </div>
        <button v-if="!contact" class="mdl-button mdl-js-button mdl-button--fab" @click="createContact">
            <i class="material-icons">add</i>
        </button>
        <button v-if="contact" class="mdl-button mdl-js-button mdl-button--fab" @click="closeEdit">
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
            phone_error : false,
            new_contact : {
                fullname : "",
                location : "",
                position : "",
                phone: "",
                company_name: "",
                address_lines: "",
            }
        }
    },
    methods: {
        createContact () {
            if(!this.phone_error) {
                this.$emit('create-contact', this.new_contact);
                this.$emit('close-edit');
            }
        },

        closeEdit () {
            if(!this.phone_error) this.$emit('close-edit', this.contact.id);
        }
    },
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
        },
        company_name : {
            get () { if(this.contact) return this.contact.company_name; return this.new_contact.company_name; },
            set (val) { if(this.contact) this.$emit('set-contact', this.contact.id, 'company_name', val); else this.new_contact.company_name = val; },
        },
        address_lines : {
            get () { if(this.contact) return this.contact.address_lines; return this.new_contact.address_lines; },
            set (val) { if(this.contact) this.$emit('set-contact', this.contact.id, 'address_lines', val); else this.new_contact.address_lines = val; },
        },
        phone : {
            get () { if(this.contact) return this.contact.phone; return this.new_contact.phone; },
            set (val) {
                var match = true;
                if(val && val.match) match = val.match(/^[\-\(\)\+0-9\s]*$/);
                this.phone_error = !match;
                if(this.contact) this.$emit('set-contact', this.contact.id, 'phone', val);
                else {
                    console.log('Local phone:', val);
                    this.new_contact.phone = val;
                }
            },
        }
    }
};

</script>

<style lang="less">
    .input-error {
        position: absolute;
        bottom: 0;
        font-size: 10px;
        color: red;
    }
</style>
