<script setup lang="ts">
import routesConfig from '@/config/routes';
import { useSession } from '@/stores';
import { onMounted } from 'vue';

const {setSessions} = useSession()

    onMounted(() => {

        setSessions(true, {
            id: 1,
            name: 'Van Hoang',
            token: 'eykdhfdsfkjsfhsajfkdshffdg'
        })
    })

</script>

<template>
  <div>
    LOGIN PAGE

    <RouterLink :to="routesConfig.profile">To Profile</RouterLink>
  </div>
</template>
