import React from 'react';
import Container from './Calculator.styled';
import Buttons from '../Buttons/Buttons';
import Output from '../Output/Output';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: '0',
      prevVal: '0',
      formula: ''
    };
    this.initialize = this.initialize.bind(this);
    this.responseErrorMaxLimit = this.responseErrorMaxLimit.bind(this);
    this.handleLogicOperators = this.handleLogicOperators.bind(this);
    this.handleLogicOutput = this.handleLogicOutput.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleDecimalNumbers = this.handleDecimalNumbers.bind(this);
  }

  initialize() {
    this.setState({
      currentVal: '0',
      prevVal: '0',
      formula: '',
      evaluated: false
    });
  }

  responseErrorMaxLimit() {
    this.setState({
      currentVal: 'Melebihi Batas Limit',
      prevVal: this.state.currentVal
    });
  }

  handleLogicOperators(e) {
    if (!this.state.currentVal.includes('Melebihi Batas Limit')) {
      const value = e.target.value;
      const { formula, prevVal, evaluated } = this.state;
      this.setState({ currentVal: value, evaluated: false });
      if (evaluated) {
        this.setState({ formula: prevVal + value });
      } else if (!/[x+‑/]$/.test(formula)) {
        this.setState({
          prevVal: formula,
          formula: formula + value
        });
      } 
      else if (!/\d[x/+‑]{1}‑$/.test(formula)) {
        this.setState({
          formula:
            (/\d[x/+‑]{1}‑$/.test(formula + value) ? formula : prevVal) +
            value
        });
      } 
      else if (value !== '‑') {
        this.setState({
          formula: prevVal + value
        });
      }
    }
  }

  handleLogicOutput() {
    if (!this.state.currentVal.includes('Melebihi Batas Limit')) {
      let expression = this.state.formula;
      while (/[x+‑/]$/.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression
        .replace(/‑/g, '-')
        .replace(/x/g, '*')
      let answer = Math.round(100000 * eval(expression)) / 100000;
      this.setState({
        currentVal: answer.toString(),
        formula: expression + '=' + answer,
        prevVal: answer,
        evaluated: true
      });
    }
  }

  handleNumbers(e) {
    if (!this.state.currentVal.includes('Melebihi Batas Limit')) {
      const { currentVal, formula, evaluated } = this.state;
      const value = e.target.value;
      this.setState({ evaluated: false });
      if (currentVal.length > 21) {
        this.responseErrorMaxLimit();
      } else if (evaluated) {
        this.setState({
          currentVal: value,
          formula: value !== '0' ? value : ''
        });
      } 
      else {
        this.setState({
          currentVal:
            currentVal === '0' || /[x/+‑]/.test(currentVal)
              ? value
              : currentVal + value,
          formula:
            currentVal === '0' && value === '0'
              ? formula === ''
                ? value
                : formula
              : /([^.0-9]0|^0)$/.test(formula)
                ? formula.slice(0, -1) + value
                : formula + value
        });
      }
    }
  }

  handleDecimalNumbers() {
    if (this.state.evaluated === true) {
      this.setState({
        currentVal: '0.',
        formula: '0.',
        evaluated: false
      });
    } else if (
      !this.state.currentVal.includes('.') &&
      !this.state.currentVal.includes('Melebihi Batas Limit')
    ) {
      this.setState({ evaluated: false });
      if (this.state.currentVal.length > 21) {
        this.responseErrorMaxLimit();
      } else {
        this.setState({
          currentVal: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + '.',
          formula: this.state.formula + '.'
        });
      }
    }
  }

  render() {
    return (
      <Container>
        <Output currentValue={this.state.currentVal} />
        <Buttons
          initialize={this.initialize}
          operators={this.handleLogicOperators}
          output={this.handleLogicOutput}
          numbers={this.handleNumbers}
          decimal={this.handleDecimalNumbers}
        />
      </Container>
    );
  }
}

export default Calculator;