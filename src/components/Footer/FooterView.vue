<script setup lang="ts">
import images from '@/assets/images/footer.png';
import NavView from './NavView.vue';
import ActionFooter from './ActionFooter.vue';
import ContactView from './ContactView.vue';
</script>

<template>
    <footer>
        <div class="bg-footer">
            <img :src="images" alt="images footer" />
            <div class="content">
                <NavView />
                <ActionFooter />
                <ContactView />
            </div>
        </div>
        <div class="author">
            <p>© 2023. Design by Hoang Trinh <span>❤</span></p>
        </div>
    </footer>
</template>

<style lang="scss">
@import '@/assets/sass/Footer.scss';
</style>
?
