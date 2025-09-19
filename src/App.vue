<script setup lang="ts">
import { useAccountStore } from './stores/accountStore';
import AccountList from './components/account-list.vue';

const accountStore = useAccountStore();

const addAccount = () => {
  accountStore.addAccount();
};
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="py-8">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="d-flex">
                <span>Управление учетными записями</span>
              </v-card-title>
              <v-card-text>В поле "Метка" вводятся текстовые метки, через знак ;</v-card-text>
              <v-card-text>
                <v-btn color="primary" @click="addAccount()">
                  Добавить учетную запись
                </v-btn>
              </v-card-text>
              <account-list />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
