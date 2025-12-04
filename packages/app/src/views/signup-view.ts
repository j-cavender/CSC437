import {html, LitElement} from "lit";
import tokens from "../styles/tokens.css.js";
import commonStyles from "../styles/common.css.js";
import loginStyles from "../styles/login-view.css.js";

export class SignupViewElement extends LitElement {
    static styles = [tokens.styles, commonStyles.styles, loginStyles.styles];

    render() {
        return html`
            <div class="view-container">
                <div class="card content-wrapper-narrow">
                    <h2>Create Account</h2>
                    <signup-form api="/auth/register" redirect="/app">
                        <label>
                            <span>Username:</span>
                            <input type="text" name="username" autocomplete="off" required/>
                        </label>
                        <label>
                            <span>Password:</span>
                            <input type="password" name="password" required/>
                        </label>
                        <label>
                            <span>Confirm Password:</span>
                            <input type="password" name="confirmPassword" required/>
                        </label>
                    </signup-form>
                </div>
                <p class="signup-link">
                    Already have an account?
                    <a href="/app/login">Sign in</a>
                </p>
            </div>
        `;
    }
}