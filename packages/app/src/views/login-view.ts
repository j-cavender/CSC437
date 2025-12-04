import {html, LitElement} from "lit";
import tokens from "../styles/tokens.css.js";
import commonStyles from "../styles/common.css.js";
import loginStyles from "../styles/login-view.css.js";

export class LoginViewElement extends LitElement {
    static styles = [tokens.styles, commonStyles.styles, loginStyles.styles];

    render() {
        return html`
            <div class="view-container">
                <div class="card content-wrapper-narrow">
                    <h2>User Login</h2>
                    <login-form api="/auth/login" redirect="/app">
                        <label>
                            <span>Username:</span>
                            <input type="text" name="username" autocomplete="off"/>
                        </label>
                        <label>
                            <span>Password:</span>
                            <input type="password" name="password"/>
                        </label>
                    </login-form>
                </div>
                <p class="signup-link">
                    Or did you want to
                    <a href="/app/signup">Sign up as a new user</a>?
                </p>
            </div>
        `;
    }
}