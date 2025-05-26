<script lang="ts" setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const props = defineProps<{
        id: string,
        link: string,
        num: number
    }>()

    const specId = ref(`account-${props.num}`)

    const removeFromFavorites = () => {
        fetch(`https://cinemaguide.skillbox.cc/favorites/${props.id}`, {
            method: "DELETE",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            console.log('Удалено', data)
            const item = document.getElementById(`account-${props.num}`) as HTMLElement;
            item.remove();
        })
    }

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
    <li class="account__item" :id="specId">
        <img class="account__item--image" @click="toFilm()" :src="link" alt="Обложкка фильма">
        <svg class="account__item--svg" @click="removeFromFavorites()" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9987 10.5865L16.9485 5.63672L18.3627 7.05093L13.4129 12.0007L18.3627 16.9504L16.9485 18.3646L11.9987 13.4149L7.04899 18.3646L5.63477 16.9504L10.5845 12.0007L5.63477 7.05093L7.04899 5.63672L11.9987 10.5865Z" fill="black"/>
        </svg>
    </li>
</template>

<style scoped>
    .account__item{
        position: relative;
    }

    .account__item:hover{
        .account__item--svg{
            display: flex;
        }
    }

    .account__item--image{
        max-width: 224px;
        max-height: 336px;
        width: 100%;
        height: 100%;
        border-radius: 16px;
        object-fit: cover;
        object-position: center;
    }

    .account__item--svg{
        display: none;
        top: -20px;
        right: -20px;
        position: absolute;
        padding: 8px;
        background-color: #fff;
        border-radius: 30px;
        cursor: pointer;
        width: 40px;
        height: 40px;
    }
</style>