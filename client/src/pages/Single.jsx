import React, { useState, useEffect} from 'react';
import Edit from '../images/edit.png';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import Menu from '../components/Menu.jsx';
import axios from 'axios';
import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Delete from '../images/delete.png'

const Single = () => {
  const [post, setPost] = useState({});
  const url = "http://localhost:5000/api/";

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split('/')[2];

  const {currentUser} = useContext(AuthContext);


  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await axios.get(`${url}posts/${postId}`);
        setPost(res.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, [postId]);

  const handleDelete = async() => {
    try {
        await axios.delete(`${url}posts/${postId}`);
        navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='single'>
        <div className="content">
          <img 
            src={post?.img} 
            alt="" />
          <div className="user">
            {post.userImg && <img 
              src={post.userImg} 
              alt="" />}
            <div className="info">
              <span>{post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser.username === post.username &&
            <div className="edit">
              <Link to={'/write?edit=2'}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
            }
          </div>
          <h1>{post.title}</h1>
          <p>
            {post.desc}
          </p>
        </div>
       <Menu cat={post.cat}/>
    </div>
  )
}

export default Single
