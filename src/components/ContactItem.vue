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
            <p class="fullname">
                {{ contact.fullname }}
            </p>
            <p class="location">
                {{ contact.location }}
            </p>
            <p class="company-name">
                <strong>{{ contact.company_name }}</strong>
            </p>
            <p class="address-lines">{{ contact.address_lines }}</p>
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
            }
            .position {
                text-align: center;
            }
            // width:30%;
        }
        .card-details {
            .address-lines {
                white-space: pre-wrap;
            }
            // flex: 1;
        }
    }
</style>