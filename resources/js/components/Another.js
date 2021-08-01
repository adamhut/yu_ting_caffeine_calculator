import React from 'react';
import ReactDOM from 'react-dom';

function Another(props) {
    return (
        <div className="container text-white" >
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">I'm an example component! {props.count} ----{props.title}</div>

                        <ul>
                            {
                                props.users && JSON.parse(props.users).map(user => {

                                    return (
                                        <li key={ user.id }>{ user.name }</li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Another;

if (document.getElementById('another')) {

    const another = document.getElementById('another');

    console.log(another.dataset);

    const props = Object.assign({},another.dataset);

    console.log(props);

    console.log(JSON.parse(props.users));

    ReactDOM.render(<Another {...props}/>, document.getElementById('another'));
}
