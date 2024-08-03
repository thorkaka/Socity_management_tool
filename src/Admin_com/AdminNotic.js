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

function AdminNotic() {
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
  const [addnotice, setnotice] = useState({
    notice_heading: "",
    notice_type: "",
    notice_date: "",
    notice_message: "",
  });

  const handlenotice = (event) => {
    setnotice((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log("data is", addnotice);
    // console.log('date',typeof(addnotice.notice_date));

    axios
      .post("http://localhost:5000/api/addnotice", addnotice)
      .then((res) => {
        alert("Notice Added Sucessfuly..");
        console.log("result", res);
      })
      .catch((err) => console.log("Error to api", err));
    

    setnotice({
      notice_heading: "",
      notice_type: "",
      notice_date: "",
      notice_message: "",
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
              <Link to="/AdminDash" className="link act">
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
          <h1 className="text-5xl p-6">Add Notice</h1>
          <div className="m-10  gap-10 flex flex-col  ">
            <form onSubmit={handleSubmit}>
              <input
                className="p-5"
                onChange={handlenotice}
                value={addnotice.notice_heading}
                name="notice_heading"
                tupe="text"
                placeholder="Enter Notice Heading"
                required
              />
              <input
                type="text"
                placeholder="Notice Type"
                onChange={handlenotice}
                value={addnotice.notice_type}
                name="notice_type"
                className="p-5"
                required
              />
              <input
                type="date"
                onChange={handlenotice}
                value={addnotice.notice_date}
                name="notice_date"
                required
              />
              <textarea
                placeholder="Enter Message"
                className="comdesc  border-2 rounded-2xl border-solid border-slate-300 p-5 text-xl      
               w-10/12 h-48 ml-2 mb-6"
                onChange={handlenotice}
                value={addnotice.notice_message}
                name="notice_message"
                required
              ></textarea>
              <button type="submit" className="btn-losi w-10/12">
                Add Notice
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNotic;
