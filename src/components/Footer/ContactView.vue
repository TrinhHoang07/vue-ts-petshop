<script setup lang="ts">
import Facebook from '@/assets/icons/Facebook.vue';
import Github from '@/assets/icons/Github.vue';
import Location from '@/assets/icons/Location.vue';
import Mail from '@/assets/icons/Mail.vue';
import PhoneFill from '@/assets/icons/PhoneFill.vue';
</script>

<template>
    <div>
        <h2 class="heading-nav">thông tin liên hệ</h2>
        <div class="wrap-item">
            <div class="item-contact">
                <span style="color: orange">
                    <Location />
                </span>
                <a href="#abc">132 Nguyên Xá, Phường Minh Khai, Quận Bắc Từ Liêm, Hà Nội</a>
            </div>
            <div class="item-contact">
                <span style="color: orange">
                    <PhoneFill />
                </span>
                <a href="tel:0348331856">0348331856</a>
            </div>
            <div class="item-contact">
                <span style="color: orange">
                    <Mail />
                </span>
                <a href="mailto:nguyenminhthong11b@gmail.com">nguyenminhthong11b@gmail.com</a>
            </div>
            <div class="item-contact">
                <span style="color: orange">
                    <Facebook />
                </span>
                <a href="https://www.facebook.com/RatVuiKhiDuocGapBan">Facebook</a>
            </div>
            <!-- <div class="item-contact">
                <span style="color: orange">
                    <Github />
                </span>
                <a href="https://github.com">Github</a>
            </div> -->
        </div>
    </div>
</template>
