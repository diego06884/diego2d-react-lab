import React from "react";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
        userName: ''
        }
    }

    changeInput = (e) => {
        const usernameVal = e.target.value;
        this.setState((prevState) => {
        return {
        ...prevState,
            userName: usernameVal
        }
        })
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.doUpdateProfiles(this.state.userName);
        this.setState(()=> {return {userName: ''}})
    }

    render () {
        return (
        <div className = "col-md-6 col mx-auto">
            <h2>Insert Github Username:</h2>
            <form onSubmit={this.onFormSubmit}>
            <fieldset className="form-group">
                <label htmlFor="userId">Github userid:</label>
                <input value={this.state.userName} onChange={this.changeInput} className="form-control" name="userid" id="userid" type="text"/>
            </fieldset>
            <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
        );
    }
}

export default Form;