import React from 'react';

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
            </div>
        );

    }
}


export default ErrorBoundary