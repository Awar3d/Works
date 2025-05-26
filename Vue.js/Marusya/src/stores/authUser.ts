import { defineStore } from 'pinia';

export const useAuthUser = defineStore('user', {
    state: () => ({
        isAuth: false, // Флаг авторизации
        email: '',
        password: '',
        name: '',
        lastName: '',
        showLoginModal: false,
        showRegModal: false,
        successReg: false,
    }),
    actions: {
        loadUserFromLocalStorage() {
            // Проверяем, если данные пользователя сохранены в localStorage
            const userData = localStorage.getItem('userData');
            if (userData) {
                const parsedData = JSON.parse(userData);
                this.email = parsedData.email;
                this.name = parsedData.name;
                this.lastName = parsedData.lastName;
                this.isAuth = true;
            }
        },
        saveUserToLocalStorage() {
            // Сохраняем данные в localStorage, если пользователь авторизован
            if (this.isAuth) {
                const userData = {
                    email: this.email,
                    name: this.name,
                    lastName: this.lastName
                };
                localStorage.setItem('userData', JSON.stringify(userData));
            }
        },
        loginUser(email: string, name: string, lastName: string, password: string) {
            this.email = email;
            this.password = password;
            this.name = name;
            this.lastName = lastName;
            this.isAuth = true; // После успешного логина устанавливаем флаг авторизации
            this.saveUserToLocalStorage(); // Сохраняем данные в localStorage
        },
        logoutUser() {
            this.email = '';
            this.name = '';
            this.lastName = '';
            this.password = '';
            this.isAuth = false;
            localStorage.removeItem('userData');
        },
        OnShowLogin(){
            this.showLoginModal = true;
        },
        offShowLogin(){
            this.showLoginModal = false;
        },
        onShowReg(){
            this.showRegModal = true;
        },
        offShowReg(){
            this.showRegModal = false;
        },
        onShowSuccess(){
            this.successReg = true;
        },
        offShowSuccess(){
            this.successReg = false;
        },
    },
});
