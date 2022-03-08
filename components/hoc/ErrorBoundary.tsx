
import { Component, ErrorInfo, ReactNode } from 'react';


interface State {
    error: Error |null
    errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<null, State> {

    state = {
      error: null,
      errorInfo: null,
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({
            error,
            errorInfo,
        })
    }

    render(): ReactNode {

        const { error, errorInfo } = this.state

        if (error) {
            return (
                <>Error</>
            )
        }

        return this.props.children
    }
}