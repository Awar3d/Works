<script lang="ts" setup>
    import { computed } from 'vue';

    const props = defineProps<{
        videoUrl: string,
        isVisible: boolean
    }>()

    const emit = defineEmits(['close'])

    function closeModal() {
        emit('close')
    }

    const computedUrl = computed(() => {
        if (!props.videoUrl) return '';
        return props.videoUrl.includes('?')
            ? props.videoUrl + '&autoplay=1'
            : props.videoUrl + '?autoplay=1';
    });
</script>

<template>
    <div class="trailer__overlay" v-if="isVisible" @click.self="closeModal">
        <div class="trailer__content">
            <iframe class="trailer__frame" :src="computedUrl" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <button class="trailer__close" @click="closeModal">
                <svg class="trailer__close--svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z" fill="black"/>
                </svg>
                <svg class="trailer__close--mobile" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.99873 5.5865L11.9485 0.636719L13.3627 2.05093L8.41293 7.0007L13.3627 11.9504L11.9485 13.3646L6.99873 8.4149L2.04899 13.3646L0.634766 11.9504L5.58453 7.0007L0.634766 2.05093L2.04899 0.636719L6.99873 5.5865Z" fill="black"/>
                </svg>

            </button>
        </div>
    </div>
</template>

<style scoped>
    .trailer__overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
    }

    .trailer__content {
        position: relative;
        background: #393B3C;
        max-width: 960px;
        max-height: 540px;
        height: 100%;
        width: 100%;
        padding: 1px;
    }

    .trailer__frame{
        width: 100%;
        height: 100%;
    }

    .trailer__close{
        padding: 12px;
        background-color: #fff;
        position: absolute;
        right: -72px;
        top: 0;
        border-radius: 24px;
    }

    .trailer__close--mobile{
        display: none;
    }

    @media(max-width: 720px){
        .trailer__close{
            width: 32px;
            height: 32px;
            padding: 7px;
            top: 8px;
            right: 8px;
        }

        .trailer__close--svg{
            display: none;
        }
        
        .trailer__close--mobile{
            display: block;
        }
    }
</style>