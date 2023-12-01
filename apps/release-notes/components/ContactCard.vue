<template>
    <div class="contact-card">
        <h1 class="contact-title">Contact Us</h1>
        <div> If you have questions, contact us at:
            <a class="email" href="mailto: bcreg.engagement@gov.bc.ca">bcreg.engagement@gov.bc.ca</a>
        </div>
        <br>
        <div>
            <h1 class="contact-title">
                Legend:
            </h1>
            <div> 
                <b>Assets</b> = Manufactured Homes Registry and Personal Property Registry 
            </div>
            <br>
            <div>
                <b>Auth</b> = Authentication changes for logging in and other related activities.
            </div>
            <br>
            <div>
                <b>Entities</b> = Cooperatives, Benefit Companies, Sole Proprietorships, BC Corporations and General Partnerships.
            </div>
            <br>
            <div>
                <b>Relationships</b> = Authentication, payments and other features.
            </div>
            <br>
            <div>
                <b>SRE</b> = Site Reliability Engineering Team - includes changes to the technology and platform.
            </div>
        </div>
    </div>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
    .contact-title {
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