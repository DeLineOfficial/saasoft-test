<script setup lang="ts">
import { ref, watch, reactive, onMounted } from 'vue';
import { useAccountStore } from '../stores/accountStore';
import type { Account } from '../types/accountTypes';

const props = defineProps<{
    account: Account;
}>();

const accountStore = useAccountStore();
const showPassword = ref(false);

const accountTypes = [
    { title: 'LDAP', value: 'LDAP' },
    { title: 'Локальная', value: 'Локальная' },
];

const localAccount = reactive<Account>({ ...props.account });

watch(() => props.account, (newAccount) => {
  Object.assign(localAccount, newAccount);
});

const validateAndSave = () => {
      const isValid = accountStore.validateAccount(localAccount);
      if (isValid) {
        accountStore.updateAccount(localAccount);
      }
};
const removeAccount = () => {
    accountStore.removeAccount(localAccount.id);
};

onMounted(() => {
    validateAndSave();
})
</script>

<template>
    <v-card variant="outlined" class="pa-4">
        <v-row>
            <v-col cols="12" md="6">
                <v-text-field v-model="localAccount.label" label="Метка" :maxlength="50"
                    :error-messages="localAccount.errors?.label" counter @blur="validateAndSave"
                    placeholder="Введите метки через ;"></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
                <v-select v-model="localAccount.type" :items="accountTypes" label="Тип записи"
                    @update:modelValue="validateAndSave"></v-select>
            </v-col>

            <v-col cols="12" md="6">
                <v-text-field v-model="localAccount.login" label="Логин" :maxlength="100"
                    :error-messages="localAccount.errors?.login" counter required
                    @blur="validateAndSave"></v-text-field>
            </v-col>

            <v-col cols="12" md="6" v-if="localAccount.type === 'Локальная'">
                <v-text-field v-model="localAccount.password" label="Пароль" :maxlength="100"
                    :error-messages="localAccount.errors?.password" counter required
                    :type="showPassword ? 'text' : 'password'"
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showPassword = !showPassword" @blur="validateAndSave"></v-text-field>
            </v-col>

            <v-col cols="12" class="d-flex justify-end">
                <v-btn color="error" variant="text" @click="removeAccount" prepend-icon="mdi-delete">
                    Удалить
                </v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>