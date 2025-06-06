import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#1867C0',
                    secondary: '#5CBBF6',
                    accent: '#4CAF50',
                    error: '#FF5252',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FFC107',
                    background: '#F5F5F5'
                }
            },
            dark: {
                colors: {
                    primary: '#2196F3',
                    secondary: '#424242',
                    accent: '#FF4081',
                    error: '#FF5252',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FFC107',
                    background: '#121212'
                }
            }
        }
    },
    defaults: {
        VCard: {
            elevation: 2
        },
        VBtn: {
            variant: 'elevated',
            elevation: 2
        },
        VTextField: {
            variant: 'outlined',
            density: 'comfortable'
        },
        VTextarea: {
            variant: 'outlined',
            density: 'comfortable'
        }
    }
}) 