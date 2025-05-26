<script lang="ts" setup>
    import { useRouter } from 'vue-router';
    
    const props = defineProps<{
        link: string,
        film: string,
        id: string
    }>()

    const router = useRouter()


    const toFilm = () => {
        router.push({
            path: `${router.currentRoute.value.path}/${props.film}`,
            query: { 
                filmId: props.id
            }
        })
    }

</script>

<template>
    <li class="detail__item" @click="toFilm">
        <img class="detail__item--img" :src="link" alt="обложка фильма">
    </li>
</template>

<style scoped>
    .detail__item--img{
        border-radius: 16px;
        max-width: 224px;
        max-height: 336px;
        height: 100%;
        cursor: pointer;
    }

    @media (max-width: 720px){
        .detail__item--img{
            max-width: 335px;
            max-height: 502px;
            width: 100%;
        }
    }
</style>