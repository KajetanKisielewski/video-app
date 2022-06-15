import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import '../styles/searchBar.css';

const SearchBar = ({ setUrl }) => {
    const [state, setState] = React.useState([]);

    const handleChange = (e) => {
        const { value } = e.target;
        setState(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const baseURL = `https://www.googleapis.com/youtube/v3/search`;
        const query = state;

        const url = `${baseURL}?q=v=${query}&key=${KEY}&part=snippet&type=video&maxResults=5`;

        console.log('seachurl', url);

        setUrl(url);
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
