import React from "react";
import Container from "./Output.styled";

function Output({ currentValue }) {
    return (
        <Container id="display">
            {currentValue}
        </Container>
    );
}

export default Output;