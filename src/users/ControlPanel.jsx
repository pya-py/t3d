import { Component } from "react";

class ControlPanel extends Component {
    onSignOutClick = () => {
        sessionStorage.clear();
    }
    render() {
        return (
            <div className="card border-success mb-3 signUpCard">
                <div className="card-header bg-transparent text-center border-success">
                    کنترل پنل
                </div>
                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-danger btn-block mt-4"
                        onClick={this.onSignOutClick} //temprory
                    >
                        خروج از حساب کاربری
                    </button>
                </div>
            </div>
        );
    }
}

export default ControlPanel;
