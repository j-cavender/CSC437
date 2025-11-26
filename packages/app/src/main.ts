import {
    Auth,
    define,
    History,
    Switch
} from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { HeaderElement } from "./components/header-element";

define({
    "mu-auth": Auth.Provider,
    "mu-history": History.Provider,
    "header-element": HeaderElement,
    "mu-switch": class AppSwitch extends Switch.Element {
        constructor() {
            super(routes, "pottery:history", "pottery:auth");
        }
    }
});