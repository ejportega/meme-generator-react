import React, {Component} from 'react'

// import "./MemeGenerator.css"

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeIngs: []
        }
        // this.onMemeChange = this.onMemeChange.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            this.setState({                
                allMemeIngs: memes
            })
        })
        .catch(error => console.log(error))
    }
    
    onMemeChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]:value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const randomNumber = Math.floor(Math.random() * this.state.allMemeIngs.length)
        const img = this.state.allMemeIngs[randomNumber].url;
        this.setState({
            randomImg: img
        })
    }
    
    render() {
        return (
            <div className="meme-container">
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input
                        name="topText"
                        placeholder="Top text"
                        value={this.state.topText}
                        onChange={this.onMemeChange}
                    />
                    <input
                        name="bottomText"
                        placeholder="bottom text"
                        value={this.state.bottomText}
                        onChange={this.onMemeChange}
                    />
                    <button>Generate</button>
                </form>
                <div className="meme">
                    <img 
                        src={this.state.randomImg}
                        alt=""
                    />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator