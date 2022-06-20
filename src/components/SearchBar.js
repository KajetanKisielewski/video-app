import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { generateURL, clearInputValue } from '../helpers/auxiliaryFunctions';

import '../styles/searchBar.css';

const SearchBar = ({ setUrl }) => {
    const [state, setState] = React.useState([]);

    const handleChange = (e) => {
        const { value } = e.target;
        setState(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = generateURL(state);
        setUrl(url);

        clearInputValue('.form__field--input');
    };

    return (
        <Form className="form" onSubmit={handleSubmit}>
            <FormGroup className="form__field">
                <Input
                    id="searchBar"
                    name="searchBar"
                    className="form__field--input"
                    placeholder="Please enter your link here"
                    type="text"
                    title="Please enter your link here"
                    value={state.value}
                    onChange={handleChange}
                    required
                />
                <Label for="searchBar" className="form__field--label">
                    Enter your link
                </Label>
            </FormGroup>
            <Button className="form__button">Submit</Button>
        </Form>
    );
};

export default SearchBar;
