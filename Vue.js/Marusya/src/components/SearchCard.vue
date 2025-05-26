<script lang="ts" setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const isSearchVisible = ref(true);

    interface Film {
        id: string,
        title: string;
        releaseYear: number;
        tmdbRating: number,
        genres: string[],
        runtime: number,
        posterUrl: string
    }

    const props = defineProps<{
        data: Film
    }>();

    const genre = props.data.genres[0]

    const toFilm = () => {
        router.push({
            path: `/${props.data.id}`,
            query: { 
                filmId: props.data.id
            }
        })

        isSearchVisible.value = false;
    }

    // минуты => часы и минуты
    const rightHours = (minutes: number): string => {
        if(minutes < 60){
            return minutes.toString();
        }else{
            const hours = minutes / 60;
            const mins = minutes % 60;
            return `${hours.toFixed(0)} ч ${mins.toFixed(0)} мин`;
        }
    }
</script>

<template>
    <li class="search__item" @click="toFilm">
        <img class="search__image" :src="props.data.posterUrl" alt="Обложка фильма">
        <div class="search__item--content">
            <div class="search__info">
                <div class="search__info--rating">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_9070_1503)">
                        <path d="M5.00041 7.60837L2.06148 9.25346L2.71786 5.95L0.245117 3.66329L3.58972 3.26673L5.00041 0.208374L6.41108 3.26673L9.75566 3.66329L7.28295 5.95L7.93933 9.25346L5.00041 7.60837Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_9070_1503">
                        <rect width="10" height="10" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    {{ props.data.tmdbRating }}
                </div>
                <div class="search__info--item">{{ props.data.releaseYear }}</div>
                <div class="search__info--item">{{ genre }}</div>
                <div class="search__info--item">{{ rightHours(props.data.runtime) }}</div>
            </div>
            <div class="search__title">{{ props.data.title }}</div>
        </div>
    </li>

</template>

<style scoped>
    .search__item{
        padding: 20px 8px;
        display: flex;
        gap: 16px;
        cursor: pointer;
    }

    .search__image{
        width: 40px;
        height: 52px;
    }

    .search__item--content{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .search__info{
        display: flex;
        gap: 12px;
    }

    .search__info--rating{
        color: #fff;
        font-weight: 700;
        font-size: 12px;
        line-height: 16px;
        padding: 2px 8px;
        background-color: #308E21;
        border-radius: 16px;
    }

    .search__info--item{
        color: #FFFFFFB2;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
    }

    .search__title{
        color: #fff;
        font-weight: 700;
        font-size: 18px;
        line-height: 24px;
    }
</style>