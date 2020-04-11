import React from 'react';
import { ColorProps } from './components/color';
import './App.css'
import ColorContainer from './components/color-container';

interface appState {
  colors: Array<ColorProps>
  picked: ColorProps,
  pickedText: string,
  gameOver: boolean,
  quantity: number
}

class App extends React.Component {
  generateColors() {
    const newColors: Array<ColorProps> = []
    for (let i = 0; i < this.state.quantity; i++) {
      newColors.push({
        color: {
          red: this.random255(),
          blue: this.random255(),
          green: this.random255()
        },
        onClick: () => { },
        clicked: false
      })
    }
    const pick = Math.floor(Math.random() * newColors.length)
    const pickedText = `RGB(
      ${newColors[pick].color.red},
      ${newColors[pick].color.green},
      ${newColors[pick].color.blue}
    )`
    this.setState({
      colors: newColors,
      picked: newColors[pick],
      pickedText,
      gameOver: false
    })
    const body = document.querySelector('body')
    if (body) body.style.backgroundColor = '#373e4d'
  }
  random255 = () => Math.ceil(Math.random() * 155) + 100
  handleClick = (picked: ColorProps, current: ColorProps, index: number) => {
    const { colors } = this.state
    if (picked === current) {
      const newColors = this.state.colors.map(x => {x.clicked = true; return x})
      this.setState({
        gameOver: true,
        colors: newColors
      })
      const { red, green, blue } = picked.color
      const body = document.querySelector('body')
      if (body) body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
    }
    else {
      colors[index].clicked = true
      this.setState({ colors })
    }
  }
  state: appState = {
    colors: [],
    gameOver: false,
    picked: {
      color: {
        blue: 0,
        green: 0,
        red: 0
      },
      onClick: () => { },
      clicked: false
    },
    pickedText: '',
    quantity: 6
  }
  componentDidMount = () => {
    this.generateColors();
  }
  render = () => (
    <div className="App">
      <header className="App-header">
        Guess the color
        <h2>The color is: {this.state.pickedText}</h2>
      </header>
        <button onClick={() => this.generateColors()}>New Game</button>
        <h2 hidden={!this.state.gameOver}>Congratulations!</h2>
      <main className="App-main">
        <ColorContainer
          colors={this.state.colors}
          picked={this.state.picked}
          onClick={this.handleClick}
        />
      </main>
    </div>
  )
}

export default App;
