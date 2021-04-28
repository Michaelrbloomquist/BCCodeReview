import React from 'react';

import DiffLine from './DiffLine';

export default class Content extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

      lineArray: [],
      lineComponent: [],
      diffText: 'The boy kicked the ball. \n The girl hit the ball. \n The dog chased the ball.',
      lineArrayLength: 0,
      commentIndex: 0,
      comment: 'this is a comment',
      showComment: false,
      isOpen: false

    };


    this.indexthis = this.indexthis.bind(this)

  }


  indexthis = async () => {
    try {
      this.setState({ lineArray: this.state.diffText.split(/\r?\n/) })
      this.setState({ lineArrayLength: this.state.lineArray.length })

      this.setState({
        lineComponent: this.state.lineComponent.concat(
          <div>{this.state.lineArray.map((line, index) => {
            return <div>
              <DiffLine

                lineText={line}
                lineIndex={index + 1}
                showComment={this.state.isOpen}>

              </DiffLine>
            </div>
          })}

          </div>
        )
      })

    } catch (err) {
      alert(err)
    }
  }

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleSubmit(evt) {
    evt.preventDefault();
  }



  state = {
    editable: false
  }



  componentDidMount() {
    if (this.state.editable) this.contentContainer.focus();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.editable && this.state.editable) {
      this.contentContainer.focus();
    }
  }

  bubbleUpEditableSelectedRegion = (e) => {
    const arrowEvents = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];
    if (arrowEvents.includes(e.key) && e.shiftKey) {
      this.bubbleUpSelectedRegion(e);
    }
  }

  bubbleUpSelectedRegion = (e) => {
    const { setBtnsGroupPosition, showButtonsGroup } = this.props;

    const selection = window.getSelection();

    if (selection.toString()) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setBtnsGroupPosition(rect);
      showButtonsGroup();
    }
  }

  toggleEditMode = () => {
    this.setState({ editable: !this.state.editable });
  }

  render() {
    const editButtonStyles = {
      fontSize: '20px',
      border: 'none',
      background: 'transparent',
      position: 'fixed',
      left: '75%' // <= 100% - App.style.paddingRight(25%)
    }

    const contentSectionStyles = {
      textAlign: 'justify',
      background: '#fff',
      padding: '20px'
    }

    return (
      <div>
        <button style={editButtonStyles} onClick={this.toggleEditMode}>
          &#x270D;{` edit mode${this.state.editable ? ' on' : ' off'}`}
        </button>

        <section
          ref={(elm) => { this.contentContainer = elm; }}
          contentEditable={this.state.editable}
          style={contentSectionStyles}
          onMouseUp={this.bubbleUpSelectedRegion}
          onMouseMove={this.bubbleUpSelectedRegion}
          onKeyUp={this.bubbleUpEditableSelectedRegion}
        >

          <div>

            <button onClick={this.toggleModal}>
              Create a new project
            </button>


            <p>{this.state.diffText}</p>

            <button onClick={this.indexthis}>return indexing</button>

            <p style={{ margin: 1 }}> Number of lines: {this.state.lineArray.length} </p>

            <div >
              {this.state.lineComponent}
            </div>

          </div>

        </section>
      </div>
    );
  }
}
