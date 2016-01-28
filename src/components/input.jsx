var React = require('react');
var Formsy = require('formsy-react');

module.exports =  React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },
  render() {

    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    const className = 'form-group' + (this.props.className || ' ') +
      (this.showRequired() ? 'required' : this.showError() ? 'error' : '');

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.getErrorMessage();
    var label = (this.props.name == 'passCheck') ? <label htmlFor="passCheck"></label> : ''
    return (
      <div>
      <div className={className}>
        <input
          type={this.props.type || 'text'}
          name={this.props.name}
          className={this.props.className}
          onChange={this.changeValue}
          value={this.getValue()}
          placeholder = {this.props.placeholder}
          id={this.props.id}
          onClick = {this.props.onClick}
          checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
        />
        {label}
      </div>
      <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

