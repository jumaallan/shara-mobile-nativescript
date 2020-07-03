import Home from '~/components/Pages/Home';
import Order from '~/components/Pages/Order';
import Login from '~/components/Pages/Auth/Login';
import Register from '~/components/Pages/Auth/Register';

export const routes = {
    '/home': {
        component: Home,
        meta: {needsAuth: true}
    },
    '/order': {
        component: Order,
        meta: {needsAuth: true}
    },
    '/register': {
        component: Register,
        meta: {needsAuth: false}
    },
    '/login': {
        component: Login,
        meta: {needsAuth: false}
    },
};
