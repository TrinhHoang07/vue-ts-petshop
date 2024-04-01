<script lang="ts" setup>
import { toSeoURL } from '@/Helper';
import { ApiService } from '@/axios/ApiService';
import routesConfig from '@/config/routes';
import { socketContext } from '@/context/SocketContext';
import type { FriendGiveInvite, Friended, TFriended, T_FriendGiveInvite } from '@/model';
import { useSession, dataProfile } from '@/stores';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import ButtonView from './ButtonView.vue';
type _T_Props = {
    id_friend: number;
    avatar_friend: string;
    name_friend: string;
    cm_friend?: string;
    status: string;
};

const idsInvited = ref<number[]>([]);
const idsFriended = ref<number[]>([]);
const idsGiveInvite = ref<number[]>([]);
const { setDataProfile } = dataProfile();

const { infos } = useSession();
const props = defineProps<_T_Props>();
const apiService = new ApiService();
const toast = useToast();
const confirm = useConfirm();

onMounted(() => {
    handleGetIdsInvited();
    handleGetIdsFriended();
    handleGetIdsGiveInvited();
});

const handleGetIdsInvited = () => {
    apiService.friendship
        .getFriendInviteById((infos.user?.id as number).toString(), infos.user?.token ?? '')
        .then((res: T_FriendGiveInvite) => {
            idsInvited.value = res.data.map((item: FriendGiveInvite) => item.friendship_customer_id);
        })
        .catch((err) => console.error(err));
};

const handleGetIdsGiveInvited = () => {
    apiService.friendship
        .getFriendGiveInviteById((infos.user?.id as number).toString(), infos.user?.token ?? '')
        .then((res: T_FriendGiveInvite) => {
            if (res.message === 'success') {
                idsGiveInvite.value = res.data.map((item: FriendGiveInvite) => item.friendship_customerInvite_id);
            }
        });
};

const handleGetIdsFriended = () => {
    apiService.friendship
        .getFriendedById((infos.user?.id as number).toString(), infos.user?.token ?? '')
        .then((res: TFriended) => {
            idsFriended.value = res.data.map((item: Friended) => item.customer_id);
        })
        .catch((err) => console.error(err));
};

const handleAddNewInviteFriend = (id: number) => {
    apiService.friendship
        .addNewInviteFriend(
            {
                status: 'waiting',
                customer_invite: infos.user?.id ?? 0,
                customer_id: id,
            },
            infos.user?.token ?? '',
        )
        .then((res: { message: string; statusCode: number }) => {
            if (res.message === 'success') {
                handleGetIdsInvited();

                toast.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Gửi yêu cầu thành công!',
                    life: 2000,
                });
            } else {
                toast.add({
                    severity: 'error',
                    summary: 'Thất bại',
                    detail: 'Có lỗi, vui lòng thử lại!',
                    life: 2500,
                });
            }
        })
        .catch((err) => console.error(err));
};

const handleRemoveInvite = (id: number) => {
    confirm.require({
        message: 'Bạn có chắc chắn muốn hủy yêu cầu không?',
        position: 'top',
        header: 'Hủy yêu cầu',
        acceptLabel: 'Đồng ý',
        rejectLabel: 'Hủy bỏ',
        icon: 'pi pi-exclamation-triangle',
        accept() {
            apiService.friendship
                .deleteFriendshipById(
                    {
                        customer_invite: infos.user?.id ?? 0,
                        customer_id: id,
                    },
                    infos.user?.token ?? '',
                )
                .then((res: { message: string; statusCode: number }) => {
                    if (res.message === 'success') {
                        handleGetIdsInvited();
                        toast.add({
                            severity: 'success',
                            summary: 'Thành công',
                            detail: 'Hủy yêu cầu thành công!',
                            life: 2000,
                        });
                    } else {
                        toast.add({
                            severity: 'error',
                            summary: 'Thất bại',
                            detail: 'Có lỗi, vui lòng thử lại!',
                            life: 2500,
                        });
                    }
                })
                .catch((err) => console.error(err));
        },
    });
};

const handleUpdateDataProfileUser = () => {
    setDataProfile({
        id: props.id_friend,
        isFriend: props.status === 'friended' || idsFriended.includes(props.id_friend),
        userName: props.name_friend,
        avatarPath: props.avatar_friend,
    });
};

const handleAcceptInvite = () => {
    apiService.friendship
        .acceptFriendship(
            {
                customer_invite: props.id_friend,
                customer_id: infos.user?.id ?? 0,
                status: 'friended',
            },
            infos.user?.token ?? '',
        )
        .then((res: { message: string; statusCode: number }) => {
            if (res.message === 'success') {
                socketContext.emit('accept-friend', {
                    id: props.id_friend,
                    status: 'success',
                });
            }
        })
        .catch((err) => console.error(err));
};
</script>

<template>
    <div class="friend-item">
        <RouterLink v-if="infos.user.id === props.id_friend" :to="routesConfig.profile">
            <div class="f-avatar">
                <img :src="props.avatar_friend" :alt="props.name_friend" />
            </div>
        </RouterLink>
        <RouterLink v-else @click="handleUpdateDataProfileUser" :to="`/profile/user/@${toSeoURL(props.name_friend)}`">
            <div class="f-avatar">
                <img :src="props.avatar_friend" :alt="props.name_friend" />
            </div>
        </RouterLink>
        <div class="f-info">
            <RouterLink v-if="infos.user.id === props.id_friend" :to="routesConfig.profile">
                <div>
                    <h5>{{ props.name_friend }}</h5>
                    <p>{{ props.cm_friend }} bạn chung</p>
                </div>
            </RouterLink>
            <RouterLink
                v-else
                @click="handleUpdateDataProfileUser"
                :to="`/profile/user/@${toSeoURL(props.name_friend)}`"
            >
                <div>
                    <h5>{{ props.name_friend }}</h5>
                    <p>{{ props.cm_friend }} bạn chung</p>
                </div>
            </RouterLink>

            <Button v-if="infos.user.id === props.id_friend" small="true" :to="routesConfig.profile">
                Trang cá nhân
            </Button>
            <ButtonView v-else-if="props.status === 'friended' || idsFriended.includes(props.id_friend)" small="true"
                >Bạn bè</ButtonView
            >

            <ButtonView
                v-else-if="idsInvited.includes(props.id_friend)"
                @click="() => handleRemoveInvite(props.id_friend)"
                small="true"
            >
                Hủy yêu cầu
            </ButtonView>
            <ButtonView v-else-if="idsGiveInvite.includes(props.id_friend)" @click="handleAcceptInvite" small="true">
                Xác nhận
            </ButtonView>
            <ButtonView v-else @click="() => handleAddNewInviteFriend(props.id_friend)" small="true">
                Thêm bạn bè
            </ButtonView>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/ProfileFriends.scss';
</style>
