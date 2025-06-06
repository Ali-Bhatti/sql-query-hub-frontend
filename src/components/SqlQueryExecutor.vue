<script setup>
import { ref } from 'vue';
import DatabaseConfig from './DatabaseConfig.vue';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const dbConfigRef = ref(null);
const queries = ref([{ id: 1, text: '' }]);
const loading = ref(false);
const results = ref(null);
const error = ref(null);
const downloadUrl = ref(null);

const addQuery = () => {
    queries.value.push({
        id: queries.value.length + 1,
        text: ''
    });
};

const removeQuery = (index) => {
    queries.value = queries.value.filter((_, i) => i !== index);
};

const executeQueries = async () => {
    loading.value = true;
    error.value = null;
    downloadUrl.value = null;

    try {
        const dbConfig = dbConfigRef.value.getConfig();
        const response = await fetch(`${API_URL}/api/queries/execute-queries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                queries: queries.value.map(q => q.text).filter(text => text.trim()),
                shouldExport: true,
                dbConfig
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to execute queries');
        }

        const data = await response.json();
        results.value = data;

        if (data.zipPath) {
            downloadUrl.value = `${API_URL}/api/queries/download-results?zipPath=${encodeURIComponent(data.zipPath)}`;
        }
    } catch (err) {
        error.value = err.message;
        console.error('Query execution error:', err);
    } finally {
        loading.value = false;
    }
};

const downloadResults = () => {
    if (downloadUrl.value) {
        window.open(downloadUrl.value, '_blank');
    }
};
</script>

<template>
    <v-row>
        <!-- Database Configuration Section -->
        <v-col cols="12" md="4">
            <DatabaseConfig ref="dbConfigRef" />
        </v-col>

        <!-- Query Execution Section -->
        <v-col cols="12" md="8">
            <v-card class="mb-6 query-card" elevation="2">
                <v-card-title class="text-h5 pa-4 d-flex align-center">
                    <v-icon icon="mdi-console-line" class="mr-2" />
                    SQL Query Executor
                </v-card-title>

                <v-card-text>
                    <v-form @submit.prevent="executeQueries">
                        <div v-for="(query, index) in queries" :key="query.id"
                            class="query-section mb-4 pa-3 rounded bg-grey-lighten-4">
                            <div class="d-flex align-center mb-3">
                                <v-chip color="primary" class="mr-2" size="small">{{ index + 1 }}</v-chip>
                                <h3 class="text-h6 mb-0">Query</h3>
                                <v-spacer></v-spacer>
                                <v-btn icon size="small" color="error" variant="tonal" @click="removeQuery(index)"
                                    :disabled="queries.length === 1"
                                    :class="{ 'delete-btn-disabled': queries.length === 1, 'delete-btn-enabled': queries.length > 1 }">
                                    <v-icon icon="mdi-delete"></v-icon>
                                    <v-tooltip activator="parent" location="top">Remove Query</v-tooltip>
                                </v-btn>
                            </div>

                            <v-textarea v-model="query.text" rows="4" auto-grow hide-details
                                placeholder="Enter your SQL query here..." class="query-input mb-0" variant="outlined"
                                :bg-color="loading ? 'grey-lighten-3' : undefined" :readonly="loading"
                                :loading="loading">
                            </v-textarea>
                        </div>

                        <div class="d-flex flex-wrap justify-space-between align-center gap-4 mt-4">
                            <v-btn color="secondary" prepend-icon="mdi-plus" @click="addQuery" variant="tonal"
                                :disabled="loading">
                                Add Query
                            </v-btn>

                            <v-btn color="primary" type="submit" :loading="loading" prepend-icon="mdi-play" size="large"
                                class="px-6">
                                Execute Queries
                            </v-btn>
                        </div>
                    </v-form>
                </v-card-text>
            </v-card>

            <v-alert v-if="error" type="error" variant="tonal" closable class="mb-4">
                {{ error }}
            </v-alert>

            <v-card v-if="results" class="mt-4 results-card" elevation="2">
                <v-card-title class="text-h6 pa-4 d-flex align-center">
                    <v-icon icon="mdi-check-circle" color="success" class="mr-2" />
                    Execution Results
                </v-card-title>
                <v-card-text>
                    <v-alert color="success" variant="tonal" class="mb-4">
                        Queries executed successfully! Results are ready for download.
                    </v-alert>
                    <div class="text-center">
                        <v-btn color="primary" prepend-icon="mdi-download" @click="downloadResults"
                            :disabled="!downloadUrl" size="large" class="px-6">
                            Download Results
                        </v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<style scoped>
.query-card,
.results-card {
    border: 1px solid #e0e0e0;
}

.query-section {
    border: 1px solid #e0e0e0;
    transition: all 0.3s ease;
}

.query-section:hover {
    border-color: var(--v-primary-base);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.query-input :deep(.v-field) {
    border-radius: 8px;
    font-family: 'Fira Code', monospace;
}

.delete-btn-disabled {
    opacity: 0.5;
}

.delete-btn-enabled {
    opacity: 1;
}

:deep(.v-btn) {
    text-transform: none;
    letter-spacing: normal;
}

:deep(.v-alert) {
    border-radius: 8px;
}
</style>