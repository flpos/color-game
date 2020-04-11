import React from 'react'
import Color, { ColorProps } from './color';

export interface ColorContainerProps {
    colors: Array<ColorProps>,
    picked: ColorProps,
    onClick: (picked: ColorProps, current: ColorProps, index: number) => void
}

export default function ColorContainer({ colors, onClick, picked }: ColorContainerProps) {
    return (
        <>
            {colors.map((colorprop, index) => (
                <Color
                    color={colorprop.color}
                    onClick={() => onClick(picked, colorprop, index)}
                    clicked={colorprop.clicked}
                    key={index}
                />
            ))}
        </>
    )
}