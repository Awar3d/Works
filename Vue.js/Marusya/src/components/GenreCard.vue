<script setup lang="ts">
    defineProps<{
        number: number,
        genre: string
    }>()
</script>

<template>
    <li class="genre__item">
        <div class="genre__item--image" :class="`genre__item--${number}`"></div>
        <p class="genre__item--title">
            <router-link class="genre__item--detail" :to="`/genre/${genre}`">{{ genre }}</router-link>
        </p>
    </li>
</template>

<style scoped>
    .genre__item{
        display: flex;
        flex-direction: column;
    }

    .genre__item--image{
        background-repeat: no-repeat;
        height: 220px;
        background-size: cover;
        border-radius: 24px 24px 0 0;
    }

    .genre__item--1{
        background-image: url('../assets/img/genre_5.png');
    }
    .genre__item--2{
        background-image: url('../assets/img/genre_6.png');
    }
    .genre__item--3{
        background-image: url('../assets/img/genre_3.png');
    }
    .genre__item--4{
        background-image: url('../assets/img/genre_4.png');
    }
    .genre__item--5{
        background-image: url('../assets/img/genre_1.png');
    }
    .genre__item--6{
        background-image: url('../assets/img/genre_2.png');
    }
    .genre__item--7{
        background-image: url('../assets/img/genre_7.png');
    }
    .genre__item--8{
        background-image: url('../assets/img/genre_8.png');
    }

    .genre__item--title{
        padding: 22px 0 30px 0;
        background-color: #0A0B0B;
        color: #fff;
        border-radius: 0 0 24px 24px;
        font-weight: 700;
        font-size: 24px;
        line-height: 32px;
        text-align: center;
    }

    .genre__item--detail{
        text-decoration: none;
        color: inherit;
    }

    
</style>