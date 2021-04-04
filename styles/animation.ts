import { keyframes } from "styled-components";

export const fadeIn = keyframes`
    0%{
        background-color: transparent;
    }
    100%{
        background-color: rgba(0, 0, 0, 0.5);
    }
`;

export const fadeOut = keyframes`
    0%{
        background-color: rgba(0, 0, 0, 0.5);
    }
    100%{
        background-color: transparent;
    }
`;

export const show = keyframes`
    0%{
        opacity: 0;
        transform: scale(0.5);
    }
    100%{
        opacity: 1;
    }
`;

export const hide = keyframes`
    0%{
        opacity: 1;
    }
    100%{
        opacity: 0;
        transform: scale(0.5);
    }
`;

export const slideUp = keyframes`
    0%{
        opacity: 0.5;
        transform: translateY(1000px);
    }
    100%{
        opacity: 1;
        transform: translateY(0px)
    }
`;

export const slideDown = keyframes`
    0%{
        opacity: 1;
        transform: translateY(0px)
    }
    100%{
        opacity: 0.5;
        transform: translateY(1000px);
    }
`;
