<template>
    <div style=" height: 100%; width: 100%;">
        <div align="center" style="height: 15%;">
            <div>
                <h3>Personal data</h3>
                <span>Enter your data</span>
            </div>
        </div>
        <div style="height: 85%; width: 100%;">
            <form class="form" style="">
                <div style="display: flex; width: 100%;">
                    <input type="text" placeholder="Full name *" />
                    <input type="text" placeholder="Full last name *" />
                </div>
                <div style="display: flex; width: 100%;">
                    <input type="text" placeholder="Type DNI *" />
                    <input type="text" placeholder="Number DNI *" />
                </div>
                <div style="display: flex; width: 100%;">
                    <input type="text" placeholder="Nickname *" />
                    <input type="text" placeholder="Phone *" />
                </div>
                <div style="display: flex; width: 100%;">
                    <input type="text" placeholder="Country *" />
                    <input type="text" placeholder="City *" />
                </div>

                <button>Save</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import "@/assets/scss/profile/personaldata/personaldata.scss";
</script>

<style scoped></style>