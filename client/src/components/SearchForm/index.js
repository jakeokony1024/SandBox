import React from "react";
import "./style.css";
import Button from "components/CustomButtons/Button.js";

const SearchForm = props => {
    return (
        <form>
            <div className="form-group">
                <label 
                className="gameSearchLabel"
                style={{
                    textAlign: "center"
                }}
                ><h3>Search For Game</h3></label>
                <br></br>
                <input className="col-10 form-control"
                    value={props.search}
                    type="text"
                    name="searchGame"
                    placeholder="Enter Game"
                    onChange={props.handleInputChange}
                />
            </div>
            <Button type="submit" className="submitBtn btn btn-primary" onClick={props.handleFormSubmit}>
                Submit
            </Button>
        </form>
    )
}

export default SearchForm