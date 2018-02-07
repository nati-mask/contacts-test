import Vue from 'vue';
import ContactsApp from '../components/ContactsApp.vue';

const contact_app = new Vue({ el: '#root', render(createElement) { return createElement(ContactsApp) } });
