import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

class App extends Component {
    state = {
        recipes: []
    };

    componentDidMount() {
        this.fetchRecipes();
    }

    fetchRecipes = () => {
        axios.get('http://localhost:3030/recipes')
            .then( resp => this.setState({ recipes: resp.data || [] }));
    };

    render() {
        const { recipes } = this.state;
        console.log(recipes);
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>
                        Recipes:
                    </h2>
                    <ul>
                        { recipes.length <= 0
                            ? <li>No Recipes Found</li>
                            : recipes.map(recipe => (
                                <li>{recipe.title}</li>
                            ))
                        }
                    </ul>
                </header>
            </div>
        );
    }
}

export default App;
