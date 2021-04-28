import React from 'react';
import PropTypes from 'prop-types';
import CommentBox from './CommentBox1';

class DiffLine extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showComment: false,
            lineArray: [],
            lineIndex: '',
            lineText: ''
        };
    }

    open = () => {
        this.setState({ showComment: true });
    };

    close() {
        this.setState({ showComment: false })
    }

    render() {

        if (this.state.showComment) {
            return (<div>
                <button onClick={(e) => this.close()}> {this.props.lineIndex}</button>
                {this.props.lineText}
                <CommentBox />

            </div>
            );
        } else {
            return (<div>
                <button onClick={this.open}> {this.props.lineIndex}</button>
                {this.props.lineText}

            </div>
            )
        }

    }
}

DiffLine.propTypes = {
    onClose: PropTypes.func,
    showComment: PropTypes.bool,
    children: PropTypes.node,
    diffText: PropTypes.string,
    lineText: PropTypes.string
};

export default DiffLine;