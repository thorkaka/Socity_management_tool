// import "./Dashbord.css";
// import "./Complain.css";

import slogo from "../images/shlogo.jpg";
import user from "../images/user.png";
import computer from "../images/dash.png";
import notic from "../images/notic.png";
import com from "../images/complain.png";
import photo from "../images/gallery.png";

import axios from "axios";
import { useState , useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";

function Complain() {
  const [member,setmember]=useState("");
  const navigate= useNavigate();
  axios.defaults.withCredentials=true;
  useEffect(() => {
    axios
      .get("http://localhost:5000/Dashbord")
      .then((res) => {
        if (res.data.valid) {
          
          setmember(res.data.member);
          
        }else{
          // alert("Login first..")
          navigate("/");
        }
        console.log("result", res);
      })
      .catch((err) => {
        console.log("error to featch", err);
      });
  });
  // const [val,setval]=useState("");
  const [addcomplain, setcomplain] = useState({
    user_id: '',
    com_heading: "",
    com_desc: "",
  });

  const handleInput = (event) => {
    setcomplain((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setcomplain(addcomplain.user_id=Number(addcomplain.user_id));
    console.log("data is", addcomplain);
    axios
      .post("http://localhost:5000/api/addcomplain", addcomplain)
      .then((res) => {
        alert("Complain Added Sucessfuly..");
        console.log("result", res);
      })
      .catch((err) => console.log("Eror to api", err));
    

    setcomplain({
      user_id: "",
      com_heading: "",
      com_desc: "",
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
              <h2 className="text-2xl  text-gray-400">{member}</h2>
            </center>
          </div>
          <div className="text-2xl  pt-20  ml-8  ">
            <div className="navi flex flex-col gap-8 text-white ">
              <Link to="/Dashbord" className="link act">
                <section className=" w-72 flex gap-4 ">
                  <img src={computer} alt="" />
                  <Link to="/Dashbord">Dashbord</Link>
                </section>
              </Link>
              <Link to="/Notic" className="link">
                <section className=" w-72 flex gap-4 ">
                  <img src={notic} alt="" />
                  <Link to="/Notic">Notic Board</Link>
                </section>
              </Link>
              <Link className="link">
                <section className=" w-72 flex gap-4 ">
                  <img src={com} alt="" />
                  <Link to="/Complain">Register Complain</Link>
                </section>
              </Link>
              <Link className="link">
                <section className=" w-72 flex gap-4 ">
                  <img src={photo} alt="" />
                  <Link to="/Photos">Photo Gallery</Link>
                </section>
              </Link>
            </div>
          </div>
        </div>

        <div className="">
          <h1 className="text-5xl p-6">Register Your Complain</h1>
          <div className="m-10  gap-10 flex flex-col  ">
            <form onSubmit={handleSubmit}>
              <input
                value={addcomplain.user_id}
                type="text"
                onChange={handleInput}
                name="user_id"
                placeholder="user id"
                className="p-5"
                required
              />
              <input
                value={addcomplain.com_heading}
                onChange={handleInput}
                name="com_heading"
                className="p-5"
                tupe="text"
                placeholder="Enter Compalain Heading"
                required
              />
              <textarea
                value={addcomplain.com_desc}
                placeholder="Enter Your Complain"
                className="comdesc  border-2 rounded-2xl border-solid border-slate-300 p-5 text-xl      
               w-10/12 h-48 ml-2 mb-6"
                name="com_desc"
                onChange={handleInput}
                required
              ></textarea>
              <button type="submit" className="btn-losi w-10/12">
                Register Complain
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complain;
