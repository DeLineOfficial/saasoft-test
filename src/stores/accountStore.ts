import { defineStore } from 'pinia';
import type { Account } from '../types/accountTypes';
import { ref } from 'vue';


export const useAccountStore = defineStore("accounts", () => {
    const accounts = ref(<Account[]>[])


    function generateIdTimestampRandom(prefix: string) {
        const t = Date.now().toString(36)
        const r = Math.random().toString(36).slice(2, 9)
        return `${prefix}${t}-${r}`
    }

    function initAccounts() {
        if (!localStorage.getItem("accounts")) {
            accounts.value = []
        } else {
            accounts.value = JSON.parse(localStorage.getItem("accounts"))
        }
    }

    function addAccount() {
        const newAccount: Account = {
            id: generateIdTimestampRandom('ac-'),
            label: '',
            labelsArray: [],
            type: 'Локальная',
            login: '',
            password: '',
            errors: {},
        }
        accounts.value.push(newAccount);

        localStorage.setItem('accounts', JSON.stringify(accounts.value))
    }
    function removeAccount(id: string) {
        const indexAccount = accounts.value.findIndex(el => el.id == id)
        if (indexAccount !== -1) {
            accounts.value.splice(indexAccount, 1);
            localStorage.setItem('accounts', JSON.stringify(accounts.value))
        }
    }

    function updateAccount(account: Account) {
        const indexAccount = accounts.value.findIndex(el => el.id === account.id);
        if (indexAccount !== -1) {
            const labelsArray = account.label?.split(';').map(item => item.trim()).filter(item => item.length > 0);

            accounts.value[indexAccount] = {
                ...account,
                labelsArray
            }

            localStorage.setItem('accounts', JSON.stringify(accounts.value))
        }
    }

    function validateAccount(account: Account) {
        const errors: Account['errors'] = {};
        if (account.label.length > 50) {
            errors.label = 'Метка не должна превышать 50 символов';
        }

        if (!account.login.trim()) {
            errors.login = 'Логин обязателен для заполнения';
        } else if (account.login.length > 100) {
            errors.login = 'Логин не должен превышать 100 символов';
        }

        if (account.type === 'Локальная') {
            if (!account.password) {
                errors.password = 'Пароль обязателен для локальной учетной записи';
            } else if (account.password.length > 100) {
                errors.password = 'Пароль не должен превышать 100 символов';
            }
        }

        account.errors = errors;
        return Object.keys(errors).length === 0;
    }

    initAccounts();

    return { accounts, addAccount, removeAccount, updateAccount, validateAccount };
})