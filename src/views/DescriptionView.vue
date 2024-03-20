<script setup lang="ts">
import TitleView from '@/components/TitleView.vue';
import logo from '@/assets/images/sleigh-bell.svg';
import image from '@/assets/images/description_page.jpg';
import image1 from '@/assets/images/dog_home_logo.png';
import image2 from '@/assets/images/cat_home_logo.png';
import image3 from '@/assets/images/food_home_logo.png';
import ButtonView from '@/components/ButtonView.vue';
import { onMounted } from 'vue';

onMounted(() => {
    document.title = 'Giới thiệu | Petshop chất lượng số 1 Việt Nam!';
    window.scrollTo({
        behavior: 'smooth',
        top: 0,
    });
});
</script>

<template>
    <div class="description">
        <TitleView :logo="logo" title="PETS SHOP" />
        <div class="banner">
            <img :src="image" alt="banner description" />
        </div>
        <div class="contents">
            <div class="description-item">
                <div class="logo">
                    <img :src="image1" alt="logo" />
                </div>
                <h3 class="heading-description-item">Pets Shop</h3>
                <p class="description-p">
                    Bạn là người yêu quý động vật, hãy đến Mona shop nơi cung cấp các loại thú nuôi. Với đa dạng vật
                    nuôi rất mong các bạn ghé thăm và tìm kiếm được con vật bạn yêu thích, rất mong được phục vụ quý
                    khách.
                </p>
                <div class="btn">
                    <ButtonView small="true">CLICK ME</ButtonView>
                </div>
            </div>
            <div class="description-item">
                <div class="logo">
                    <img :src="image2" alt="logo" />
                </div>
                <h3 class="heading-description-item">Pets Shop</h3>
                <p class="description-p">
                    Dịch vụ chăm sóc thú nuôi với tác phong chuyên nghiệp các bạn hoàn toàn có thể yên tâm khi giao vật
                    nuôi của các bạn cho chúng tôi. Chúng tôi rất mong được phục vụ quý khách.
                </p>
                <div class="btn">
                    <ButtonView small="true">CLICK ME</ButtonView>
                </div>
            </div>
            <div class="description-item">
                <div class="logo">
                    <img :src="image3" alt="logo" />
                </div>
                <h3 class="heading-description-item">Pets Shop</h3>
                <p class="description-p">
                    Chuyên cung cấp các loại thức ăn cho vật nuôi đa dang phong phú. Cung cấp phụ kiện, đồ chơi cho từng
                    loài vật nuôi khác nhau.
                </p>
                <div class="btn">
                    <ButtonView small="true">CLICK ME</ButtonView>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/Description.scss';
</style>
