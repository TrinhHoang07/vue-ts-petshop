<script setup lang="ts">
import { timeAgo } from '@/Helper';
import Dot from '@/assets/icons/Dot.vue';
import HiMenu from '@/assets/icons/HiMenu.vue';
import Dialog from 'primevue/dialog';
import { ApiService } from '@/axios/ApiService';
import PrivateRoute from '@/components/PrivateRoute.vue';
import routesConfig from '@/config/routes';
import LayoutProfile from '@/layout/LayoutProfile.vue';
import { isMenuMobile, useSession } from '@/stores';
import { onMounted, ref, watch } from 'vue';

const active = ref<number>(1);
const { setIsMenu } = isMenuMobile();
const { infos } = useSession();
const data = ref<any[]>([]);
const dataRender = ref<any[]>([]);
const apiService = new ApiService();
const content = ref<string>('');

onMounted(() => {
    apiService.notifications
        .getNotificationsById((infos.data.user?.id as number).toString(), infos.data.user?.token ?? '')
        .then((res: any) => {
            if (res.message === 'success') {
                console.log('res data: ' + res.data);
                data.value = res.data;
            }
        })

        .catch((err) => console.error(err));
});

watch(data, () => {
    console.log('render ' + data.value.length);
    dataRender.value = data.value;
});

watch(active, () => {
    if (active.value === 2) {
        dataRender.value = dataRender.value.filter((item) => !item.seen);
    } else {
        dataRender.value = data.value;
    }
});

const handleSeen = (id: number) => {
    apiService.notifications
        .updateSeen(id.toString(), infos.data.user?.token ?? '')
        .then((res: any) => {
            if (res.message === 'success') {
                const dataNew = [...data.value];
                const itemId = data.value.findIndex((item) => item.id === id);
                if (itemId !== -1) {
                    dataNew[itemId] = {
                        ...dataNew[itemId],
                        seen: true,
                    };

                    data.value = dataNew;
                } else {
                    data.value = dataNew;
                }
            }
        })
        .catch((err) => console.error(err));
};
</script>

<template>
    <PrivateRoute :redirect="routesConfig.profile">
        <LayoutProfile>
            <Dialog
                position="top"
                header="Thông báo"
                :visible="!!content"
                :style="{ width: '50vw', top: '48px' }"
                closable
                @update:visible="content = ''"
            >
                <p :style="{ fontSize: 16 }">{{ content }}</p>
            </Dialog>
            <div class="profile-noti">
                <div class="my-noti">
                    <div class="header-noti">
                        <p class="heading">
                            <span @click="() => setIsMenu(true)" class="back-btn-profile">
                                <HiMenu />
                            </span>
                            <span>Thông Báo Của Bạn</span>
                        </p>
                    </div>
                    <div class="contents">
                        <div class="options">
                            <button
                                @click="active = 1"
                                :style="{
                                    color: active === 1 ? '#247ef3' : '',
                                    backgroundColor: active === 1 ? '#e7f3ff' : '',
                                }"
                            >
                                Tất cả
                            </button>
                            <button
                                @click="active = 2"
                                :style="{
                                    color: active === 2 ? '#247ef3' : '',
                                    backgroundColor: active === 2 ? '#e7f3ff' : '',
                                }"
                            >
                                Chưa đọc
                            </button>
                        </div>
                        <div class="noti-container">
                            <div class="noti-new">
                                <h3 v-if="dataRender.length > 0">Mới</h3>
                                <div class="wrapper-noti-item">
                                    <div
                                        v-for="item in dataRender"
                                        @click="
                                            () => {
                                                handleSeen(item.id);
                                                content = '';
                                                content = item.content;
                                            }
                                        "
                                        class="noti-item"
                                    >
                                        <div class="avatar">
                                            <img :src="item.avatar_path" alt="avatar-user" />
                                        </div>
                                        <div class="info-noti">
                                            <div class="check-noti">
                                                <p class="detail-text">{{ item.content }}</p>
                                                <p class="time-post">{{ timeAgo(item.created_at) }}</p>
                                            </div>
                                            <div v-if="!item.seen" class="seened">
                                                <Dot />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- {/* <div class="noti-new">
                                <h3>Trước đó</h3>
                                <div>
                                    {[1, 2, 3].map((item) => (
                                        <NotiItem key={item} />
                                    ))}
                                </div>
                            </div> */} -->
                        </div>
                    </div>
                </div>
            </div>
        </LayoutProfile>
    </PrivateRoute>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/ProfileNoti.scss';
</style>
