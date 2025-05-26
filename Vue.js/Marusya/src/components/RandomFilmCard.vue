<script lang="ts" setup>
    import { ref } from 'vue'

    // авторизация
    import { useAuthUser } from '@/stores/authUser';
    import { useRouter } from 'vue-router';

    const auth = useAuthUser();
    const router = useRouter();

    import TrailerModal from './TrailerModal.vue';

    // реактивные
    const id = ref('');
    const title = ref('');
    const plot = ref('');
    const tmdbRating = ref('');
    const genre = ref('');
    const releaseDate = ref(0);
    const runtime = ref('');
    const posterURL = ref('');
    const trailerUrl = ref('');
    const showTrailer = ref(false);
    const isFav = ref<boolean>(false);

    // функция для преобразования ссылки в правильную
    function convertToEmbedUrl(url: string): string {
        const videoId = url.split('v=')[1]
        return `https://www.youtube.com/embed/${videoId}`
    }

    // функция которая обращается к апи и находит случайный фильм
    const randomFilmData = () => {
        fetch('https://cinemaguide.skillbox.cc/movie/random')
            .then(response => {
                if(!response.ok){
                    throw new Error('Ошибка во время получения случайного фильма')
                }
                return response.json();
            })
            .then(data => {
                id.value = data.id;
                title.value = data.title;
                plot.value = truncateText(data.plot, 150);
                tmdbRating.value = data.tmdbRating.toFixed(1);
                genre.value = data.genres[0];
                releaseDate.value = data.releaseDate.slice(0, 4);
                runtime.value = rightHours(data.runtime);
                posterURL.value = data.posterUrl;
                trailerUrl.value = convertToEmbedUrl(data.trailerUrl);
            })
            .catch(error => {
                console.log('Во время обработки произошла ошибка', error);
            })
    }

    // обрезает описание фильма
    const truncateText = (text: string, length: number): string => {
        return text.length > length ? text.slice(0, length) + '...' : text;
    };

    // делает из минут количество часов и минут
    const rightHours = (minutes: number): string => {
        if(minutes < 60){
            return minutes.toString();
        }else{
            const hours = minutes / 60;
            const mins = minutes % 60;
            return `${hours.toFixed(0)} ч ${mins.toFixed(0)} мин`;
        }
    }

    // добавление в избранное
    const addToFavorite = (filmId: string) => {
        if(!localStorage.getItem('isAuthorized')){
            console.log('not authorized!')
            return
        }else{
            fetch("https://cinemaguide.skillbox.cc/favorites", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    id: filmId
                }),
                credentials: 'include'
            })
            .then(data => {
                console.log('Успешно добавлен в избранное', data);
            })
        }
    }

    // удалить из избранного
    const removeFromFavorites = (filmId: string) => {
        fetch(`https://cinemaguide.skillbox.cc/favorites/${filmId}`, {
            method: "DELETE",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            console.log('Удалено', data)
        })
    }

    const favoriteNav = (filmid: string) => {
        const falseFav = document.getElementById('falseFav') as HTMLElement;
        const trueFav = document.getElementById('trueFav') as HTMLElement;

        if(auth.isAuth){
            if(!isFav.value){
                addToFavorite(filmid);
                falseFav.style.display = 'none';
                trueFav.style.display = 'flex';
                isFav.value = true;
            }else{
                removeFromFavorites(filmid);
                falseFav.style.display = 'flex';
                trueFav.style.display = 'none';
                isFav.value = false;
            }
        }else{
            auth.OnShowLogin();
        }
    }

    // переход на страницу фильма
    const toFilm = () => {
        router.push({
            path: `/${id.value}`,
            query: {
                filmId: id.value
            }
        })
    }

    randomFilmData();
</script>

<template>
    <section class="hero">
        <div class="hero__content">
            <div class="hero__cinema">
                <div class="cinema__info">
                    <span class="cinema__rating">
                        <svg class="cinema__rating-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00105 12.1734L3.29875 14.8055L4.34897 9.51997L0.392578 5.86124L5.74394 5.22675L8.00105 0.333374L10.2581 5.22675L15.6095 5.86124L11.6531 9.51997L12.7033 14.8055L8.00105 12.1734Z" fill="white"/>
                        </svg>
                        {{ tmdbRating }}
                    </span>
                    <span class="cinema__info-item">{{ releaseDate }}</span>
                    <span class="cinema__info-item">{{ genre }}</span>
                    <span class="cinema__info-item">{{ runtime }}</span>
                </div>
                <h1 class="cinema__title">{{ title }}</h1>
                <p class="cinema__descr">{{ plot }}</p>
            </div>
            <div class="hero__actions">
                <button class="hero__button hero__button--trailer" @click="showTrailer = true">Трейлер</button>
                <button class="hero__button hero__button--info" @click="toFilm">О&nbsp;фильме</button>
                <button class="hero__button hero__button--favorite" @click="favoriteNav(id)">
                    <svg id="falseFav" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z" fill="white"/>
                    </svg>
                    <svg class="hero__button--icon" id="trueFav" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z" fill="#B4A9FF"/>
                    </svg>
                </button>   
                <button class="hero__button hero__button--share" @click="randomFilmData()">
                    <svg class="hero__button-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4C14.7486 4 17.1749 5.38626 18.6156 7.5H16V9.5H22V3.5H20V5.99936C18.1762 3.57166 15.2724 2 12 2C6.47715 2 2 6.47715 2 12H4C4 7.58172 7.58172 4 12 4ZM20 12C20 16.4183 16.4183 20 12 20C9.25144 20 6.82508 18.6137 5.38443 16.5H8V14.5H2V20.5H4V18.0006C5.82381 20.4283 8.72764 22 12 22C17.5228 22 22 17.5228 22 12H20Z" fill="white"/>
                    </svg>
                </button>
            </div>
        </div>
        <picture class="hero__images">
            <img v-if="posterURL" class="hero__image" :src="posterURL" alt="hero image">
            <img v-else src="../assets/img/nonePoster.jpg" alt="заглушка фильмов">
        </picture>
    </section>
    <!-- trailer -->
    <TrailerModal
        :videoUrl="trailerUrl"
        :isVisible="showTrailer"
        @close="showTrailer = false"
    />
</template>

<style scoped>
    .hero{
            display: grid;
            justify-content: space-between;
            grid-template-columns: repeat(1, 2fr);
            margin-bottom: 40px;
        }

    .hero__cinema{
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .cinema__info{
        display: flex;
        gap: 16px;
        align-items: center;
    }

    .cinema__rating{
        color: #fff;
        display: flex;
        align-items: center;
        gap: 4px;
        font-weight: 700;
        font-size: 18px;
        line-height: 24px;
        padding: 4px 12px;
        background-color: #308E21;
        border-radius: 16px;
    }

    .cinema__info-item{
        font-weight: 400;
        font-size: 18px;
        line-height: 24px;
        color: #FFFFFFB2;
    }

    .cinema__title{
        font-weight: 700;
        font-size: 48px;
        line-height: 56px;
        padding: 0;
        margin: 0;
    }

    .cinema__descr{
        color: #FFFFFFB2;
        font-weight: 400;
        font-size: 24px;
        line-height: 32px;
    }

    .hero__content{
        padding: 74px 0 122px 0;
        display: flex;
        flex-direction: column;
        gap: 60px;
        grid-column: 1/2;
    }

    .hero__actions{
        display: flex;
        gap: 16px;
    }

    .hero__button{
        font-weight: 700;
        font-size: 18px;
        line-height: 24px;
        background-color: #393B3C;
        border-radius: 28px;
        border: none;
        outline: none;
        padding: 16px 48px;
        color: #fff;
    }

    .hero__button--trailer{
        background-color: #67A5EB;
    }

    .hero__button--trailer:hover{
        background-color: #FFFFFF;
        color: #000000;
    }

    .hero__button--trailer:disabled{
        background-color: #45526E;
    }

    .hero__button--info:disabled{
        background-color: #747474;
        color: #FFFFFF80;
    }

    .hero__button--favorite{
        display: flex;
        align-items: center;
        padding: 16px 22px;
        cursor: pointer;
    }

    .hero__button--icon{
        display: none;
    }

    .hero__button--share{
        padding: 16px 22px;
        cursor: pointer;
    }

    .hero__images{
        grid-column: 2/3;
    }

    .hero__image{
        max-width: 680px;
        max-height: 552px;
        width: 100%;
        height: 100%;
        border-radius: 16px;
    }

    @media (max-width: 720px) {
        .hero__content{
            grid-column: 1;
            grid-row: 2;
            padding: 24px 0;
            gap: 32px;
        }

        .cinema__rating{
            font-weight: 700;
            font-size: 18px;
            line-height: 24px;
        }

        .cinema__info-item{
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
        }

        .cinema__title{
            font-weight: 700;
            font-size: 24px;
            line-height: 32px;
        }

        .cinema__descr{
            font-weight: 400;
            font-size: 18px;
            line-height: 24px;
        }

        .hero__actions{
            display: grid;
            grid-template-rows: repeat(2, 1fr);
            grid-template-columns: 1fr 0.3fr 0.3fr;
        }

        .hero__button--trailer{
            grid-column: 1/4;
            grid-row: 1;
            padding: 16px 0;
        }

        .hero__button--info{
            grid-row: 2;
            grid-column: 1/2;
            font-weight: 700;
            font-size: 18px;
            line-height: 24px;
            padding: 16px 40px;
        }

        .hero__button--favorite{
            grid-row: 2;
            grid-column: 2/3;
        }

        .hero__button--share{
            grid-row: 2;
            grid-column: 3/4;
        }

        .hero__images{
            grid-column: 1;
            grid-row: 1;
        }

        .hero__image{
            max-height: 234px;
        }
    }
</style>