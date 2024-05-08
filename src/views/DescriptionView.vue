<script setup lang="ts">
import TitleView from '@/components/TitleView.vue';
import logo from '@/assets/images/sleigh-bell.svg';
import image from '@/assets/images/description_page.jpg';
import image1 from '@/assets/images/dog_home_logo.png';
import image2 from '@/assets/images/cat_home_logo.png';
import image3 from '@/assets/images/food_home_logo.png';
import ButtonView from '@/components/ButtonView.vue';
import PetIcon from '@/assets/icons/PetIcon.vue';
import CutIcon from '@/assets/icons/CutIcon.vue';
import Cerfitication from '@/assets/icons/Cerfitication.vue';
import { onMounted } from 'vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, EffectCreative } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
        <div class="description-feeling-user">
            <swiper
                :modules="[Autoplay]"
                :slides-per-view="1"
                :space-between="0"
                :loop="true"
                :autoplay="{
                    delay: 3500,
                    disableOnInteraction: false,
                    waitForTransition: true,
                }"
                class="des-swiper-feel"
            >
                <swiper-slide>
                    <div class="description-slider-item-feel">
                        <div class="des-item-image-user-feel">
                            <img :src="image1" alt="preview avatar user" />
                        </div>
                        <div class="des-item-info-user-feel">
                            <h3>Nguyen Minh Thong</h3>
                            <p>
                                Dịch vụ Chăm sóc thú cưng cung cấp một dịch vụ tuyệt vời và tôi sẽ gửi con chó của mình
                                đến đó một lần nữa mà không cần thắc mắc gì. Tôi tin tưởng vào đội này và tôi sẽ không
                                đi đâu khác. Chăm sóc và phục vụ năm sao!
                            </p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="description-slider-item-feel">
                        <div class="des-item-image-user-feel">
                            <img :src="image1" alt="preview avatar user" />
                        </div>
                        <div class="des-item-info-user-feel">
                            <h3>Tran Trung Kien</h3>
                            <p>
                                Tôi đã thử nhiều người chải lông trước khi chải lông cho thú cưng. Nhân viên thực sự
                                thân thiện, giá cả tuyệt vời và trên hết là một chú chó vui vẻ và được chăm sóc chu đáo.
                                Bạn làm một công việc tuyệt vời và bạn là người giỏi nhất.
                            </p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="description-slider-item-feel">
                        <div class="des-item-image-user-feel">
                            <img :src="image1" alt="preview avatar user" />
                        </div>
                        <div class="des-item-info-user-feel">
                            <h3>Trinh Van Hoang</h3>
                            <p>
                                Bạn thực sự tuyệt vời! Chúng tôi rất vui vì đã tìm được người có thể chải lông cho thú
                                cưng của mình đúng cách và theo cách chúng tôi muốn chúng được chải lông. Cảm ơn các bạn
                                rất nhiều.
                            </p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="description-slider-item-feel">
                        <div class="des-item-image-user-feel">
                            <img :src="image1" alt="preview avatar user" />
                        </div>
                        <div class="des-item-info-user-feel">
                            <h3>Tran Thi Thuy</h3>
                            <p>
                                Tôi đã thử nhiều người chải lông trước khi chải lông cho thú cưng. Nhân viên thực sự
                                thân thiện, giá cả tuyệt vời và trên hết là một chú chó vui vẻ và được chăm sóc chu đáo.
                                Bạn làm một công việc tuyệt vời và bạn là người giỏi nhất.
                            </p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="description-slider-item-feel">
                        <div class="des-item-image-user-feel">
                            <img :src="image1" alt="preview avatar user" />
                        </div>
                        <div class="des-item-info-user-feel">
                            <h3>Nguyen Thi Van</h3>
                            <p>
                                Dịch vụ Chăm sóc thú cưng cung cấp một dịch vụ tuyệt vời và tôi sẽ gửi con chó của mình
                                đến đó một lần nữa mà không cần thắc mắc gì. Tôi tin tưởng vào đội này và tôi sẽ không
                                đi đâu khác. Chăm sóc và phục vụ năm sao!
                            </p>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        <div class="description-top-service">
            <div class="des-top-service-item">
                <span>
                    <CutIcon />
                </span>
                <div class="des-top-item-infos">
                    <h5>Dịch Vụ Chăm Sóc Hàng Đầu</h5>
                    <p>Đội ngũ chuyên nghiệp của chúng tôi cung cấp dịch vụ chải chuốt đặc biệt.</p>
                </div>
            </div>
            <div class="des-top-service-item">
                <span>
                    <Cerfitication />
                </span>
                <div class="des-top-item-infos">
                    <h5>Dịch Vụ Cao Cấp</h5>
                    <p>Chúng tôi tự hào mang đến cho bạn và thú cưng của bạn sự quan tâm cá nhân.</p>
                </div>
            </div>
            <div class="des-top-service-item">
                <span>
                    <PetIcon />
                </span>
                <div class="des-top-item-infos">
                    <h5>Chúng tôi yêu mọi thú cưng</h5>
                    <p>
                        Chúng tôi yêu thương mọi thú cưng để thú cưng của bạn cảm thấy thư giãn và không bị căng thẳng.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/Description.scss';
</style>
