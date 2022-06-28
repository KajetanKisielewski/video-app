import React from 'react';

import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import VideoContext from '../../context/VideoContext';
import { clearInputValue } from '../../helpers/auxiliaryFunctions';

import './searchBar.css';

const SearchBar = () => {
    const [state, setState] = React.useState([]);

    const videoContext = React.useContext(VideoContext);

    const handleChange = (e) => {
        const { value } = e.target;
        setState(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        videoContext.setUrl([state]);

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
