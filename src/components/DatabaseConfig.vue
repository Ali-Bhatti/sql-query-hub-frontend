<script setup>
import { ref } from 'vue';

const serverTypes = [
    { title: 'MySQL', value: 'mysql', icon: 'mdi-database' },
    { title: 'PostgreSQL', value: 'postgres', icon: 'mdi-elephant' },
    { title: 'Microsoft SQL Server', value: 'mssql', icon: 'mdi-microsoft' }
];

const dbConfig = ref({
    type: 'mysql',
    configs: [
        {
            id: 1,
            name: '',
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        }
    ]
});

const showPasswords = ref(new Array(dbConfig.value.configs.length).fill(false));
const configFile = ref(null);
const uploadError = ref('');

const addConfig = () => {
    dbConfig.value.configs.push({
        id: dbConfig.value.configs.length + 1,
        name: '',
        host: '',
        port: '',
        user: '',
        password: '',
        database: ''
    });
    showPasswords.value.push(false);
};

const removeConfig = (index) => {
    if (dbConfig.value.configs.length > 1) {
        dbConfig.value.configs.splice(index, 1);
        showPasswords.value.splice(index, 1);
    }
};

const togglePasswordVisibility = (index) => {
    showPasswords.value[index] = !showPasswords.value[index];
};

const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    uploadError.value = '';

    try {
        const text = await file.text();
        const config = JSON.parse(text);

        if (config.type && Array.isArray(config.configs)) {
            if (serverTypes.some(type => type.value === config.type)) {
                dbConfig.value = config;
                showPasswords.value = new Array(config.configs.length).fill(false);
            } else {
                throw new Error('Invalid server type in config file');
            }
        } else {
            throw new Error('Invalid config file structure');
        }
    } catch (error) {
        uploadError.value = 'Error reading config file: ' + error.message;
    }

    event.target.value = '';
};

const downloadConfigTemplate = () => {
    const template = {
        type: 'mysql',
        configs: [
            {
                name: 'example_db',
                host: 'localhost',
                port: '3306',
                user: 'username',
                password: 'password',
                database: 'database_name'
            }
        ]
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'db_config_template.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

defineExpose({
    getConfig: () => dbConfig.value
});
</script>

<template>
    <v-card class="config-card" elevation="1">
        <v-card-title class="text-h6 pa-4 d-flex align-center">
            <v-icon icon="mdi-database-cog" class="mr-2" color="primary" />
            Database Configuration
        </v-card-title>

        <v-card-text>
            <!-- Server Type Selection -->
            <div class="mb-4">
                <v-select v-model="dbConfig.type" :items="serverTypes" item-title="title" item-value="value"
                    label="Server Type" variant="outlined" density="comfortable" class="server-type-select"
                    :prepend-inner-icon="serverTypes.find(t => t.value === dbConfig.type)?.icon || 'mdi-database'">
                    <template v-slot:item="{ props, item }">
                        <v-list-item v-bind="props" :title="item.raw.title" :prepend-icon="item.raw.icon">
                        </v-list-item>
                    </template>
                </v-select>
            </div>

            <!-- Config File Upload Section -->
            <v-card class="mb-4 upload-section" variant="flat">
                <div class="d-flex align-center gap-2">
                    <v-file-input v-model="configFile" label="Upload Config File" accept=".json"
                        @change="handleFileUpload" variant="outlined" density="comfortable" hide-details
                        class="upload-input" prepend-icon="mdi-file-upload"
                        :error-messages="uploadError"></v-file-input>

                    <v-btn color="primary" prepend-icon="mdi-download" @click="downloadConfigTemplate" variant="tonal"
                        class="flex-shrink-0 ml-2 template-btn">
                        Template
                    </v-btn>
                </div>
            </v-card>

            <!-- Database Configurations -->
            <div v-for="(config, index) in dbConfig.configs" :key="config.id" class="database-config mb-4">
                <div class="d-flex align-center mb-3">
                    <v-chip color="primary" variant="tonal" class="mr-2" size="small">{{ index + 1 }}</v-chip>
                    <h3 class="text-subtitle-1 font-weight-medium mb-0">Database Configuration</h3>
                    <v-spacer></v-spacer>
                    <v-btn icon size="small" color="error" variant="tonal" @click="removeConfig(index)"
                        :disabled="dbConfig.configs.length === 1"
                        :class="{ 'delete-btn-disabled': dbConfig.configs.length === 1, 'delete-btn-enabled': dbConfig.configs.length > 1 }">
                        <v-icon icon="mdi-delete"></v-icon>
                        <v-tooltip activator="parent" location="top">Remove Database</v-tooltip>
                    </v-btn>
                </div>

                <v-row dense>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="config.name" label="Connection Name" variant="outlined"
                            density="comfortable" prepend-inner-icon="mdi-tag" hide-details
                            class="mb-3 config-input"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="config.host" label="Host" variant="outlined" density="comfortable"
                            prepend-inner-icon="mdi-server" hide-details class="mb-3 config-input"></v-text-field>
                    </v-col>
                </v-row>

                <v-row dense>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="config.port" label="Port" variant="outlined" density="comfortable"
                            prepend-inner-icon="mdi-numeric" hide-details class="mb-3 config-input"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="config.database" label="Database" variant="outlined"
                            density="comfortable" prepend-inner-icon="mdi-database" hide-details
                            class="mb-3 config-input"></v-text-field>
                    </v-col>
                </v-row>

                <v-row dense>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="config.user" label="Username" variant="outlined" density="comfortable"
                            prepend-inner-icon="mdi-account" hide-details class="config-input"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="config.password" :type="showPasswords[index] ? 'text' : 'password'"
                            label="Password" variant="outlined" density="comfortable" prepend-inner-icon="mdi-lock"
                            hide-details :append-inner-icon="showPasswords[index] ? 'mdi-eye-off' : 'mdi-eye'"
                            @click:append-inner="togglePasswordVisibility(index)" class="config-input"></v-text-field>
                    </v-col>
                </v-row>
            </div>

            <!-- Add Database Button -->
            <div class="text-center mt-4">
                <v-btn color="primary" prepend-icon="mdi-database-plus" @click="addConfig" variant="tonal">
                    Add Database
                </v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.config-card {
    border: 1px solid rgba(25, 118, 210, 0.1);
    border-radius: 8px;
    background: white !important;
}

.upload-section {
    background: rgb(241, 243, 245) !important;
    border: 1px solid rgba(25, 118, 210, 0.1);
    border-radius: 8px;
    padding: 16px;
}

.database-config {
    background: rgb(241, 243, 245) !important;
    border: 1px solid rgba(25, 118, 210, 0.1);
    border-radius: 8px;
    padding: 16px;
}

.config-input :deep(.v-field) {
    border-radius: 8px;
    transition: all 0.3s ease;
    background: white !important;
}

.config-input :deep(.v-field:hover) {
    border-color: rgba(25, 118, 210, 0.5);
}

.delete-btn-disabled {
    opacity: 0.5;
}

.delete-btn-enabled:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease;
}

.template-btn {
    white-space: nowrap;
}

@media (max-width: 600px) {
    .database-config {
        margin-left: -16px;
        margin-right: -16px;
        border-radius: 0;
    }
}
</style>