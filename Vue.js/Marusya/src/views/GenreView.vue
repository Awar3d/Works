<script lang="ts" setup>
    import GenreCard from '@/components/GenreCard.vue';
    import { ref } from 'vue';
    const genres = ref<string[]>([])

    fetch('https://cinemaguide.skillbox.cc/movie/genres')
    .then(response => {
        if(!response.ok){
            throw new Error('Ошибка во время получения жанров')
        }
        return response.json();
    })
    .then(data => {
        genres.value = data.map((genre: any) => genre)
    })
</script>

<template>
    <main class="main__genre">
        <h1 class="genre__title">Жанры фильмов</h1>
        <ul class="genre__list">
            <GenreCard 
                v-for="(genreName, index) in genres.slice(0, 8)"
                :key="genreName"
                :number="(index+1)"
                :genre="genreName"
            />
        </ul>
    </main>
</template>

<style scoped>
    .main__genre{
        margin-top: 64px; 
        /* здесь я использую тк расстояние от хедера до мейна в HomeView и GenreView отличаются */
        margin-bottom: 160px;
    }

    .genre__title{
        font-weight: 700;
        font-size: 48px;
        line-height: 56px;
        padding-bottom: 64px;
    }

    .genre__list{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 40px;
    }

    @media (max-width: 750px) {
        .main__genre{
            margin-top: 0;
            margin-bottom: 40px;
        }

        .genre__title{
            font-weight: 700;
            font-size: 24px;
            line-height: 32px;
            padding-bottom: 40px;
        }

        .genre__list{
            grid-template-rows: repeat(8, 1fr);
            grid-template-columns: 1fr;

        }
    }
</style>