import React, { Component } from 'react';
import Table from './Table';

export default class Home extends Component {
    state = {
        react: [],
        angular: [],
        ember: [],
        vue: [],
    }
    setStateReact(data){
        this.setState({ react: data })
    }
    setStateAngular(data){
        this.setState({ angular: data })
    }
    setStateEmber(data){
        this.setState({ ember: data })
    }
    setStateVue(data){
        this.setState({ vue: data })
    }
    
    componentDidMount(){
        this.interval = setInterval(() => this.getFrameworks(), 1000)
    }
    componentWillUnmount(){
        clearInterval(this.timerID)
    }
    getFrameworks(){
        this.getFramework('https://api.github.com/repos/facebook/react', 'react')
        this.getFramework("https://api.github.com/repos/angular/angular.js", 'angular')
        this.getFramework("https://api.github.com/repos/emberjs/ember.js", 'ember')
        this.getFramework('https://api.github.com/repos/vuejs/vue', 'vue')
    }
    getFramework(url, name){
        fetch(url)
          .then(response => response.json())
          .then(data => {
            if(name === 'react'){
              this.setStateReact(data)
            }else if(name === 'angular'){
              this.setStateAngular(data)
            }else if(name === 'ember'){
              this.setStateEmber(data)
            }else{
              this.setStateVue(data)
            }
          })
          .catch(error => console.log(error))
    }
    render() {
        const { react, angular, ember, vue } = this.state
        const frameworks = [react, angular, ember, vue]               
        return(
            <div>
                <h1>Home</h1>
                <Table frameworkData={frameworks} />
                <h1>Home</h1>
            </div>
        )
    }
}