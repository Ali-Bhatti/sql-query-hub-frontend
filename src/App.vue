<script setup>
import SqlQueryExecutor from './components/SqlQueryExecutor.vue';
</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>SQL Query Hub</v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container class="py-4" fluid>
        <v-row justify="center">
          <v-col cols="12" xl="10">
            <v-card class="mb-6 pa-4" variant="flat">
              <div class="text-center">
                <h1 class="text-h4 mb-2">Welcome to SQL Query Hub</h1>
                <p class="text-body-1 text-medium-emphasis">
                  Execute multiple SQL queries efficiently and get organized results.
                </p>
              </div>
            </v-card>

            <SqlQueryExecutor class="mx-4" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer class="bg-grey-lighten-1 py-2 footer-fixed">
      <v-container class="py-0">
        <div class="text-center text-caption">&copy; {{ new Date().getFullYear() }} SQL Query Hub. All rights reserved.
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<style>
.v-container {
  max-width: 1920px;
}

.v-footer {
  min-height: 36px !important;
  height: auto !important;
  position: fixed !important;
  bottom: 0 !important;
  width: 100% !important;
  z-index: 1000 !important;
}

/* Custom styles go here */
</style>
