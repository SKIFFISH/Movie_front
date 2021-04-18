import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import './style.less'
import {ImSearch} from 'react-icons/im'
import {RiVipCrownFill} from 'react-icons/ri'
import {BiTime} from 'react-icons/bi'
import {AiOutlineVideoCamera} from 'react-icons/ai'
import {FaDownload} from 'react-icons/fa'
import {IoIosArrowDropdown} from 'react-icons/io'
import {deepOrange,deepPurple} from '@material-ui/core/colors'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {useState} from 'react'
import {withRouter} from 'react-router-dom'
import imgURL from '../navbar/icon.png';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  }));

function Navbar(props){

    const [value,setValue] = useState('');
    const [jsonData,setJsondata] = useState([]);
    const classes = useStyles()
    const ChangeHandle = (e) =>{
        
        setValue(e.target.value)
        console.log(props)
    }

    const ClearSearch = () =>{
        setValue('');
        document.querySelectorAll('input')[0].value =''
    }

    const clickHandler =(e)=>{
        axios.post('http://42.192.235.217:8000/api/search',{
            content:value
            },{
            }).then(res =>{
                console.log(typeof(res.data))
                let data = JSON.stringify(res.data)
                //setJsondata(JSON.stringify(res.data))
                //console.log(data)
                //console.log(typeof(data))
                props.history.push({pathname:'/result',query:data})
                
            }).catch(err=>{
                console.log(err)
            })
    }


        return(
            <div className='navbar-container'>
                <div className='flex-box'>
                    <NavLink exact to='/home' >
                    <img src={imgURL}  className='Logo' alt='Netflex' />
                    </NavLink>
                    <NavLink exact to='/home' className='link' onClick={ClearSearch}>
                    Home
                    </NavLink>
                    <NavLink to = '/comedy' className='link' onClick={ClearSearch}>
                    <span> Category </span>
                    </NavLink>
                   

                    <div className='nav-input'>
                        <ImSearch className='icon-search' onClick={clickHandler}/>
                        <input type='text' placeholder='Search what you interest in' className='search' onChange ={ChangeHandle} />
                    </div>
                    <NavLink to ='/vip' className='link-vip'>
                    <RiVipCrownFill className='icon-vip' />
                    </NavLink>
                    
                    <BiTime className='icon-time' />
                    <AiOutlineVideoCamera className='icon-camera' />
                    <FaDownload className='icon-download' />
                    <div>
                    <Avatar className={classes.orange}>LY</Avatar>
                        
                    </div>
                    <IoIosArrowDropdown className='dropdown' />
                </div>        
            </div>
        )
    }
export default React.memo(Navbar);