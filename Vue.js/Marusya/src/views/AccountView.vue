<script lang="ts" setup>
    import { useAuthUser } from '@/stores/authUser';
    import FavoriteCard from '@/components/FavoriteCard.vue';
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const auth = useAuthUser();

    onMounted(() => {
        const userName = localStorage.getItem('userName');
        const lastName = localStorage.getItem('lastName');
        const isAuth = localStorage.getItem('isAuthorized');
        const email = localStorage.getItem('email') ?? '';

        if (userName && lastName && isAuth === 'true') {
            auth.name = userName;
            auth.lastName = lastName;
            auth.isAuth = true;
            auth.email = email;
        }
    })


    interface Film{
        id: string,
        posterUrl: string
    }

    const favoriteFilms = ref<Film[]>([])

    if(auth.isAuth){
        fetch('https://cinemaguide.skillbox.cc/favorites', {
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            favoriteFilms.value = data.map((film: any) => ({
                id: film.id,
                posterUrl: film.posterUrl
            }))
        })
    }

    // функция для выхода из аккаунта
    const outLogUser = () => {
        document.cookie = '';
        auth.logoutUser();
        router.push('/');                                                                                       
    }

    const isFavVis = ref(true);

    const displayFav = () => {
        isFavVis.value = true
    }

    const displaySet = () => {
        isFavVis.value = false
    }

    
</script>

<template>
    <main class="account">
        <h1 class="account__title">Мой аккаунт</h1>
        <nav class="account__nav">
            <button class="account__button" @click="displayFav">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z" fill="white"/>
                </svg>
                Избранные фильмы
            </button>
            <button class="account__button" @click="displaySet">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z" fill="white"/>
                </svg>
                Настройка аккаунта
            </button>
        </nav>
        <div v-if="isFavVis">
            <section class="account__favorites favorites" id="favorites">
                <ul class="favorites__list">
                    <FavoriteCard
                        v-for="(film, index) in favoriteFilms"
                            :key="index"
                            :link="film.posterUrl"
                            :id="film.id"
                            :num="index+1"
                    />
                </ul>
            </section>
        </div>
        <div v-else>
            <!-- данные о пользователе -->
            <section class="account__logout" id="logout">
                <div class="account__user user-info">
                    <div class="user-info__section user-info__name">
                        <span class="user-info__initials">{{ auth.name ? auth.name.slice(0, 1) : '' }}{{ auth.lastName ? auth.lastName.slice(0, 1) : '' }}</span>
                        <div class="user-info__value">
                            <span class="value__span">Имя Фамилия</span>
                            <span class="value__content">{{ auth.name }} {{ auth.lastName }}</span>
                        </div>
                    </div>
                    <div class="user-info__section user-info__email">
                        <svg class="user-info__initials" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z" fill="white"/>
                        </svg>
                        <div class="user-info__value">
                            <span class="value__span">Электронная почта</span>
                            <span class="value__content">{{ auth.email }}</span>
                        </div>
                    </div>
                </div>
                <button class="account__logout-button" @click="outLogUser">Выйти из аккаунта</button>
            </section>
        </div>
    </main>
</template>

<style scoped>
    .account__title{
        color: #fff;
        font-weight: 700;
        font-size: 48px;
        line-height: 56px;
        padding-bottom: 64px;
        padding-top: 32px;
    }

    .account__nav{
        display: flex;
        gap: 64px;
        padding-bottom: 64px;
    }

    .account__button{
        background-color: inherit;
        border: none;
        outline: none;
        color: #fff;
        font-weight: 400;
        font-size: 24px;
        line-height: 32px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
    }

    .account__favorites{
        margin-bottom: 64px;
    }

    .favorites__list{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 40px;
    }

    .account__logout{
        display: flex;
        flex-direction: column;
        gap: 64px;
    }

    .account__user{
        display: flex;
        flex-direction: column;
        gap: 40px;
    }

    .user-info__section{
        display: flex;
        gap: 16px;
    }

    .user-info__initials{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 14px;
        background-color: #FFFFFF80;
        border-radius: 30px;
        font-weight: 700;
        font-size: 24px;
        line-height: 32px;
        color: #fff;
        max-width: 60px;
        max-height: 60px;
        width: 100%;
        height: 100%;
    }

    .user-info__value{
        display: flex;
        flex-direction: column;
    }

    .value__span{
        color: #fff;
        font-weight: 400;
        font-size: 18px;
        line-height: 24px;
    }

    .value__content{
        color: #fff;
        font-weight: 700;
        font-size: 24px;
        line-height: 32px;
    }

    .account__logout-button{
        color: #fff;
        background-color: #67A5EB;
        padding: 16px 48px;
        border-radius: 28px;
        font-weight: 700;
        font-size: 18px;
        line-height: 24px;
        max-width: 270px;
    }
</style>