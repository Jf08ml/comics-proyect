<template>
    <div class="container-persona-data">
        <div align="center" class="section-title">
            <div>
                <h3>Personal data</h3>
                <span>Enter your data</span>
            </div>
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