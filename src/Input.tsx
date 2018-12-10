import React from 'react';

class Input extends React.Component<{onSend: any, onType: any}, {input: string }> {
  static defaultProps: any;
  constructor(props: any) {
    super(props);
    this.state = { input: '' };

    this.submitHandler = this.submitHandler.bind(this);
    this.textHandler = this.textHandler.bind(this);
  }
  
  submitHandler(event: any) {
    event.preventDefault();

    this.setState({ input: '' });
    this.props.onSend(this.state.input);
  }

  textHandler(event: any)  {
    this.props.onType();
    this.setState({ input: event.target.value });
  }

  render() {
    return (
      <form className="input" onSubmit={this.submitHandler}>
        <input type="text"
          onChange={this.textHandler}
          value={this.state.input}
          placeholder="Message..."
          required />
      </form>
    );
  }
}

Input.defaultProps = {
};

export default Input;