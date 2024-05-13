<script setup lang="ts">
import { toSeoURL } from '@/Helper';
import CloseX from '@/assets/icons/CloseCircle.vue';
import { ApiService } from '@/axios/ApiService';
import { socketContext } from '@/context/SocketContext';
import type { FriendGiveInvite, T_FriendGiveInvite } from '@/model';
import { dataProfile, useSession } from '@/stores';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import ButtonView from './ButtonView.vue';

const props = defineProps<{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}>();

const data = ref<FriendGiveInvite[]>([]);
const apiService = new ApiService();
const { infos } = useSession();
const { setDataProfile } = dataProfile();

onMounted(() => {
    apiService.friendship
        .getFriendGiveInviteById((infos.user?.id as number).toString(), infos.user?.token ?? '')
        .then((res: T_FriendGiveInvite) => {
            data.value = res.data;
        })
        .catch((err) => console.error(err));
});
const handleCloseRequest = () => {
    props.setIsOpen(false);
};

const handleUpdateDataProfileUser = (item: FriendGiveInvite) => {
    setDataProfile({
        id: item.friendship_customerInvite_id,
        isFriend: false,
        userName: item.customer_name,
        avatarPath: item.customer_avatar_path,
    });
};

const handleAcceptFriendship = (item: FriendGiveInvite) => {
    apiService.friendship
        .acceptFriendship(
            {
                customer_invite: item.friendship_customerInvite_id,
                customer_id: item.friendship_customer_id,
                status: 'friended',
            },
            infos.user?.token ?? '',
        )
        .then((res: { message: string; statusCode: number }) => {
            if (res.message === 'success') {
                data.value = data.value.filter((p: FriendGiveInvite) => p.friendship_id !== item.friendship_id);

                socketContext.emit('accept-friend', {
                    id: item.friendship_customerInvite_id,
                    status: 'success',
                });
            }
        })
        .catch((err) => console.error(err));
};
</script>

<template>
    <div
        class="friend-request-wrapper"
        :style="{
            visibility: props.isOpen ? 'visible' : 'hidden',
        }"
        @click="handleCloseRequest"
    ></div>
    <div
        :style="{
            transform: props.isOpen ? 'scale(1)' : 'scale(0)',
        }"
        class="friend-request"
    >
        <div class="header-request">
            <div class="header-empty"></div>
            <h3>Tất cả lời mời</h3>
            <span @click="handleCloseRequest" class="icon-close">
                <CloseX />
            </span>
        </div>
        <div class="request-contents">
            <div v-if="data.length > 0" v-for="item in data" :key="item.friendship_id" class="friend-item">
                <RouterLink
                    @click="() => handleUpdateDataProfileUser(item)"
                    :to="`/profile/user/@${toSeoURL(item.customer_name)}`"
                >
                    <div class="f-avatar">
                        <img :src="item.customer_avatar_path" :alt="item.customer_name" />
                    </div>
                </RouterLink>
                <div @click="() => handleUpdateDataProfileUser(item)" class="f-info">
                    <RouterLink :to="`/profile/user/@${toSeoURL(item.customer_name)}`">
                        <div>
                            <h5>{{ item.customer_name }}</h5>
                            <p>5 bạn chung</p>
                        </div>
                    </RouterLink>
                    <ButtonView @click="() => handleAcceptFriendship(item)" small="true"> Xác nhận </ButtonView>
                </div>
            </div>
            <p v-else class="not-request" :style="{ textAlign: 'center' }">Bạn chưa có lời mời kết bạn nào!</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/ProfileFriendsRequest.scss';
</style>
