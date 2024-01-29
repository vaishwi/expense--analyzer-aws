import React from "react";

const SignUp = () =>{

    
    const onSubmit = (event) =>{
        event.preventDefault();
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Email</label>
                <input value={email}
                    />
            </form>
        </div>
    )
}

export default SignUp
