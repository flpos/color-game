import React from 'react'

export interface ColorProps {
    color: {
        red: number
        green: number
        blue: number
    },
    onClick: () => void,
    clicked: Boolean
}

export default function Color(props: ColorProps) {
    const { red, green, blue } = props.color
    const rgb = `rgb(${red}, ${green}, ${blue})`
    return (
        <div
            className='color-block'
            style={{
                backgroundColor: props.clicked ? '#0000' : rgb,
            }}
            onClick={props.onClick}
        ></div>
    )
}