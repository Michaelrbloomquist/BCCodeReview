import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import logo from "./GitGoing.jpeg";

class Comment1 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            lineArray: [],
            diffText: 'The boy kicked the ball. \n The girl hit the ball. \n The dog chased the ball.',
            lineArrayLength: 0,
            indexPad: '',
            commentIndex: 0,
            showText: false,
            comment: 'this is a comment'
        };
        this.indexthis = this.indexthis.bind(this)
    }

    indexthis() {
        try {
            this.setState({ lineArray: this.state.diffText.split(/\r?\n/) })
            this.setState({ lineArrayLength: this.state.lineArray.length })

        } catch (err) {
            alert(err)
        }
    }

    handleClick = () => {
        console.log('Click happened');
        this.setState((state) => ({
            showText: !state.showText  //  Toggle showText
        }))
    }

    render() {

        const commentStyle = {
            whitespace: 'pre-wrap',
            backgroundColor: '#fff',
            maxWidth: 500,
            minHeight: 100,
            padding: 10,
            borderStyle: 'solid',
            marginBottom: 20
        };

        return (


            <div>
                <div className="pill-nav">
                    <img src={logo} alt="avatar2" className="avatar2" />
                    <a href="/Home">Home</a>
                    <a href="/Me">My Profile</a>
                    <a href="/Projects">My Projects</a>
                </div>
                <p>{this.state.diffText}</p>
                <button onClick={this.indexthis}>return indexing</button>
                <p style={{ margin: 1 }}> Number of lines: {this.state.lineArray.length} </p>


                <div>
                    {this.state.lineArray.map((line, index) => {
                        return <div style={{ display: 'flex', columnGap: 20, margin: 1 }}>
                            <button onClick={this.handleClick} style={{ margin: 1 }}> {index + 1}</button>
                            {(() => {
                                if (this.state.showText) {
                                    return <div style={{ display: 'flex', columnGap: 20, margin: 1 }}>

                                        <p style={{ margin: 1 }}>{line}</p>
                                        {"\n"}
                                        <p style={commentStyle}> this will be a comment box </p>
                                    </div>

                                }
                                else {
                                    return <div style={{ display: 'flex', columnGap: 20, margin: 1 }}>
                                        <p style={{ margin: 1 }}>{line}</p>
                                    </div>

                                }
                            })()}





                        </div>
                    })}
                </div>
            </div>
        );
    }
}

Comment1.propTypes = {
    onClose: PropTypes.func,
    show: PropTypes.bool,
    children: PropTypes.node,
    diffText: PropTypes.string
};

export default Comment1;