<script setup lang="ts">
import { useAccountStore } from '../stores/accountStore';
import { storeToRefs } from 'pinia';
import AccountForm from './account-form.vue';

const accountStore = useAccountStore();
const { accounts } = storeToRefs(accountStore);
</script>

<template>
  <div>
    <v-list class="accounts-list">
      <v-list-item
        v-for="account in accounts"
        :key="account.id"
        class="mb-4"
      >
        <h3 class="account-title">{{ account.id }}</h3>
        <account-form :account="account" />
      </v-list-item>
    </v-list>
    
    <div v-if="accounts.length === 0" class="text-center py-8 text-medium-emphasis">
      <div>Нет учетных записей. Нажмите "Добавить учетную запись" чтобы создать первую.</div>
    </div>
  </div>
</template>

<style>
    .accounts-list {
        display: flex;
        flex-direction: column-reverse;
    }
    .account-title {
        margin-bottom: 16px;
    }
</style>