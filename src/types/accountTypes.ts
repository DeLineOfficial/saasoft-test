export type Account = {
    id: string;
    label: String;
    labelsArray?: String[];
    type: 'LDAP' | 'Локальная';
    login: string;
    password: string | null;
    errors: {
        label?: string;
        login?: string;
        password?: string;
    };
}

