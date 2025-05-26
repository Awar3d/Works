<script lang="ts" setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const props = defineProps<{
        id: string,
        link: string;
        num: number;
    }>()

    // переход на страницу фильма
    const toFilm = () => {
        router.push({
            path: `/${props.id}`,
            query: {
                filmId: props.id
            }
        })
    }
</script>

<template>
    <li class="top__item">
        <img @click="toFilm" class="top__item--image" v-if="props.link" :src="link" alt="обложка фильма 'беспринципные'">
        <img class="top__item--image" v-else src="../assets/img/nonePoster.jpg" alt="заглушка для фильмов">
        <span class="top__item--number">{{ num }}</span>
    </li>
</template>

<style scoped>
    .top__item{
        position: relative;
        cursor: pointer;
    }

    .top__item--image{
        width: 224px;
        height: 336px;
        border-radius: 16px;
        box-shadow: 0px 0px 80px 0px #FFFFFF54;
    }

    .top__item--number{
        color: #6A5DC2;
        background-color: #fff;
        padding: 8px 24px;
        font-weight: 700;
        font-size: 24px;
        line-height: 32px;
        border-radius: 50px;
        position: absolute;
        top: -12px;
        left: -12px;
    }

    @media (max-width: 720px) {
        .top__item--number{
            top: 5px;
            left: 5px;
        }
    }
</style>