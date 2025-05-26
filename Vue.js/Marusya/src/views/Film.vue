<script lang="ts" setup>
    import { useRoute } from 'vue-router';
    import { useAuthUser } from '@/stores/authUser';
    import { reactive } from 'vue';
    import TrailerModal from '@/components/TrailerModal.vue';

    const auth = useAuthUser();

    // реактивщина
    const film = reactive({
        id: '',
        title: '',
        descr: '',
        rating: '',
        genre: '',
        releaseData: 0,
        runtime: '',
        posterUrl: '',
        language: '',
        budget: 'неизвестно',
        revenue: 'неизвестно',
        director: 'неизвестно',
        prodaction: 'неизвестно',
        awards: 'неизвестно',
        trailerUrl: '',
        showTrailer: false,
        isFav: <boolean>(false)
    })

    // функция для преобразования ссылки в правильную
    function convertToEmbedUrl(url: string): string {
        const videoId = url.split('v=')[1]
        return `https://www.youtube.com/embed/${videoId}`
    }

    const route = useRoute();
    const filmId = route.query.filmId as string;
    const findFilm = () => {
        fetch(`https://cinemaguide.skillbox.cc/movie/${filmId}`)
            .then(response => {
                if(!response.ok){
                    throw new Error('Во время получения фильма по id возникла ошибка');
                }
                return response.json();
            })
            .then(data => {
                film.id = data.id;
                film.title = data.title;
                film.descr = truncateText(data.plot, 150);
                film.rating = data.tmdbRating.toFixed(1);
                film.genre = data.genres[0];
                film.releaseData = data.releaseDate.slice(0, 4);
                film.runtime = rightHours(data.runtime);
                film.posterUrl = data.posterUrl;
                film.trailerUrl = convertToEmbedUrl(data.trailerUrl);

                if(typeof data.language === 'string'){
                    const displayRuNames = new Intl.DisplayNames(['ru'], {type: 'language' })
                    const translatedLang = displayRuNames.of(data.language);
                    if(translatedLang){
                        film.language = translatedLang;
                    }
                }
                if(data.budget){
                    film.budget = data.budget;
                }
                if(data.revenue){
                    film.revenue = data.revenue;
                }
                if(data.director){
                    film.director = data.director;
                }
                if(data.prodaction){
                    film.prodaction = data.prodaction;
                }
                if(data.awards){
                    film.awards = data.awards;
                }
            })
    }

    // обрезка описания
    const truncateText = (text: string, length: number): string => {
        return text.length > length ? text.slice(0, length) + '...' : text;
    };

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

    findFilm();

    const changeButton = (event: Event) => {
        if(auth.isAuth){
            const falseFav = document.getElementById('falseFav') as HTMLElement;
            const trueFav = document.getElementById('trueFav') as HTMLElement;

            if(!film.isFav){
                addToFavorite(film.id);
                falseFav.style.display = 'none';
                trueFav.style.display = 'flex';
                film.isFav = true;
            }else{
                removeFromFavorites(film.id);
                falseFav.style.display = 'flex';
                trueFav.style.display = 'none';
                film.isFav = false;
            }
        }else{
            auth.OnShowLogin();
        }

        event.preventDefault();
    };
</script>

<template>
    <main class="film">
        <section class="hero">
            <div class="hero__content">
                <div class="hero__cinema">
                    <div class="cinema__info">
                        <span class="cinema__rating">
                            <svg class="cinema__rating-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00105 12.1734L3.29875 14.8055L4.34897 9.51997L0.392578 5.86124L5.74394 5.22675L8.00105 0.333374L10.2581 5.22675L15.6095 5.86124L11.6531 9.51997L12.7033 14.8055L8.00105 12.1734Z" fill="white"/>
                            </svg>
                            {{ film.rating }}
                        </span>
                        <span class="cinema__info-item">{{ film.releaseData }}</span>
                        <span class="cinema__info-item">{{ film.genre }}</span>
                        <span class="cinema__info-item">{{ film.runtime }}</span>
                    </div>
                    <h1 class="cinema__title">{{ film.title }}</h1>
                    <p class="cinema__descr">{{ film.descr }}</p>
                </div>
                <div class="hero__actions">
                    <button class="hero__button hero__button--trailer" @click="film.showTrailer = true">Трейлер</button>
                    <TrailerModal
                        :videoUrl="film.trailerUrl"
                        :isVisible="film.showTrailer"
                        @click="film.showTrailer=false"
                    />
                    <button class="hero__button hero__button--favorite" @click="changeButton" >
                        <svg id="falseFav" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z" fill="white"/>
                        </svg>
                        <svg class="hero__button--icon" id="trueFav" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z" fill="#B4A9FF"/>
                        </svg>
                    </button>   
                </div>
            </div>
             <img class="hero__image" :src="film.posterUrl" alt="hero image">
        </section>
        <section class="about">
            <h3 class="about__title">О&nbsp;фильме</h3>
            <ul class="about__list">
                <li class="about__item">
                    <span class="about__item--params">Язык оригинала</span>
                    <span class="about__item--dots"></span>
                    <span class="about__item--params about__item--cont">{{ film.language }}</span>
                </li>
                <li class="about__item">
                    <span class="about__item--params">Бюджет</span>
                    <span class="about__item--dots"></span>
                    <span class="about__item--params about__item--cont">{{ film.budget }}</span>
                </li>
                <li class="about__item">
                    <span class="about__item--params">Выручка</span>
                    <span class="about__item--dots"></span>
                    <span class="about__item--params about__item--cont">{{ film.revenue }}</span>
                </li>
                <li class="about__item">
                    <span class="about__item--params">Режиссёр</span>
                    <span class="about__item--dots"></span>
                    <span class="about__item--params about__item--cont">{{ film.director }}</span>
                </li>
                <li class="about__item">
                    <span class="about__item--params">Продакшен</span>
                    <span class="about__item--dots"></span>
                    <span class="about__item--params about__item--cont">{{ film.prodaction }}</span>
                </li>
                <li class="about__item">
                    <span class="about__item--params">Награды</span>
                    <span class="about__item--dots"></span>
                    <span class="about__item--params about__item--cont">{{ film.awards }}</span>
                </li>
            </ul>
        </section>
    </main>

</template>

<style scoped>
    .hero{
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(1, 2fr);
        margin-bottom: 40px;
    }

    .hero__content{
        padding: 74px 0 122px 0;
        display: flex;
        flex-direction: column;
        gap: 60px;
        grid-column: 1/2;
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
        display: flex;
        align-items: center;
    }

    .hero__button--trailer{
        background-color: #67A5EB;
    }

    .hero__button--favorite{
        padding: 16px 22px;
    }

    .hero__button-icon--active{
        display: none;
    }

    .hero__button--share{
        padding: 16px 22px;
    }

    .hero__button--icon{
        display: none;
    }

    .hero__image{
        grid-column: 2/3;
        border-radius: 16px;
        max-width: 680px;
        max-height: 552px;
        width: 100%;
        height: 100%;
    }

    /* about */
    .about{
        margin-bottom: 120px;
    }

    .about__title{
        font-weight: 700;
        font-size: 40px;
        line-height: 48px;
        padding-bottom: 64px;
    }

    .about__list{
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .about__item{
        display: flex;
        max-width: 500px;
        gap: 8px;
    }

    .about__item--params{
        font-weight: 400;
        font-size: 18px;
        line-height: 24px;
    }

    .about__item--dots{
        color: #FFFFFF80;
        border-bottom: #999 1px dotted;
        flex-grow: 1;
    }

    @media (max-width: 720px) {
        .hero{
            grid-template-columns: 1fr;
            grid-template-rows: repeat(2, 0.5fr);
            margin-bottom: 32px;
        }

        .hero__content{
            grid-column: 1;
            grid-row: 2;
            padding: 24px 0;
            gap: 32px;
        }

        .hero__image{
            grid-column: 1;
            grid-row: 1;
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
            grid-template-rows: 1fr;
            grid-template-columns: repeat(4, 1fr);
        }

        .hero__button--trailer{
            grid-column: 1/4;
            grid-row: 1;
            padding: 16px 0;
        }

        .hero__button--favorite{
            grid-row: 1;
            grid-column: 4/5;
        }

        .hero__image{
            max-height: 260px;
        }

        /* about */
        .about{
            margin-bottom: 32px;
        }

        .about__title{
            font-weight: 700;
            font-size: 24px;
            line-height: 32px;
            padding-bottom: 40px;
        }

        .about__item{
            flex-direction: column;
        }

        .about__item--dots{
            display: none;
        }

        .about__item--params{
            color: #FFFFFF80;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
        }

        .about__item--cont{
            color: #FFFF;
            font-weight: 400;
            font-size: 18px;
            line-height: 24px;
        }
    }
</style>