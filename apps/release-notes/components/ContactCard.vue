<template>
    <div class="contact-card">
        <h1>Contact Us</h1>
        <p> If you have questions, contact us at:
            <a class="email" href="mailto: bcreg.engagement@gov.bc.ca">bcreg.engagement@gov.bc.ca</a>
        </p>
        <br>
        <div>
            <b>
                Legend:
            </b>
            <p> 
                <b>Assets</b> = Manufactured Homes Registry and Personal Property Registry 
            </p>
            <br>
            <p>
                <b>Auth</b> = Authentication changes for logging in and other related activities.
            </p>
            <br>
            <p>
                <b>Entities</b> = Cooperatives, Benefit Companies, Sole Proprietorships and General Partnerships.
            </p>
            <br>
            <p>
                <b>Relationships</b> = authentication, payments and other features.
            </p>
            <br>
            <p>
                <b>SRE</b> = Site Reliability Engineering Team - includes changes to the technology and platform.
            </p>
        </div>
    </div>
    
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent ({
    props: {
        color: {
            type: String,
            required: false,
        },
    }
})
</script>

<style>
    .contact-card > h1 {
        color: black;
    }
    .email {
        color:#1669bb;
    }

    b {
        color: #757575;
    }

    .contact-card {
        margin: 5%
    }
</style>