import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { getAllCharacters } from '../redux/actions'
import Loader from 'react-loader-spinner'
import SearchField from 'react-search-field'

export class App extends Component {
    constructor(props) {
        super(props)
        this.state = { filteredCharacters: [], character: {}, value: "" }
        this.getCharacterInfo = this.getCharacterInfo.bind(this)
        this.searchName = this.searchName.bind(this)
    }

    componentDidMount() {
        axios.get('https://www.anapioficeandfire.com/api/characters')
            .then(response => {
                this.props.displayAllCharacters(response.data)
                this.setState({ filteredCharacters: response.data })
            })
    }

    getCharacterInfo = url => {
        axios.get(url)
            .then(response => {
                this.setState({ character: response.data })
                console.log(response.data)
            })
    }

    searchName = value => {
        let filteredCharacters = []
        this.props.characters.forEach(character => {
            if (character.name.toLowerCase().includes(value.toLowerCase())) filteredCharacters.push(character)
        })
        this.setState({ filteredCharacters: filteredCharacters })
        console.log(filteredCharacters)
    }

    render() {
        const characters = this.props.characters
        return (
            <>
                <Loader
                    visible={!characters.length}
                    type="ThreeDots"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
                {
                    characters.length > 0 ? <SearchField
                        placeholder="Search..."
                        onSearchClick={this.searchName}
                        onChange={this.searchName}
                    /> : null
                }
                <ol>
                    {this.state.filteredCharacters.map(character => (
                        <li key={character.url}><u onClick={() => this.getCharacterInfo(character.url)}>{character.name}</u>
                            <button>
                                Bookmark it
                            </button></li>
                    ))}

                </ol>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    characters: state.characters
})

const mapDispatchToProps = (dispatch) => {
    return {
        displayAllCharacters: payload => dispatch(getAllCharacters(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
