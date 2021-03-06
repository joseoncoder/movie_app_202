import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import './App.css';

// import PropTypes from 'prop-types';


class App extends React.Component {

  state = {
    isLoading: true,
    movies: []
  };

  getMovies = async () => {
    const {
       data: { 
         data: { movies }
       } 
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    
    this.setState({ movies, isLoading: false });

    // async - 비동기 함수 임을 알림
    // await - 완료해야 할 실행문 앞에 적어 표시
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({isLoading: false});
    // }, 6000);
    this.getMovies();
  }
  
  render() {
    const { isLoading, movies} = this.state;
    return (
      <section className = "container">
        {isLoading 
        ? (
          <div className="loader">
            <span className="loader__text">Loading ... </span>
          </div>
          )
        : (
          <div className="movies">
            {movies.map( movie => (
              <Movie 
                key = {movie.id}
                id = {movie.id}
                year = {movie.year}
                title = {movie.title}
                summary = {movie.summary}
                poster = {movie.medium_cover_image}
                genres = {movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default App;
