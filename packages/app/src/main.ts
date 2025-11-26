import {
    Auth,
    define,
    History,
    Switch
} from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { HeaderElement } from "./components/header-element";
import {HomeViewElement} from "./views/home-view.ts";

const routes = [
    {
        path: "/app/items/:id",
        view: (params: Switch.Params) => html`
      <item-view item-id=${params.id}></item-view>
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
    "header-element": HeaderElement,
    "mu-switch": class AppSwitch extends Switch.Element {
        constructor() {
            super(routes, "pottery:history", "pottery:auth");
        }
    },
    "home-view": HomeViewElement
});