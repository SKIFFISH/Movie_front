import React from 'react'
import Navbar from '../../components/navbar'
import axios from 'axios'
import './style.less'
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'
import {Button,Input,DatePicker,Carousel, Result, Space} from 'antd'
import {ImSearch} from 'react-icons/im'
import {MdKeyboardVoice} from 'react-icons/md'
import Bigboard from '../../components/Bigboard'
import {useState} from 'react-router'
import Results from '../Result/index'
import 'fontsource-roboto'
import { FormControlLabel, Switch } from '@material-ui/core'
import moment from 'moment'
import {Checkbox} from 'antd'
import fetchJsonp from 'fetch-jsonp'

const cookies = new Cookies();


export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            csrf:'',
            value:'',
            jsonData:'',
            checked:false,
            switchlabel:'Advanced Search',
            startdate : '1960-01-01',
            enddate:'2022-01-01',
            listitem: [],
            li_index:0,
            inputVal: '',
            checkbox:0
        }
    }
    

    componentDidMount(){
        
    }

    KeydownHandler = (e) =>{
        const keyCode = e.keyCode || e.which;
        if(keyCode == "13"){
            //console.log(this.state.value)
        axios.post('http://42.192.235.217:8000/api/search',{
            content:this.state.value,
            startdate:this.state.startdate,
            enddate:this.state.enddate,
            searchType: this.state.checkbox
            },{
                headers:{
                    'X-CSRFtoken': this.state.csrf
                }
            }).then(res =>{
                //console.log(typeof(res.data))
                //let data = JSON.stringify(res.data)
                this.setState({
                    jsonData:JSON.stringify(res.data)
                })
                //console.log(this.state.jsonData)
                //console.log(typeof(data))
                this.props.history.push({pathname:'/result',query:this.state.jsonData})
                
            }).catch(err=>{
                console.log(err)
            })
        }
    }

    ClickHandler = (e) =>{
        axios.post('http://42.192.235.217:8000/api/search',{
            content:this.state.value,
            startdate:this.state.startdate,
            enddate:this.state.enddate,
            searchType:this.state.checkbox
            },{
                headers:{
                    'X-CSRFtoken': this.state.csrf
                }
            }).then(res =>{
                console.log(typeof(res.data))
                //let data = JSON.stringify(res.data)
                this.setState({
                    jsonData:JSON.stringify(res.data)
                })
                //console.log(this.state.jsonData)
                //console.log(typeof(data))
                this.props.history.push({pathname:'/result',query:this.state.jsonData})
                
            }).catch(err=>{
                console.log(err)
            })
    }

    ChangeHandler = (e) =>{
        this.setState({
            value: e.target.value
        })
       
    }

    InputHandler = (e) =>{

        let val=this.myInput.value;
    
        let tempArray = this.state.listitem
        let baseUrl = 'http://suggestion.baidu.com/su?wd=#content#&cb=window.baidu.sug'
        let content = val
        let Url = baseUrl.replace('#content#',content)
        var ul_menu = document.getElementById("menu-list");
        ul_menu.style.display='block'
        window.baidu = {
            sug : function(json){
                console.log(json.s)    
                var selectList = document.getElementsByClassName("selectItem")
                tempArray=[]
                for (let index=0;index < json.s.length;index++) {
                    tempArray.push(json.s[index])     
                }     
                this.setState({
                    listitem: tempArray
                })
            }.bind(this)
        }

       // console.log(tempArray);
        var script = document.createElement('script')
        script.src = Url
        var s=document.getElementsByTagName('head')[0].appendChild(script)
    }
    
    InputGoogleHandler = (e) =>{
        let val=this.myInput.value;
        var api = 'http://suggestqueries.google.com/complete/search?&client=youtube&hl=en&q='+val+'&gl=uk';
        var ul_menu = document.getElementById("menu-list");
        ul_menu.style.display='block'
        fetchJsonp(api)
            .then(function (response) {
                return response.json()
        }).then((json) => {
            let tempArray=[];
            tempArray.push(json[0])   
            for (let j=0;j<7;j++){
                tempArray.push(json[1][j][0])
            }  
            this.setState({
                listitem: tempArray
            })
      }).catch(function (ex) {
      })
      
    }
    voiceClickHandler = () =>{
        var ul_menu = document.getElementById("menu-list");
        ul_menu.style.display='none'
        var _this = this;
        if (!('webkitSpeechRecognition' in window)) {
            return;}
        var recognition=new window.webkitSpeechRecognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        
        recognition.onresult = function(event) {
            var speech_text= event.results[event.results.length - 1][0].transcript;
            speech_text = speech_text.toLowerCase();   
            var inputEls = document.getElementsByClassName('search_input');
            inputEls.value=speech_text;
            _this.setState({
                value: speech_text
            });
            console.log(speech_text); 
            
        }
        recognition.start();

    }

    switchChangeHandler =(e)=>{
        if(this.state.checked===false){
            this.setState({
                checked:true
            })
        }
        else{
            this.setState({
                checked:false
            })
            
        }
        
    }

    FromdatechangeHandler =(e,datastring) =>{
            this.setState({
                startdate:datastring
            })
            
        
    } 
    EnddatachangeHandler = (e,datastring) =>{
            this.setState({
                enddate:datastring
            })
        
    }
    Fromdataokhandler = (e)=>{
        //console.log(e)
    }
    checkboxChangeHandler = (e) =>{
        let checkstate = Number(e.target.checked)
        this.setState({
            checkbox:checkstate
        })

    }
    getClickIndex = (e) => {
       
        var _this = this;
        var list=this.state.listitem
        var ul_menu = document.getElementById("menu-list");
        var li_list = ul_menu.getElementsByTagName("li");
        
        for( var i = 0, len = li_list.length; i < len; i ++ ){
            li_list[i].index = i;
            li_list[i].onclick = function() {
                _this.setState({
                    li_index: this.index,
                    value: list[this.index]
                });
                console.log(list[this.index]);
            }
        }
        ul_menu.style.display='none'
    }

    NotFocus = (e) => {
        var ul_menu = document.getElementById("menu-list");
        ul_menu.style.display='none'
    }

    render(){
        //const [csrf,setCsrf] = useState("");
        console.log(this.state.enddate)
        let showOrnot = {
            display : this.state.checked ? 'flex' : 'none'
        }
        const {Search} = Input;
        var value = this.state.value;
        const result = {
            pathname:'/result',
            query:this.state.jsonData
        }
        const dateFormat = 'YYYY-MM-DD'
        console.log(this.state.checkbox)
        return(
            <div>
                <Navbar history={this.props.history}/>
                <Bigboard />
                <div className='search_test'>
                    <div className='check_div'>
                    <Checkbox onChange={this.checkboxChangeHandler} className='checkbox'>Search For Overview</Checkbox>
                    </div>
                    <ImSearch className='imSearch' onClick={this.ClickHandler} />
                    <input type='text'
                    ref={(input)=>{this.myInput = input}}
                    className='search_input'
                    placeholder='Please input your search' 
                    value={this.state.value}
                    onKeyDown={this.KeydownHandler}
                    onChange={this.ChangeHandler}
                    onKeyDown={this.KeydownHandler}
                    onInput = {this.InputGoogleHandler}
                    />
                    <MdKeyboardVoice className='voice_search' onClick={this.voiceClickHandler}/>  
                     
                    <ul className="selectItem" id="menu-list"  onClickCapture={this.getClickIndex}>
                    {
                        this.state.listitem.map((list, index) => {
                        return (<li key={list}  >{list}</li>)
                        },this)

                    }
                    </ul>
                    
                    <div className='datapick'>
                        <FormControlLabel className='switch_form'
                        control= {
                            <Switch checked={this.state.checked} onChange={this.switchChangeHandler}
                            className = 'switch_a' />}
                            label = {this.state.switchlabel}
                            
                        />
                    </div>
                           
                </div>
                
                <div className='datapicker' style={showOrnot}>
                <p id='data_from'>From</p>
                    <DatePicker
                        defaultValue={moment('1961-01-01', dateFormat)}
                        format={dateFormat}
                        className='startDate'
                        onChange = {this.FromdatechangeHandler}
                        onOk={this.Fromdataokhandler}
                    />
                    <p id='data_to'>To</p>
                    <DatePicker
                        defaultValue={moment('2021-01-01', dateFormat)}
                        format={dateFormat}
                        className='endDate'
                        onChange={this.EnddatachangeHandler}
                    />
                </div>  
                            
                    
                   
                
            </div>
        )
    }
}