<template>
    <div class="contact-item mdl-card mdl-shadow--2dp">
        <div class="card-media">
            <div class="avatar-container">
                <img :src="'./img/' + contact.image" />
            </div>
            <div class="position">
                {{ contact.position }}
            </div>
        </div>
        <div class="card-details">
            <div class="card-contact">
                <h5 class="fullname"> {{ contact.fullname }} </h5>
                <p class="location">
                    {{ contact.location }}
                    <span v-if="!contact.looking_for_coordinates && contact.lat && contact.lng" class="coords">({{ contact.lng }}/{{ contact.lat }})</span>
                </p>
                <p class="company-name">
                    <strong>{{ contact.company_name }}</strong>
                </p>
                <p class="address-lines">{{ contact.address_lines }}</p>
                <p class="phone">P: {{ contact.phone }}</p>
            </div>
            <div class="card-actions">
                <i class="material-icons" @click="$emit('set-edited', contact.id)">edit</i>
                <i class="material-icons" @click="$emit('delete-contact', contact.id)">delete</i>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['contact'],
};

</script>

<style lang="less">
    .contact-item {
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        .card-media {
            .avatar-container {
                padding: 30px 30px 0 30px;
                img {
                    border-radius: 50%;
                }
                @media (max-width: 760px) {
                    padding: 20px 20px 0 20px;
                    img {
                        width: 90px;
                    }
                }
            }
            .position {
                padding: 10px 16px 0 16px;
                text-align: center;
                font-size: 14px;
                font-weight: bold;
                @media (max-width: 760px) {
                    font-size: 12px;
                }
            }
            // width:30%;
        }
        .card-details {
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            flex: 1;
            .card-contact {
                p {
                    margin-bottom: 0;
                    font-size: 13px;
                    line-height: 1.4;
                    color: #555;
                }
                padding: 16px;
                .address-lines {
                    white-space: pre-wrap;
                }
                flex: 1;
            }
            .card-actions {
                margin: 10px;
                .material-icons {
                    cursor: pointer;
                    font-size: 20px;
                }
            }
        }
    }
</style>