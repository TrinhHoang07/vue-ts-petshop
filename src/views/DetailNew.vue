<script lang="ts" setup>
import { ApiService } from '@/axios/ApiService';
import Loading from '@/components/Loading.vue';
import routesConfig from '@/config/routes';
import type { Blog, T_Blog } from '@/model';
import { useSession } from '@/stores';
import { useToast } from 'primevue/usetoast';
import { onMounted, watch, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { infos } = useSession();
const apiService = new ApiService();
const toast = useToast();
const data = ref<Blog>();
const isLoading = ref<boolean>(true);

onMounted(() => {
    window.scrollTo({
        behavior: 'smooth',
        top: 0,
    });

    apiService.blogs
        .getBlogById(`${route.params.id}`)
        .then((res: T_Blog) => {
            if (res.message === 'success') {
                console.log('resdata' + res.data);
                data.value = res.data;
                isLoading.value = false;
            } else {
                router.push(routesConfig.notFound);
            }
        })
        .catch((err) => console.error(err));
});

watch(route, () => {
    apiService.blogs
        .getBlogById(`${route.params.id}`)
        .then((res: T_Blog) => {
            if (res.message === 'success') {
                data.value = res.data;
            } else {
                router.push(routesConfig.notFound);
            }
        })
        .catch((err) => console.error(err));
    window.scrollTo({
        behavior: 'smooth',
        top: 0,
    });
});
</script>

<template>
    <div class="layout-detail-new">
        <div
            class="bg-new"
            :style="{
                height: '350px',
                backgroundImage: `url(${data?.preview_url})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                position: 'relative',
            }"
        >
            <div class="bg-info">
                <h3 class="title">TIN TỨC</h3>
                <h1 class="heading">{{ data?.title }}</h1>
                <div class="line"></div>
            </div>
        </div>
        <div class="contents">
            <div class="wrapper">
                <div class="bar">
                    <Search />
                    <NavBarNewsPage />
                </div>
                <div class="new-detail">
                    <div class="wrapper-detail">
                        <div v-if="!isLoading" class="descriptions" v-html="data?.description"></div>
                        <Loading v-else />
                        <div class="social">
                            <RouterLink to="/" :style="{ backgroundColor: '#0e8ef1' }" class="social-item">
                                <Facebook />
                                <span>Facebook</span>
                            </RouterLink>
                            <RouterLink :style="{ backgroundColor: '#65ccef' }" to="/" class="social-item">
                                <FaTwitter />
                                <span>Twitter</span>
                            </RouterLink>
                            <RouterLink :style="{ backgroundColor: '#fbbc05' }" to="/" class="social-item">
                                <FaGooglePlusG />
                                <span>Google+</span>
                            </RouterLink>
                            <RouterLink :style="{ backgroundColor: '#e60023' }" to="/" class="social-item">
                                <FaPinterestP />
                                <span>Pinterest</span>
                            </RouterLink>
                            <RouterLink :style="{ backgroundColor: '#0a66c2' }" to="/" class="social-item">
                                <FaLinkedin />
                                <span>LinkedIn</span>
                            </RouterLink>
                        </div>
                        <div class="comments">
                            <div class="header-rate">
                                <h3 class="tab-view-rate-heading">Bình luận</h3>
                                <p class="sub-heading-rate">Chưa có bình luận nào!</p>
                            </div>
                            <div class="container-form-rate">
                                <h2 class="form-heading-rate">Hãy để lại bình luận của bạn về bài viết này nhé!</h2>
                                <form action="">
                                    <div :style="{ paddingTop: '12px' }">
                                        <p :style="{ fontSize: '15px', marginBottom: '4px' }">Nhận xét của bạn:</p>
                                        <textarea
                                            name="des"
                                            id="des"
                                            :style="{
                                                width: '100%',
                                                height: 96,
                                                border: '1px solid #d7d7d7',
                                                outline: 'none',
                                                padding: '8px 8px 8px 12px',
                                                borderRadius: '4px',
                                            }"
                                        ></textarea>
                                    </div>
                                    <div class="form-item">
                                        <label htmlFor="name">Tên của bạn: </label>
                                        <input id="name" type="text" placeholder="Your name..." />
                                    </div>
                                    <div class="form-item">
                                        <label htmlFor="email">Email: </label>
                                        <input id="email" type="text" placeholder="Email..." />
                                    </div>
                                    <button class="submit-rate" type="submit">GỬI ĐI</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/DetailNew.scss';
</style>
