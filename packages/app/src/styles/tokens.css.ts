import {css} from "lit";

const styles = css`
    @import url('https://fonts.googleapis.com/css2?family=Hammersmith+One&family=Instrument+Serif:ital@0;1&family=Mouse+Memoirs&family=Oswald:wght@200..700&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Viaoda+Libre&display=swap');

    :host {
        --font-family-serif: "Hammersmith One", Oswald, "Roboto Condensed", "Mouse Memoirs", Cambria, Georgia, serif;
        --font-family-sans-serif: "Instrument Serif", "Viaoda Libre", Calibri, Arial, sans-serif;

        --space-xs: 0.25rem;
        --space-sm: 0.5rem;
        --space-md: 1rem;
        --space-lg: 1.5rem;
        --space-xl: 2rem;
        --space-2xl: 3rem;
        --space-3xl: 4rem;

        --radius-sm: 4px;
        --radius-md: 8px;
        --radius-lg: 16px;
        --radius-full: 9999px;

        --transition-fast: 150ms ease;
        --transition-base: 300ms ease;
        --transition-slow: 500ms ease;
    }
`;

export default {styles};
