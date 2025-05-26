<script lang="ts" setup>
    import DetailCard from '@/components/DetailCard.vue';
    import { ref, onMounted } from 'vue';

    const props = defineProps<{
        genre: string,
    }>()

    const films = ref<any[]>([]);
    const maxFilms = 20;

    const getRandomFilm = async () => {
        const response = await fetch('https://cinemaguide.skillbox.cc/movie/random');
        if (!response.ok) {
            throw new Error('Ошибка при получении случайного фильма');
        }
        const data = await response.json();
        return data;
    };

    const fetchGenreFilm = async () => {
        while (films.value.length < maxFilms) {
            const film = await getRandomFilm();
            if (film.genres.includes(props.genre)){
                films.value.push({
                    path: film.posterUrl,
                    id: film.id,
                    title: film.title
                })
            }
        }
    }

    console.log(films)

    onMounted(() => {
        fetchGenreFilm();
    });

</script>

<template>
    <main class="detail">
        <h1 class="detail__title">
            <a href="/genre">
                <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.04701 11.0012L13.2967 19.2507L10.9397 21.6077L0.333008 11.0012L10.9397 0.394531L13.2967 2.75155L5.04701 11.0012Z" fill="white"/>
                </svg>
                {{ genre }}
            </a>
        </h1>
        <ul class="detail__list">
            <DetailCard
                v-for="(film, index) in films"
                :key="index"
                :link="film.path"
                :film="film.id"
                :title="film.title"
                :id="film.id"
            />
        </ul>
        <button class="detail__button">Показать ещё</button>
    </main>
</template>

<style scoped>
    .detail{
        display: flex;
        flex-direction: column;
    }

    .detail__title{
        display: flex;
        align-items: center;
        font-weight: 700;
        font-size: 48px;
        line-height: 56px;
        color: #fff;
        padding-bottom: 64px;
        gap: 30px;
    }

    .detail__list{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 40px;
        padding-bottom: 64px;
    }

    .detail__button{
        color: #fff;
        background-color: #67A5EB;
        padding: 16px 48px;
        border-radius: 28px;
        font-weight: 700;
        font-size: 18px;
        line-height: 24px;
        max-width: 224px;
        align-self: center;
    }

    @media (max-width: 720px) {
        .detail__list{
            grid-template-columns: repeat(1, 1fr);
            gap: 24px;
        }
    }
</style>