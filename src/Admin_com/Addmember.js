// import "./Dashbord.css";
// import "./Complain.css";

import slogo from "../images/shlogo.jpg";
import user from "../images/user.png";
import computer from "../images/dash.png";
import notic from "../images/notic.png";
import com from "../images/complain.png";
import photo from "../images/gallery.png";

import axios from "axios";
import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";

function Addmember() {
  const [mem,setmem]=useState("");
  const navigate= useNavigate();
  axios.defaults.withCredentials=true;
  useEffect(() => {
    axios
      .get("http://localhost:5000/Dashbord")
      .then((res) => {
        if (res.data.valid) {
          
          setmem(res.data.member);
          
        }else{
          // alert("Login first..")
          navigate("/Adminlogin");
        }
        console.log("result", res);
      })
      .catch((err) => {
        console.log("error to featch", err);
      });
  });
  const [addmember, setmember] = useState({
    user_id: "",
    user_name: "",
    user_mobile: "",
    user_email: "",
    user_passwordl: "",
  });

  const handlememeber = (event) => {
    setmember((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  const membersubmit = async (event) => {
    event.preventDefault();

    addmember.user_id = Number(addmember.user_id);
    // console.log('type is',typeof(addmember.user_id));
    // console.log("member data", addmember);
    axios
      .post("http://localhost:5000/api/addmember", addmember)
      .then((res) => {
        // console.log("member added");
        alert("Member added Sucessfully...",res);
      })
      .catch((err) => {
        console.log("fail to send data", err);
      });

    setmember({
      user_id: "",
      user_name: "",
      user_mobile: "",
      user_email: "",
      user_passwordl: "",
    });
  };
  return (
    <div>
      <div className="flex p-9  bg-gray-600 ">
        <img src={slogo} alt="img" className="h-20  w-20  rounded-3xl" />
        <div className="px-5 py-5  text-5xl ">
        <h1 className=" text-orange-500">
            SHIVAJI MAHARAJ <span className=" text-white">SOCIETY</span>
          </h1> 
        </div>
      </div>
      <div className="main  flex">
        <div className="flex flex-col bg-gray-800  w-80 h-dvh">
          <div id="img_nav">
            <center>
              <img src={user} className="h-40 mt-10" alt="" />
              <h2 className="text-2xl  text-gray-400">{mem} Admin</h2>
            </center>
          </div>
          <div className="text-2xl  pt-20  ml-8  ">
            <div className="navi flex flex-col gap-8 text-white ">
              <Link to="/Admindash" className="link act">
                <section className=" w-72 flex gap-4 ">
                  <img src={computer} alt="" />
                  <Link to="/Admindash">Manage Member</Link>
                </section>
              </Link>
              <Link to="/AdminNotic" className="link">
                <section className=" w-72 flex gap-4 ">
                  <img src={notic} alt="" />
                  <Link to="/AdminNotic">Add Notice</Link>
                </section>
              </Link>
              <Link className="link">
                <section className=" w-72 flex gap-4 ">
                  <img src={com} alt="" />
                  <Link to="/ViewComplain">View Complains</Link>
                </section>
              </Link>
              <Link className="link">
                <section className=" w-72 flex gap-4 ">
                  <img src={photo} alt="" />
                  <Link to="/Adminphots">Photo Gallery</Link>
                </section>
              </Link>
            </div>
          </div>
        </div>

        <div className="">
          <h1 className="text-5xl p-6">Add Member Details</h1>
          <div className="m-10">
            <form onSubmit={membersubmit}>
              <input
                type="number"
                name="user_id"
                value={addmember.user_id}
                onChange={handlememeber}
                placeholder="Enter User id"
              />
              <input
                type="text"
                name="user_name"
                value={addmember.user_name}
                onChange={handlememeber}
                placeholder="Enter User Name"
              />
              <input
                type="text"
                name="user_email"
                value={addmember.user_email}
                onChange={handlememeber}
                placeholder="Enter User email"
              />
              <input
                type="text"
                name="user_mobile"
                value={addmember.user_mobile}
                onChange={handlememeber}
                placeholder="Enter User mobileNo"
              />
              <input
                type="text"
                name="user_passwordl"
                value={addmember.user_passwordl}
                onChange={handlememeber}
                placeholder="Enter user Password"
              />
              <button className="btn-losi">Add Member</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addmember;
