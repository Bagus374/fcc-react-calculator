import React from "react";
import Button from "./Buttons.styled";
import theme from "../../utils/constants/theme";

function Buttons({ initialize, operators, numbers, output, decimal }) {
    return (
        <>
            <Button
                className={theme.sizesButton}
                id="clear"
                onClick={initialize}
                style={theme.clearStyle}
                value="AC"
            >
                AC
            </Button>
            <Button
                id="divide"
                onClick={operators}
                style={theme.operatorStyle}
                value="/"
            >
                /
            </Button>
            <Button
                id="multiply"
                onClick={operators}
                style={theme.operatorStyle}
                value="x"
            >
                x
            </Button>
            <Button id="seven" onClick={numbers} value="7">
                7
            </Button>
            <Button id="eight" onClick={numbers} value="8">
                8
            </Button>
            <Button id="nine" onClick={numbers} value="9">
                9
            </Button>
            <Button
                id="subtract"
                onClick={operators}
                style={theme.operatorStyle}
                value="‑"
            >
                -
            </Button>
            <Button id="four" onClick={numbers} value="4">
                4
            </Button>
            <Button id="five" onClick={numbers} value="5">
                5
            </Button>
            <Button id="six" onClick={numbers} value="6">
                6
            </Button>
            <Button
                id="add"
                onClick={operators}
                style={theme.operatorStyle}
                value="+"
            >
                +
            </Button>
            <Button id="one" onClick={numbers} value="1">
                1
            </Button>
            <Button id="two" onClick={numbers} value="2">
                2
            </Button>
            <Button id="three" onClick={numbers} value="3">
                3
            </Button>
            <Button
                style={theme.sizesButton}
                id="zero"
                onClick={numbers}
                value="0"
            >
                0
            </Button>
            <Button id="decimal" onClick={decimal} value=".">
                .
            </Button>
            <Button
                id="equals"
                onClick={output}
                style={theme.equalsStyle}
                value="="
            >
                =
            </Button>
        </>
    );
}

export default Buttons;