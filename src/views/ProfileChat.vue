<script setup lang="ts">
import ArrowIcon from '@/assets/icons/ArrowIcon.vue';
import BiSearch from '@/assets/icons/BiSearch.vue';
import HiMenu from '@/assets/icons/HiMenu.vue';
import IoSend from '@/assets/icons/IoSend.vue';
import img from '@/assets/images/beyeu.jpg';
import { ApiService } from '@/axios/ApiService';
import Loading from '@/components/Loading.vue';
import PrivateRoute from '@/components/PrivateRoute.vue';
import routesConfig from '@/config/routes';
import { socketContext, stateEvents } from '@/context/SocketContext';
import LayoutProfile from '@/layout/LayoutProfile.vue';
import type { Conversation, Message, T_Conversation, T_Message } from '@/model';
import { isMenuMobile, useSession } from '@/stores';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { setIsMenu } = isMenuMobile();

const route = useRoute();
const router = useRouter();
const loading = ref<boolean>(true);
const inputValue = ref<string>('');
const conversations = ref<Conversation[]>([]);
const infoUser = ref<{ id?: number; name?: string; avatar?: string }>();
const dataMessages = ref<Message[]>([]);
const messagesEndRef = ref<HTMLDivElement>();
const inputRef = ref<HTMLInputElement>();

const apiService = new ApiService();
const { infos } = useSession();

onMounted(() => {
    apiService.chats
        .getCustomerConversationByCreatedId((infos.user?.id as number).toString(), infos.user?.token ?? '')
        .then((res: T_Conversation) => {
            if (res.message === 'success') {
                apiService.chats
                    .getJoinedConversationsById((infos.user?.id as number).toString(), infos.user?.token ?? '')
                    .then((response: T_Conversation) => {
                        if (response.message === 'success') {
                            conversations.value = [...response.data, ...res.data];

                            if (route) {
                                const user = conversations.value.find(
                                    (conver) => conver.conver_id === +route.params.id,
                                );

                                if (user) {
                                    infoUser.value = {
                                        id: user.cus_id,
                                        name: user.cus_name,
                                        avatar: user.cus_avatar_path,
                                    };
                                }

                                // handle get message from id conversation

                                apiService.chats
                                    .getMessagesByConversationId(route.params.id as string, infos.user?.token ?? '')
                                    .then((res: T_Message) => {
                                        if (res.message === 'success') {
                                            dataMessages.value = res.data;
                                            inputRef.value?.focus();
                                        }
                                    })
                                    .catch((err) => console.error(err));
                            }

                            loading.value = false;
                        }
                    })
                    .catch((err) => console.error(err));
            }
        })
        .catch((err) => {
            console.error(err);
            loading.value = false;
        });
});

onMounted(() => {
    if (stateEvents.connected) {
        socketContext.on(
            `chat-message-user-give`,
            (data: {
                id: number;
                conversation_: number;
                content: string;
                sender_: number;
                receiver_: number;
                cus_avatar_path: string;
            }) => {
                dataMessages.value = [
                    ...dataMessages.value,
                    {
                        message_id: data.id,
                        message_sender_id: data.sender_,
                        cus_avatar_path: data.cus_avatar_path,
                        message_content: data.content,
                    },
                ];

                const user = conversations.value.find((item) => item.conver_id === +data.conversation_);
                if (user) {
                    conversations.value = [
                        {
                            ...user,
                            messages_content: data.content,
                        },
                        ...conversations.value.filter((item) => item.conver_id !== +data.conversation_),
                    ];
                }
            },
        );
    }
});

watch(route, () => {
    if (route.params) {
        const user = conversations.value.find((conver) => conver.conver_id === +route.params.id);

        if (user) {
            infoUser.value = {
                id: user.cus_id,
                name: user.cus_name,
                avatar: user.cus_avatar_path,
            };
        }

        // handle get message from id conversation

        apiService.chats
            .getMessagesByConversationId(route.params.id as string, infos.user?.token ?? '')
            .then((res: T_Message) => {
                if (res.message === 'success') {
                    dataMessages.value = res.data;
                    inputRef.value?.focus();
                }
            })
            .catch((err) => console.error(err));
    }
});

watch(dataMessages, () => {
    setTimeout(() => {
        scrollToBottom();
    }, 500);
});

const handleSubmit = () => {
    if (inputValue.value.trim().length > 0) {
        const dataSent = {
            conversation_id: +route.params.id,
            sender_id: infos.user?.id ?? 0,
            receiver_id: infoUser.value?.id ?? 0,
            content: inputValue.value.trim(),
        };

        apiService.chats
            .addNewMessageByConversationId(dataSent, infos.user?.token ?? '')
            .then(
                (res: {
                    message: string;
                    statusCode: number;
                    data: {
                        id: number;
                        conversation_: number;
                        content: string;
                        sender_: number;
                        receiver_: number;
                    };
                }) => {
                    if (res.message === 'success') {
                        socketContext.emit(`chat-message-user`, {
                            ...res.data,
                            cus_avatar_path: infos.user?.avatar,
                        });

                        inputValue.value = '';
                    }
                },
            )
            .catch((err) => console.error(err));
    }
};

const scrollToBottom = () => {
    messagesEndRef.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

const handleSubmitMessage = (e: any) => {
    if (e.key === 'Enter') {
        handleSubmit();
    }
};
</script>

<template>
    <PrivateRoute :redirect="routesConfig.profile">
        <LayoutProfile>
            <div class="profile-chats">
                <div class="bar-chats">
                    <div class="container-bar">
                        <div class="bar-chat-mobile-container">
                            <span @click="() => setIsMenu(true)" class="back-btn-profile">
                                <HiMenu />
                            </span>
                            <h5>Đoạn chat</h5>
                        </div>
                        <div class="search-user">
                            <BiSearch />
                            <input type="text" placeholder="Tìm kiếm trong đoạn chat" />
                        </div>
                        <div class="list-user">
                            <div
                                v-if="conversations.length > 0"
                                v-for="item in conversations"
                                key="{item.conver_id}"
                                class="item-chat"
                                @click="
                                    () => {
                                        router.push(`/profile/chats/${item.conver_id}`);
                                        // etIsChatMobile(true);
                                    }
                                "
                            >
                                <div class="item-avatar">
                                    <img :src="item.cus_avatar_path ?? img" :alt="`avatar_${item.cus_name}`" />
                                </div>
                                <div class="item-info-ch">
                                    <h6>{{ item.cus_name }}</h6>
                                    <p class="last-message">
                                        {{ item.sender_id === infos.user?.id ? 'Bạn: ' : '' }}
                                        {{ item.messages_content }}
                                    </p>
                                </div>
                            </div>
                            <Loading v-else-if="loading" />
                            <p v-else :style="{ fontSize: 12, textAlign: 'center' }">
                                Bạn chưa có cuộc trò chuyện nào!
                            </p>
                        </div>
                    </div>
                </div>
                <div class="chats-messages">
                    <template v-if="!!infoUser?.name">
                        <div class="head-chat">
                            <span class="back-mobile">
                                <ArrowIcon />
                            </span>
                            <div class="image-user">
                                <img :src="infoUser.avatar" alt="name user" />
                            </div>
                            <h5>{{ infoUser.name }}</h5>
                        </div>
                        <div class="contents-message">
                            <div
                                v-for="item in dataMessages"
                                :key="item.message_id"
                                class="message-item"
                                :class="{
                                    me_message: item.message_sender_id === infos.user?.id,
                                }"
                            >
                                <div v-if="item.message_content.trim().length > 0" class="message-item-avatar">
                                    <img :src="item.cus_avatar_path" alt="avaatar user" />
                                </div>
                                <p
                                    v-if="item.message_content.trim().length > 0"
                                    class="content-message-item"
                                    :class="{
                                        content_me_message: item.message_sender_id === infos.user?.id,
                                    }"
                                >
                                    {{ item.message_content }}
                                </p>
                            </div>
                            <div ref="messagesEndRef"></div>
                        </div>
                        <div class="foot-chat">
                            <div class="input">
                                <input
                                    ref="inputRef"
                                    v-model="inputValue"
                                    @keyup="handleSubmitMessage"
                                    type="text"
                                    placeholder="Aa..."
                                />
                            </div>
                            <div @click="handleSubmit" class="btn-submit-ch">
                                <IoSend />
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </LayoutProfile>
    </PrivateRoute>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/ProfileChat.scss';
</style>
