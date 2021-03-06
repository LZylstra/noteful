import React from 'react';
import './ErrorBoundary.css'

class ErrorBoundary extends React.Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError(error){
        return{
            hasError: true
        }
    }

    render(){
        if (this.state.hasError === false){
            return this.props.children
        }

        return(
            <div>
                <p className = "error">An error has occured, please reload the page.</p>
            </div>
        );

    }
}


export default ErrorBoundary