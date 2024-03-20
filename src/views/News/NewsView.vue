<script setup lang="ts">
import SearchNew from './SearchNew.vue';
import logo_1 from '@/assets/images/new_1.png';
import logo_2 from '@/assets/images/new_2.jpg';
import logo_3 from '@/assets/images/new_3.jpg';
import logo_4 from '@/assets/images/new_4.jpg';
import NavBarNew from './NavBarNew.vue';
import { onMounted } from 'vue';

onMounted(() => {
    document.title = 'Tin tức | Petshop chất lượng số 1 Việt Nam!';
    window.scrollTo({
        behavior: 'smooth',
        top: 0,
    });
});
</script>

<template>
    <div class="news">
        <h3 class="heading-new">CATEGORY ARCHIVES: TIN TỨC</h3>
        <div class="contents-new">
            <div class="wrapper-new">
                <div class="bar">
                    <SearchNew />
                    <NavBarNew />
                </div>
                <div class="list-news">
                    <div class="new-item">
                        <div class="wrapper-item">
                            <div class="item-thumb">
                                <img :src="logo_1" alt="thumbnail" />
                            </div>
                            <div class="item-info">
                                <h3 class="heading-title">Duis luctus elit nisi, et cursus magna pellentesque non.</h3>
                                <p class="item-description">
                                    Chế độ ăn cho chó con Chó con từ 2 tháng tuổi đến 6 tháng [...]
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="new-item">
                        <div class="wrapper-item">
                            <div class="item-thumb">
                                <img :src="logo_2" alt="thumbnail" />
                            </div>
                            <div class="item-info">
                                <h3 class="heading-title">Duis luctus elit nisi, et cursus magna pellentesque non.</h3>
                                <p class="item-description">
                                    Chế độ ăn cho chó con Chó con từ 2 tháng tuổi đến 6 tháng [...]
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="new-item">
                        <div class="wrapper-item">
                            <div class="item-thumb">
                                <img :src="logo_3" alt="thumbnail" />
                            </div>
                            <div class="item-info">
                                <h3 class="heading-title">Duis luctus elit nisi, et cursus magna pellentesque non.</h3>
                                <p class="item-description">
                                    Chế độ ăn cho chó con Chó con từ 2 tháng tuổi đến 6 tháng [...]
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="new-item">
                        <div class="wrapper-item">
                            <div class="item-thumb">
                                <img :src="logo_4" alt="thumbnail" />
                            </div>
                            <div class="item-info">
                                <h3 class="heading-title">Duis luctus elit nisi, et cursus magna pellentesque non.</h3>
                                <p class="item-description">
                                    Chế độ ăn cho chó con Chó con từ 2 tháng tuổi đến 6 tháng [...]
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="new-item">
                        <div class="wrapper-item">
                            <div class="item-thumb">
                                <img :src="logo_1" alt="thumbnail" />
                            </div>
                            <div class="item-info">
                                <h3 class="heading-title">Duis luctus elit nisi, et cursus magna pellentesque non.</h3>
                                <p class="item-description">
                                    Chế độ ăn cho chó con Chó con từ 2 tháng tuổi đến 6 tháng [...]
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="new-item">
                        <div class="wrapper-item">
                            <div class="item-thumb">
                                <img :src="logo_1" alt="thumbnail" />
                            </div>
                            <div class="item-info">
                                <h3 class="heading-title">Duis luctus elit nisi, et cursus magna pellentesque non.</h3>
                                <p class="item-description">
                                    Chế độ ăn cho chó con Chó con từ 2 tháng tuổi đến 6 tháng [...]
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/sass/News.scss';
</style>
