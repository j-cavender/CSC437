import {
    Auth,
    define,
    History,
    Switch,
    Store
} from "@calpoly/mustang";
import {html} from "lit";
import {Msg} from "./messages";
import {Model, init} from "./model";
import update from "./update";
import {HeaderElement} from "./components/header-element";
import {HomeViewElement} from "./views/home-view.ts";
import {ProductsViewElement} from "./views/products-view.ts";
import {LoginViewElement} from "./views/login-view.ts";
import {ItemViewElement} from "./views/item-view.ts";
import {ProfileViewElement} from "./views/profile-view.ts";
import {CartViewElement} from "./views/cart-view.ts";
import {PotteryItemElement} from "./components/pottery-item.ts";
import {PotteryListElement} from "./components/pottery-list.ts";
import {LoginFormElement} from "./auth/login-form.ts";
import {SignupFormElement} from "./auth/signup-form.ts";
import {SignupViewElement} from "./views/signup-view.ts";

const routes = [
    {
        path: "/app/items/:id",
        view: (params: Switch.Params) => html`
            <item-view item-id=${params.id}></item-view>
        `
    },
    {
        path: "/app/products",
        view: () => html`
            <products-view></products-view>
        `
    },
    {
        path: "/app/cart",
        view: () => html`
            <cart-view></cart-view>
        `
    },
    {
        path: "/app/profile/:userid/edit",
        view: (params: Switch.Params) => html`
            <profile-view userid=${params.userid} mode="edit"></profile-view>
        `
    },
    {
        path: "/app/profile/:userid",
        view: (params: Switch.Params) => html`
            <profile-view userid=${params.userid}></profile-view>
        `
    },
    {
        path: "/app/profile",
        view: () => html`
            <profile-view></profile-view>
        `
    },
    {
        path: "/app/login",
        view: () => html`
            <login-view></login-view>
        `
    },
    {
        path: "/app/signup",
        view: () => html`
            <signup-view></signup-view>
        `
    },
    {
        path: "/app",
        view: () => html`
            <home-view></home-view>
        `
    },
    {
        path: "/",
        redirect: "/app"
    }
];

define({
    "mu-auth": Auth.Provider,
    "mu-history": History.Provider,
    "mu-store": class AppStore
        extends Store.Provider<Model, Msg> {
        constructor() {
            super(update, init, "pottery:auth");
        }
    },
    "products-view": ProductsViewElement,
    "header-element": HeaderElement,
    "pottery-item": PotteryItemElement,
    "pottery-list": PotteryListElement,
    "login-form": LoginFormElement,
    "signup-form": SignupFormElement,
    "signup-view": SignupViewElement,
    "mu-switch": class AppSwitch extends Switch.Element {
        constructor() {
            super(routes, "pottery:history", "pottery:auth");
        }
    },
    "home-view": HomeViewElement,
    "login-view": LoginViewElement,
    "item-view": ItemViewElement,
    "profile-view": ProfileViewElement,
    "cart-view": CartViewElement
});