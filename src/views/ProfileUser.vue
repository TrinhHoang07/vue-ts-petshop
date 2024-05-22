<script setup lang="ts">
import { ApiService } from '@/axios/ApiService';
import PrivateRoute from '@/components/PrivateRoute.vue';
import routesConfig from '@/config/routes';
import { dataProfile, useSession } from '@/stores';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { socketContext } from '@/context/SocketContext';
import type { TCheckConversation, T_FriendGiveInvite } from '@/model';
import { useConfirm } from 'primevue/useconfirm';
import { useRouter } from 'vue-router';
import ButtonView from '@/components/ButtonView.vue';

const { data, setDataProfile } = dataProfile();
const { infos } = useSession();
const toast = useToast();
const idsInvited = ref<number[]>();
const idsGiveInvite = ref<number[]>();
const apiService = new ApiService();
const confirm = useConfirm();
const router = useRouter();

onMounted(() => {
    handleGetIdsInvited();
    handleGetIdsGiveInvited();
});

const handleGetIdsInvited = () => {
    apiService.friendship
        .getFriendInviteById((infos.data.user?.id as number).toString(), infos.data.user?.token ?? '')
        .then((res: T_FriendGiveInvite) => {
            idsInvited.value = res.data.map((item: any) => item.friendship_customer_id);
        })
        .catch((err) => console.error(err));
};

const handleGetIdsGiveInvited = () => {
    apiService.friendship
        .getFriendGiveInviteById((infos.data.user?.id as number).toString(), infos.data.user?.token ?? '')
        .then((res: T_FriendGiveInvite) => {
            if (res.message === 'success') {
                idsGiveInvite.value = res.data.map((item: any) => item.friendship_customerInvite_id);
            }
        });
};

const handleAddNewInviteFriend = () => {
    apiService.friendship
        .addNewInviteFriend(
            {
                status: 'waiting',
                customer_invite: infos.data.user?.id ?? 0,
                customer_id: data.data.id,
            },
            infos.data.user?.token ?? '',
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

const handleRemoveInvite = () => {
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
                        customer_invite: infos.data.user?.id ?? 0,
                        customer_id: data.data.id,
                    },
                    infos.data.user?.token ?? '',
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

const handleAcceptInvite = () => {
    apiService.friendship
        .acceptFriendship(
            {
                customer_invite: data.data.id,
                customer_id: infos.data.user?.id ?? 0,
                status: 'friended',
            },
            infos.data.user?.token ?? '',
        )
        .then((res: { message: string; statusCode: number }) => {
            if (res.message === 'success') {
                setDataProfile({
                    ...data.data,
                    isFriend: true,
                });

                socketContext.emit('accept-friend', {
                    id: data.data.id,
                    status: 'success',
                });
            }
        })
        .catch((err) => console.error(err));
};

const handleChat = () => {
    apiService.chats
        .checkCreatedConversation(
            {
                customer_id: data.data.id,
                created_id: infos.data.user?.id ?? 0,
            },
            infos.data.user?.token ?? '',
        )
        .then((res: TCheckConversation) => {
            if (res.message === 'success') {
                router.push(`/profile/chats/${res.data.conver_id}`);
            } else {
                apiService.chats
                    .addNewChat(
                        {
                            created_by_customer: infos.data.user?.id ?? 0,
                            customer_id: data.data.id,
                        },
                        infos.data.user?.token ?? '',
                    )
                    .then((res: { message: string; statusCode: number; data: { id_conver: number } }) => {
                        if (res.message === 'success') {
                            router.push(`/profile/chats/${res.data.id_conver}`);
                        }
                    })
                    .catch((err) => console.error(err));
            }
        })
        .catch((err) => console.error(err));
};
</script>

<template>
    <PrivateRoute :redirect="routesConfig.profile">
        <div class="profile-user">
            <div class="profile-user-wrapper">
                <div class="wall-image"></div>
                <div class="infos">
                    <div class="wrapper-image">
                        <div class="avatar-user">
                            <img :src="data.data.avatarPath" alt="data.userName" />
                        </div>
                    </div>
                    <h3>{{ data.data.userName }}</h3>
                    <div class="actions">
                        <template v-if="data.data.isFriend">
                            <ButtonView medium="true">Bạn bè</ButtonView>
                            <ButtonView medium="true" @click="handleChat">Nhắn tin</ButtonView>
                        </template>
                        <ButtonView
                            medium="true"
                            v-else-if="idsInvited?.includes(data.data.id)"
                            @click="handleRemoveInvite"
                            >Hủy yêu cầu</ButtonView
                        >
                        <ButtonView
                            medium="true"
                            v-else-if="idsGiveInvite?.includes(data.data.id)"
                            @click="handleAcceptInvite"
                            >Xác nhận</ButtonView
                        >
                        <ButtonView medium="true" v-else @click="handleAddNewInviteFriend">Thêm bạn bè</ButtonView>
                    </div>
                    <p class="description">description user hehehe hehehe hehehe hehehe hehehe hehehe hehehe</p>
                </div>
            </div>
        </div>
    </PrivateRoute>
</template>

<style lang="scss" scoped>
.profile-user {
    display: flex;
    flex-direction: column;
    width: 100%;

    .profile-user-wrapper {
        margin: auto;
        width: 75%;

        .wall-image {
            background-image: url('@/assets/images/wall_profile.png');
            background-repeat: no-repeat;
            background-size: cover;
            height: 380px;
            border-radius: 0 0 24px 24px;
        }

        .infos {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            top: -72px;

            .wrapper-image {
                width: 172px;
                height: 172px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 999px;
                background-image: linear-gradient(90deg, #facc15, #db2777, #7e22ce, #5b21b6);

                .avatar-user {
                    width: 150px;
                    height: 150px;
                    display: flex;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 999px;
                    }
                }
            }

            h3 {
                font-size: 3rem;
                font-weight: 500;
                margin: 16px 0 8px 0;
            }

            .actions {
                button {
                    color: #fff;
                    border-radius: 6px;
                    min-width: 150px;
                }
            }

            .description {
                margin-top: 12px;
                font-size: 1.6rem;
                font-weight: 500;
                opacity: 0.89;
                max-width: 450px;
                text-align: center;
            }
        }
    }
}
</style>
