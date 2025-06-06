<script setup>
import SqlQueryExecutor from './components/SqlQueryExecutor.vue';
</script>

<template>
  <v-app>
    <!-- <v-app-bar color="primary">
      <v-app-bar-nav-icon>
        <v-img src="/logo.svg" width="32" height="32" class="mr-2"></v-img>
      </v-app-bar-nav-icon>
      <v-app-bar-title>SQL Query Hub</v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar> -->

    <v-main class="main-background">
      <v-container class="py-4 mb-10" fluid>
        <v-row justify="center">
          <v-col cols="12" lg="11" xl="10">
            <!-- Welcome Section -->
            <v-card class="welcome-card mb-6" elevation="1">
              <div class="d-flex flex-column align-center pa-3">
                <v-img src="/logo.svg" width="80" height="80" class="mb-4" alt="SQL Query Hub Logo"></v-img>
                <h1 class="text-h4 mb-2 font-weight-medium">Welcome to SQL Query Hub</h1>
                <p class="text-body-1 text-medium-emphasis text-center">
                  Execute multiple SQL queries efficiently and get organized results.
                </p>
              </div>
            </v-card>

            <!-- Main Content -->
            <SqlQueryExecutor />
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

.main-background {
  background-color: rgb(246, 248, 250) !important;
}

.welcome-card {
  border-radius: 8px;
  background: white !important;
  border: 1px solid rgba(25, 118, 210, 0.1);
}

.welcome-card .v-img {
  filter: drop-shadow(0 4px 6px rgba(25, 118, 210, 0.1));
  transition: transform 0.3s ease, filter 0.3s ease;
}

.welcome-card .v-img:hover {
  transform: translateY(-2px);
  filter: drop-shadow(0 6px 8px rgba(25, 118, 210, 0.2));
}

.v-footer {
  min-height: 36px !important;
  height: auto !important;
  position: fixed !important;
  bottom: 0 !important;
  width: 100% !important;
  z-index: 1000 !important;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .welcome-card {
    margin-left: -16px;
    margin-right: -16px;
    border-radius: 0;
  }
}

/* Custom styles go here */
</style>
