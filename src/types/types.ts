import { HTMLAttributes } from 'react';

export interface CSSPropertiesWithVars extends React.CSSProperties {
    [key: `--${string}`]: string | number;
}

export type HexColor = `#${string}`;
export type SpaceSize =
    | 0
    | 7
    | 15
    | 20
    | 25
    | 30
    | 35
    | 40
    | 45
    | 50
    | 60
    | 70
    | 80
    | 90
    | 100
    | 110
    | 120
    | 130
    | 150
    | 200;
export type FontSize =
    | 14
    | 15
    | 16
    | 17
    | 18
    | 20
    | 22
    | 24
    | 26
    | 28
    | 30
    | 32
    | 35
    | 38
    | 40
    | 46
    | 50
    | 56
    | 60
    | 64
    | 70
    | 100
    | 120;
export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type BoxSize =
    | 10
    | 15
    | 20
    | 25
    | 30
    | 35
    | 40
    | 45
    | 50
    | 55
    | 60
    | 65
    | 70
    | 75
    | 80
    | 85
    | 90
    | 95
    | 100
    | 105
    | 110
    | 115
    | 120
    | 125
    | 130
    | 135
    | 140
    | 145
    | 150
    | 175
    | 200
    | 250
    | 300
    | 350
    | 400
    | 500;

export type ContentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
    paddingY?: SpaceSize;
    paddingX?: SpaceSize;
    backgroundColor?: HexColor;
    color?: HexColor;
    full?: boolean;
    variant?: 'contained' | 'outlined';
};

export type InputProps = HTMLAttributes<HTMLInputElement> & {
    paddingY?: SpaceSize;
    paddingX?: SpaceSize;
    backgroundColor?: HexColor;
    color?: HexColor;
    variant?: 'contained' | 'outlined';
    full?: boolean;
};
