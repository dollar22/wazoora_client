
import Base from "../core/Base";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { API } from "./backend";
export const NewPassword =() =>{



    const [values, setValues] = useState({
        newpass: "",
        newpasscon:"",
        error: "",
        loading: false,
        didRedirect: false,
      });
     const history = useHistory();
      const { newpasscon, newpass,oldpass, error, loading, didRedirect } = values;
    //   const { user } = isAutheticated();
    
      const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };
      // const not
    const signInForm = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <form>
                <div className="form-group">
                  <label className="text-light">New Password</label>
                  <input
                    onChange={handleChange("newpass")}
                    value={newpass}
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="text-light">New Password Confirm</label>
                  <input
                    onChange={handleChange("newpasscon")}
                    value={newpasscon}
                    className="form-control"
                    type="text"
                  />
                </div>
                <button onClick={onSubmit} className="btn btn-success btn-block">
                  Submit
                </button>
              </form>
            </div>
          </div>
        );
      };
      const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });

       console.log(JSON.parse(localStorage.getItem('email')))

      let formdata ={
        email:JSON.stringify('email'),
        pass:values.newpasscon
      }
      console.log(formdata)

        fetch(`${API}/newpass`, {
          method: "POST",
          body: JSON.stringify(formdata),
           
          // Adding headers to the request
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      }).then(response =>response.json().then((json)=>{
         if(json.status === 200 ){
          
        history.push('/signin')
         }

      })
      )
   
      };
  return (
  <Base title="Reset Password" description="User Reset Password">
    {signInForm()}
  </Base>
 

  ) ;

}