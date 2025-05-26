<script lang="ts" setup>
    import HomeCard from '@/components/HomeCard.vue';
    import RandomFilmCard from '@/components/RandomFilmCard.vue';
    import { ref } from 'vue';
    // top 10 
    fetch('https://cinemaguide.skillbox.cc/movie/top10')
        .then(response => {
            if(!response.ok){
                throw new Error('Во время загрузки топ-10 фильмов произошла ошибка');
            }
            return response.json();
        })
        .then(data => {
            paths.value = data.map((film: any) => [film.posterUrl, film.id]);
        })
        
    const paths = ref<string[]>([])

    // трейлер
</script>

<template>
    <main class="main">
        <RandomFilmCard/>
        <section class="top">
            <h2 class="top__title">Топ 10 фильмов</h2>
            <ul class="top__list">
                <HomeCard
                    v-for="([path, id], index) in paths" 
                    :key = "index"
                    :id = "id"
                    :link = "path"
                    :num = "index + 1"
                />
            </ul>
        </section>
    </main>
</template>

<style scoped>
    /* top */
    .top{
        margin-bottom: 120px;
    }

    .top__title{
        font-weight: 700;
        font-size: 40px;
        line-height: 48px;
        padding-bottom: 52px;
    }

    .top__list{
        display: grid;
        row-gap: 64px;
        column-gap: 40px;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(2, 1fr);
    }

    @media (max-width: 720px) {
        .hero{
            grid-template-columns: 1fr;
            grid-template-rows: repeat(2, 0.5fr);
            margin-bottom: 32px;
        }

        /* top */
        .top{
            margin-bottom: 32px;
        }

        .top__title{
            font-weight: 700;
            font-size: 24px;
            line-height: 32px;
            padding-bottom: 40px;
        }

        .top__list{
            grid-template-rows: 1fr;
            grid-template-columns: repeat(10, 1fr);
            overflow: auto;
            box-shadow: 0px 0px 80px 0px #FFFFFF54;
        }

        .top__list::-webkit-scrollbar{
            display: none;
        }
    }
</style>