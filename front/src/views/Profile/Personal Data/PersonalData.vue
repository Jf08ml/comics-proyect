<template>
    <div class="container-personal-data">
        <div class="section-title">
                <p align="center">Section to modify personal data, account and password</p>
        </div>
        <div class="section-content">
            <form class="form" enctype="multipart/form-data">
                <div class="div-form">
                    <input type="text" placeholder="Full name *" />
                    <input type="text" placeholder="Full last name *" />
                </div>
                <div class="div-form">
                    <input type="text" placeholder="Country *" />
                    <input type="text" placeholder="City *" />
                </div>
                <div class="div-form">
                    <input type="text" placeholder="Nickname *" />
                    <input type="text" placeholder="Email *" />
                </div>
                <div class="div-form-upload">
                    <label align="center" for="imagen" style="margin: auto;">
                        Profile photo 
                        <v-icon name="hi-information-circle" scale="1"
                            title="Verificación" style="cursor: pointer" />
                    </label>
                    <input class="inputfile" type="file" id="imagen" name="imagen" aria-label="Archivo"/>
                </div>
                <p style="margin-top: 15px;">Change your password</p>
                <div class="div-form">
                    <input type="password" placeholder="Current password" />
                    <input type="password" placeholder="New Password" />
                </div>
                <div>
                    <button>Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import "@/assets/scss/profile/personaldata/personaldata.scss";
</script>

<style scoped></style>