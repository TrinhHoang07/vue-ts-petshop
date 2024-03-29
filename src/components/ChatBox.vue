<script setup lang="ts">
import { computed, reactive, ref, onMounted, watch } from 'vue';
import chatbox from '@/assets/images/chat-box.png';
import logo from '@/assets/images/logo-petshop.jpg';
import cat from '@/assets/images/meoww.jpg';
import Dot from '@/assets/icons/Dot.vue';
import BiMinus from '@/assets/icons/BiMinus.vue';
import IoSend from '@/assets/icons/IoSend.vue';
import BiHappy from '@/assets/icons/BiHappy.vue';
import BsFillImage from '@/assets/icons/BsFillImage.vue';
import TypeAdmin from '@/components/TypeAdmin.vue';
import { socketContext } from '@/context/SocketContext';

type TMes = {
    role: string;
    message: string;
    id?: string;
    name: string;
};

const open = ref<boolean>(false);
const inputRef = ref<any>();
const lassMessageRef = ref<any>();
const visible = ref<boolean>(false);
const value = ref<string>('');
const messages = reactive<{
    data: TMes[];
}>({
    data: [
        {
            role: 'admin',
            name: 'Van Hoang',
            message: 'Xin chào! Tôi là Vader, trợ lý ảo được phát triển và thiết kế by Hoàng Trịnh!',
        },
    ],
});

onMounted(() => {
    socketContext.on('connect', () => {
        console.log('connect' + socketContext.id);

        socketContext?.once(`init_user_${socketContext.id}`, (_) => {
            messages.data.push({
                message:
                    'Chúng tôi sẽ trả lời bạn sớm nhất có thể. Nếu chờ lâu bạn hãy liên hệ: 0396254427! Xin cảm ơn.',
                name: 'Van Hoang',
                role: 'admin',
            });
        });

        if (socketContext?.id) {
            socketContext?.on(`${socketContext?.id}`, (data) => {
                messages.data.push({
                    message: data.message,
                    name: data.name,
                    role: data.role,
                    id: data.id,
                });
            });

            socketContext.on(`typing_admin_${socketContext.id}`, (data) => {
                if (data.isType === socketContext?.id) {
                    visible.value = true;
                } else {
                    visible.value = false;
                }
            });

            socketContext.on(`clear_typing_admin_${socketContext.id}`, (data) => {
                if (data.isType === socketContext?.id) {
                    visible.value = false;
                }
            });
        }
    });

    socketContext.on('disconnect', () => {
        console.log('disconnect' + socketContext.id);
    });
});

watch(value, () => {
    if (socketContext.id) {
        if (value.value.trim().length > 0) {
            socketContext.emit('typing_user', socketContext.id);
        } else {
            socketContext.emit('clear_typing_user', socketContext.id);
        }
    }
});

const lassMessage = computed(() => {
    return messages.data[messages.data.length - 1];
});

const scrollToBottom = () => {
    lassMessageRef.value &&
        lassMessageRef.value.scrollIntoView({
            behavior: 'smooth',
        });
};

const handleSubmit = () => {
    if (value.value.trim().length > 0) {
        socketContext.emit('messageToAdmin', {
            id: socketContext.id,
            name: 'Thuy cute',
            role: 'user',
            message: value.value,
        });

        console.log('change');
        messages.data.push({
            message: value.value,
            role: 'user',
            name: 'Thuy cute',
            id: socketContext.id,
        });
        value.value = '';
        inputRef.value && inputRef.value.focus();
    }
};

const handleEnter = (e: any) => {
    if (e.key === 'Enter') {
        console.log('submit');
        handleSubmit();
    }
};

watch(value, () => {
    console.log('value change: ', value.value);
});
</script>

<template>
    <div class="chat-box">
        <div
            @click="
                () => {
                    open = true;
                    scrollToBottom();
                }
            "
            class="container"
        >
            <img :src="chatbox" alt="chat box" />

            <div v-if="lassMessage.role === 'admin'" class="notification-count">
                <span>1</span>
            </div>

            <div class="preview-chat-box">
                <div class="container-preview">
                    <div class="triangle-sharp"></div>
                    <h3>Admin - Hoàng</h3>
                    <p v-if="lassMessage.role === 'user'">Bạn: {{ lassMessage.message }}</p>
                    <div v-else class="wrapper-message-preview">
                        <span v-bind:style="{ margin: 0, padding: 0, color: 'dodgerblue' }">
                            <Dot />
                        </span>
                        <p>{{ lassMessage.message }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="open" class="content">
            <div class="header-chat">
                <div class="info-header">
                    <div class="wrap-img">
                        <img :src="logo" alt="logo shop" />
                    </div>
                    <h3 class="heading">Chat với Hoàng</h3>
                </div>
                <div
                    @click="
                        () => {
                            open = false;
                        }
                    "
                    class="close-btn"
                >
                    <BiMinus />
                </div>
            </div>
            <div class="messages">
                <template v-for="(item, index) in messages.data" :key="index">
                    <div v-if="item.role === 'admin'" class="message getview">
                        <div class="avatar">
                            <img :src="logo" alt="shop-admin" />
                        </div>
                        <p class="content-message">{{ item.message }}</p>
                    </div>
                    <div v-else class="message-2 getview">
                        <div class="avatar-2">
                            <img :src="cat" alt="shop-admin" />
                        </div>
                        <p class="content-message-2">{{ item.message }}</p>
                    </div>
                </template>
                <!-- {messages.map((message, index) => { if (message.role === 'admin') { return (
                <div key="{index}" class="message', 'getview">
                    <div class="avatar">
                        <img :src="logo" alt="shop-admin" />
                    </div>
                    <p class="content-message">{message.message}</p>
                </div>
                ); } else { return (
                <div key="{index}" class="message-2', 'getview">
                    <div class="avatar-2">
                        <img :src="cat" alt="shop-admin" />
                    </div>
                    <p class="content-message-2">{message.message}</p>
                </div>
                ); } })} -->
                <div :ref="lassMessageRef"></div>
            </div>
            <div class="footer-chat">
                <TypeAdmin v-if="visible" />
                <div class="footer-content">
                    <div class="input-footer">
                        <span class="icons">
                            <BsFillImage />
                        </span>
                        <span class="icons mr-6">
                            <BiHappy />
                        </span>
                        <input @keydown="handleEnter" :ref="inputRef" v-model="value" placeholder="Aa..." />
                    </div>
                    <IoSend />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.chat-box {
    position: fixed;
    bottom: 30%;
    right: 16px;
    z-index: 5;
    animation: fade 0.2s ease;

    .notification-count {
        position: absolute;
        right: 0px;
        color: #fff;

        span {
            background-color: red;
            display: inline-block;
            padding: 1px 8px;
            border-radius: 999px;
            font-size: 1.2rem;
        }
    }

    .preview-chat-box {
        position: absolute;
        right: 68px;
        transition: all 0.2s ease;
        display: none;

        .container-preview {
            max-width: 350px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 28px #b9b8b8;
            padding: 10px 16px;
            position: relative;

            .wrapper-message-preview {
                display: flex;
                align-items: center;

                span {
                    display: flex;
                }
            }

            .triangle-sharp {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: -12px;
                width: 0;
                height: 0;
                border-radius: 8px;
                border-bottom: 12px solid transparent;
                border-top: 12px solid transparent;
                border-left: 16px solid #fff;
            }

            h3 {
                font-size: 1.5rem;
                font-weight: 500;
                display: block;
                min-width: 164px;
                max-width: 350px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                line-clamp: 1;
                -webkit-box-orient: vertical;
            }

            p {
                display: flex;
                align-items: center;
                max-width: 350px;
                font-size: 1.3rem;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                line-clamp: 1;
                -webkit-box-orient: vertical;
            }
        }
    }

    &:hover .preview-chat-box {
        display: block;
    }
}

.container {
    display: flex;
    width: 48px;
    height: 48px;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.content {
    position: fixed;
    top: 70px;
    right: -6px;
    width: 360px;
    height: calc(100vh - 70px);
    background: rgba(186, 206, 163, 1);
    background-image: url('@/assets/images/pattern.svg');
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    display: flex;
    flex-direction: column;
    z-index: 5;
}

.header-chat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px 12px 16px;
    background-color: darkcyan;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
}

.wrap-img {
    width: 36px;
    height: 36px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 999px;
    }
}

.info-header {
    display: flex;
    align-items: center;
}

.heading {
    font-size: 1.6rem;
    color: var(--white-color);
    font-weight: 500;
    padding-left: 16px;
}

.close-btn {
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
}

.messages {
    flex: 1;
    padding: 8px 16px;
    height: 390px;
    overflow: overlay;
    overflow-y: scroll;
}

.message-2 {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    margin-bottom: 6px;
}

.content-message-2 {
    font-size: 1.4rem;
    height: auto;
    word-wrap: break-word;
    word-break: break-all;
    padding: 8px;
    background-color: #0084ff;
    border-radius: 16px;
    margin-right: 8px;
    color: #fff;
}

.message {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
}

.avatar-2,
.avatar {
    width: 36px;
    height: 36px;
    display: flex;
    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 999px;
    }
}

.content-message {
    font-size: 1.4rem;
    height: auto;
    word-wrap: break-word;
    word-break: break-word;
    padding: 8px;
    background-color: #e4e6eb;
    border-radius: 16px;
    margin-left: 8px;
    color: var(--primary-color);
}

.footer-chat {
    background-color: inherit;
}

.footer-content {
    display: flex;
    align-items: center;
    padding: 10px 8px;
}

.input-footer {
    display: flex;
    align-items: center;
    flex: 1;

    input {
        border: none;
        outline: none;
        padding: 10px;
        border-radius: 12px;
        width: 100%;
        caret-color: rgb(116, 184, 40);
    }
}

.icons {
    color: #0084ff;
    font-size: 2rem;
    display: flex;
    margin: 0 6px;
    cursor: pointer;

    &.mr-6 {
        margin-right: 12px;
    }
}

@keyframes fade {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
