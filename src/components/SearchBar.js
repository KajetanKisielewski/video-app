import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../styles/searchBar.css';

const SearchBar = () => {
    const [state, setState] = React.useState([]);

    console.log('state', state);

    const handleChange = (e) => {
        const { value } = e.target;
        setState(value);
    };

    const renderSearchForm = () => (
        <Form className="form">
            <FormGroup className="form__group">
                <Label for="searchBar" className="form__group--label">
                    Enter your link
                </Label>
                <Input
                    className="form__group--input"
                    id="searchBar"
                    name="searchBar"
                    placeholder="Please enter your link here"
                    type="text"
                    title="Please enter your link here"
                    value={state.value}
                    onChange={handleChange}
                    required
                />
            </FormGroup>
            <Button className="form__button">Submit</Button>
        </Form>
    );

    return <section className="main__search">{renderSearchForm()}</section>;
};

export default SearchBar;
