<script setup lang="ts">
import BiSearch from '@/assets/icons/BiSearch.vue';
import CloseCircle from '@/assets/icons/CloseCircle.vue';
import HiMenu from '@/assets/icons/HiMenu.vue';
import UserPlus from '@/assets/icons/UserPlus.vue';
import { ApiService } from '@/axios/ApiService';
import Loading from '@/components/Loading.vue';
import PrivateRoute from '@/components/PrivateRoute.vue';
import FriendItem from '@/components/FriendItem.vue';
import routesConfig from '@/config/routes';
import { App } from '@/const/App';
import { socketContext, stateEvents } from '@/context/SocketContext';
import useDebouncedRef from '@/hooks/useDebounce';
import LayoutProfile from '@/layout/LayoutProfile.vue';
import type { Friended, TFriended, T_Customer, T_Customers, T_FriendGiveInvite } from '@/model';
import { isMenuMobile, useSession } from '@/stores';
import { onMounted, ref, watch } from 'vue';
import FriendRequest from '@/components/FriendRequest.vue';

const { setIsMenu } = isMenuMobile();
const loading = ref<boolean>(true);
const isOpenFriendRequest = ref<boolean>(false);
const isLoadingSearch = ref<boolean>(true);
const isModal = ref<boolean>(false);
const countRequestFriend = ref<number>(0);
const value = useDebouncedRef('', App.DELAY_SEARCH, false);
const dataCustomers = ref<T_Customer[]>([]);
const friends = ref<Friended[]>([]);

const { infos } = useSession();
const apiService = new ApiService();

watch(value, () => {
    if (value.value.trim().length > 0) {
        isModal.value = true;
        isLoadingSearch.value = true;

        apiService.customer
            .searchCustomers(
                {
                    search: value.value.trim(),
                },
                infos.data.user?.token ?? '',
            )
            .then((res: T_Customers) => {
                if (res.message === 'success') {
                    dataCustomers.value = res.data;
                    isLoadingSearch.value = false;
                }
            })
            .catch((err) => console.error(err));
    } else {
        isModal.value = false;
    }
});

onMounted(() => {
    handleGetFriends();
    handleGetCountRequestFriend();
});

onMounted(() => {
    if (stateEvents.connected) {
        socketContext.on('accept-friend-give', () => {
            handleGetCountRequestFriend();
            handleGetFriends();
        });
    }
});

const handleGetFriends = () => {
    apiService.friendship
        .getFriendedById((infos.data.user?.id as number).toString(), infos.data.user?.token ?? '')
        .then((res: TFriended) => {
            if (res.message === 'success') {
                friends.value = res.data;
                loading.value = false;
            }
        })
        .catch((err) => {
            console.error(err);
            loading.value = false;
        });
};

const handleGetCountRequestFriend = () => {
    apiService.friendship
        .getFriendGiveInviteById((infos.data.user?.id as number).toString(), infos.data.user?.token ?? '')
        .then((res: T_FriendGiveInvite) => {
            if (res.message === 'success') {
                countRequestFriend.value = res.data.length;
            }
        })
        .catch((err) => console.error(err));
};

const setIsOpenFriendRequest = (data: boolean) => {
    isOpenFriendRequest.value = data;
};
</script>

<template>
    <PrivateRoute :redirect="routesConfig.profile">
        <LayoutProfile>
            <div class="profile-friend">
                <div class="friends-header">
                    <FriendRequest :isOpen="isOpenFriendRequest" :setIsOpen="setIsOpenFriendRequest" />
                    <div class="f-empty">
                        <span @click="() => setIsMenu(true)" class="back-btn-profile">
                            <HiMenu />
                        </span>
                    </div>
                    <h1>Tất cả bạn bè</h1>
                    <div @click="isOpenFriendRequest = true" class="icon-request">
                        <span>
                            <UserPlus />
                        </span>
                        <div class="title-friend-request">
                            <p>Lời mời kết bạn</p>
                            <h6 class="count-request">{{ countRequestFriend }}</h6>
                        </div>
                    </div>
                </div>
                <div class="search-friends">
                    <input
                        type="text"
                        placeholder="Tìm kiếm bạn bè..."
                        v-model="value"
                        @focus="
                            () => {
                                if (value.trim().length > 0) {
                                    isModal = true;
                                }
                            }
                        "
                    />
                    <span class="icon-search">
                        <BiSearch />
                    </span>
                    <div v-if="isModal" class="search-modal">
                        <div class="header-modal">
                            <h3>
                                Kết quả tìm kiếm cho <strong>{{ value }}</strong>
                            </h3>
                            <span @click="isModal = false">
                                <CloseCircle />
                            </span>
                        </div>
                        <div class="modal-items">
                            <FriendItem
                                v-if="dataCustomers.length > 0"
                                v-for="item in dataCustomers"
                                :key="item.id"
                                :avatar_friend="item.avatar_path"
                                :name_friend="item.name"
                                :id_friend="item.id"
                                cm_friend="5"
                                status=""
                            />
                            <template v-else>
                                <Loading v-if="isLoadingSearch" />
                                <p v-else class="no-search">Không có kết quả tìm kiếm !</p>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="list-friends">
                    <FriendItem
                        v-if="friends.length > 0"
                        v-for="item in friends.filter((item) => item.customer_id !== infos.data.user.id)"
                        :key="item.customer_id"
                        :avatar_friend="item.customer_avatar_path"
                        :name_friend="item.customer_name"
                        cm_friend="5"
                        :id_friend="item.customer_id"
                        :status="item.friendship_status ?? 'waiting'"
                    />
                    <div v-else class="no-friends">
                        <Loading v-if="loading" />
                        <p v-else>Bạn chưa có bạn bè, hãy thử tìm kiếm bạn bè của bạn và kết bạn với họ!</p>
                    </div>
                </div>
            </div>
        </LayoutProfile>
    </PrivateRoute>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/ProfileFriends.scss';
</style>
