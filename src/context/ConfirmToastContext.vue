<script setup lang="ts">
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
</script>
<template>
    <div>
        <Toast />
        <ConfirmDialog />
        <slot></slot>
    </div>
</template>
