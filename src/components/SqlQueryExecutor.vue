<script setup>
import { ref, onUnmounted } from 'vue';
import DatabaseConfig from './DatabaseConfig.vue';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const dbConfigRef = ref(null);
const queries = ref([{ id: 1, text: '' }]);
const loading = ref(false);
const results = ref(null);
const error = ref(null);
const errorTimeout = ref(null);
const downloadUrl = ref(null);
const showResults = ref(true);

const validateDbConfig = (config) => {
    if (!config || !config.type || !Array.isArray(config.configs) || config.configs.length === 0) {
        return false;
    }

    return config.configs.every(conf =>
        conf.name?.trim() &&
        conf.host?.trim() &&
        conf.port?.trim() &&
        conf.user?.trim() &&
        conf.password?.trim() &&
        conf.database?.trim()
    );
};

const validateQueries = () => {
    return queries.value.some(query => query.text?.trim().length > 0);
};

const addQuery = () => {
    queries.value.push({
        id: queries.value.length + 1,
        text: ''
    });
};

const removeQuery = (index) => {
    queries.value = queries.value.filter((_, i) => i !== index);
};

const closeResults = () => {
    results.value = null;
    downloadUrl.value = null;
    showResults.value = true;
};

const setError = (message) => {
    error.value = message;

    // Clear any existing timeout
    if (errorTimeout.value) {
        clearTimeout(errorTimeout.value);
    }

    // Set new timeout to clear error after 5 seconds
    errorTimeout.value = setTimeout(() => {
        error.value = null;
        errorTimeout.value = null;
    }, 5000);
};

// Clean up timeout when component is unmounted
onUnmounted(() => {
    if (errorTimeout.value) {
        clearTimeout(errorTimeout.value);
    }
});

const executeQueries = async () => {
    // Clear any existing error
    if (errorTimeout.value) {
        clearTimeout(errorTimeout.value);
        errorTimeout.value = null;
    }
    error.value = null;

    // Get and validate database configuration
    const dbConfig = dbConfigRef.value?.getConfig();
    if (!validateDbConfig(dbConfig)) {
        setError('Please fill in all database configuration fields');
        return;
    }

    // Validate queries
    if (!validateQueries()) {
        setError('Please enter at least one non-empty query');
        return;
    }

    loading.value = true;
    downloadUrl.value = null;
    showResults.value = true;

    try {
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
        setError(err.message);
        console.error('Query execution error:', err);
    } finally {
        loading.value = false;
    }
};

const downloadResults = async () => {
    if (downloadUrl.value) {
        try {
            window.open(downloadUrl.value, '_blank');
            // Show downloading state
            results.value = { ...results.value, downloading: true };
            // Wait a moment to show the downloading state
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Update the message to indicate the file might be deleted
            results.value = { ...results.value, downloaded: true };
            showResults.value = false;
            // Auto-close the results after 3 seconds
            setTimeout(() => {
                if (results.value?.downloaded) {
                    closeResults();
                }
            }, 3000);
        } catch (err) {
            error.value = 'Failed to download results. Please try again.';
        }
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
            <v-card class="query-card" elevation="1">
                <v-card-title class="text-h6 pa-4 d-flex align-center">
                    <v-icon icon="mdi-console-line" class="mr-2" color="primary" />
                    SQL Query Executor
                </v-card-title>

                <v-card-text>
                    <v-form @submit.prevent="executeQueries">
                        <div v-for="(query, index) in queries" :key="query.id" class="query-section mb-4">
                            <div class="d-flex align-center mb-3">
                                <v-chip color="primary" variant="tonal" class="mr-2" size="small">{{ index + 1
                                    }}</v-chip>
                                <h3 class="text-subtitle-1 font-weight-medium mb-0">Query</h3>
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
                            <v-btn color="primary" prepend-icon="mdi-plus" @click="addQuery" variant="tonal"
                                :disabled="loading">
                                Add Query
                            </v-btn>

                            <v-btn color="primary" type="submit" :loading="loading" prepend-icon="mdi-play"
                                class="px-6">
                                Execute Queries
                            </v-btn>
                        </div>

                        <!-- Error Alert with Vuetify Transition -->
                        <v-slide-y-transition>
                            <v-alert v-if="error" type="error" variant="tonal" closable class="mt-4"
                                @click:close="error = null">
                                {{ error }}
                            </v-alert>
                        </v-slide-y-transition>
                    </v-form>
                </v-card-text>
            </v-card>

            <v-slide-y-transition>
                <v-card v-if="results && showResults" class="mt-4 results-card" elevation="1">
                    <v-card-title class="text-h6 pa-4 d-flex align-center justify-space-between">
                        <div class="d-flex align-center">
                            <v-icon
                                :icon="results.downloading ? 'mdi-download-circle' : results.downloaded ? 'mdi-check-circle' : 'mdi-check-circle'"
                                :color="results.downloading ? 'info' : 'success'" class="mr-2" />
                            Execution Results
                        </div>
                        <v-btn density="comfortable" variant="plain" icon="$close" size="small" @click="closeResults"
                            :disabled="results.downloading" />
                    </v-card-title>
                    <v-card-text>
                        <v-alert :color="results.downloading ? 'info' : results.downloaded ? 'success' : 'success'"
                            variant="tonal" class="mb-4">
                            <template v-if="results.downloading">
                                <div class="d-flex align-center">
                                    <v-progress-circular indeterminate size="20" width="2" color="info" class="mr-2" />
                                    Downloading your results...
                                </div>
                            </template>
                            <template v-else-if="results.downloaded">
                                Results downloaded successfully! The file will be removed from the server shortly.
                            </template>
                            <template v-else>
                                Queries executed successfully! Results are ready for download. Once you download the
                                results, they will be deleted from the server.
                            </template>
                        </v-alert>
                        <div class="text-center">
                            <v-btn color="primary" prepend-icon="mdi-download" @click="downloadResults"
                                :disabled="!downloadUrl || results.downloading || results.downloaded" class="px-6">
                                {{ results.downloading ? 'Downloading...' : results.downloaded ? 'Downloaded' :
                                    'Download Results' }}
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-slide-y-transition>
        </v-col>
    </v-row>
</template>

<style scoped>
.query-card,
.results-card {
    border: 1px solid rgba(25, 118, 210, 0.1);
    border-radius: 8px;
    background: white !important;
}

.query-section {
    background: rgb(241, 243, 245) !important;
    border: 1px solid rgba(25, 118, 210, 0.1);
    border-radius: 8px;
    padding: 16px;
}

.query-input :deep(.v-field) {
    border-radius: 8px;
    font-family: 'Fira Code', monospace;
    transition: all 0.3s ease;
    background: white !important;
}

.query-input :deep(.v-field:hover:not(.v-field--disabled)) {
    border-color: rgba(25, 118, 210, 0.5);
}

.delete-btn-disabled {
    opacity: 0.5;
}

.delete-btn-enabled:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease;
}

@media (max-width: 600px) {
    .query-section {
        margin-left: -16px;
        margin-right: -16px;
        border-radius: 0;
    }
}

.results-card {
    border: 1px solid rgba(25, 118, 210, 0.1);
    border-radius: 8px;
    background: white !important;
    transition: all 0.3s ease;
}

.v-slide-y-transition-enter-active,
.v-slide-y-transition-leave-active {
    transition: all 0.3s ease;
}

.v-slide-y-transition-enter-from,
.v-slide-y-transition-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.close-btn {
    background: none;
    border: none;
    font-size: 24px;
    line-height: 1;
    padding: 4px 8px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.54);
    transition: color 0.2s ease;
    margin: -4px -4px -4px 8px;
}

.close-btn:hover {
    color: rgba(0, 0, 0, 0.87);
}

.close-btn:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}
</style>