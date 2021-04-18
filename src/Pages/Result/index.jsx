import React from 'react'
import Navbar from '../../components/navbar'
import {Col,Row,Divider} from 'antd'
import {ButtonGroup, Card,CardActionArea,CardContent,CardMedia,MenuItem,TextField,Typography} from '@material-ui/core'
import './style.less'
import {useTheme,makeStyles,withStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import {Rating} from '@material-ui/lab/'
import {Popover} from '@material-ui/core'
import {Button} from '@material-ui/core'
import {AiFillPlayCircle} from 'react-icons/ai'
import {IoIosAddCircle} from 'react-icons/io'
import {Menu,Dropdown} from 'antd'
import {Pagination} from 'antd'




class Results extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            id:0,
            anchor:null,
            data:[],
            order:'connection',
            label:'Most Relevant',
            original_data:[],
            current:1,
            movie_id:0
        }
        
    }
    init(){
        let canvas = document.getElementById('star')
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        let context = canvas.getContext('2d');
        let stars = Array();
        let stars_count = 200;

        for(let i=0;i<stars_count;i++){
            let x=Math.random() * canvas.offsetWidth;
            let y = Math.random() * canvas.offsetHeight;
            let radius = Math.random()*0.8;
            let color="rgba("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+",0.8)";
            let speed=Math.random()*0.5;
            let arr={'x':x,'y':y,'radius':radius,'color':color,'speed':speed};
            stars.push(arr);
        }
        var interval=setInterval(function(){
            context.fillStyle = "#0e1729";
            context.fillRect(0,0,canvas.width,canvas.height);
        for (var i = 0; i < stars.length; i++) {
            var x = stars[i]['x'] - stars[i]['speed'];
            if(x<-2*stars[i]['radius']) x=canvas.width;
            stars[i]['x']=x;
            var y = stars[i]['y'];
            var radius = stars[i]['radius'];
            context.beginPath();
            context.arc(x, y, radius*2, 0, 2*Math.PI);
            context.fillStyle = "rgba("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+",0.8)";
            context.fill();
        }
        },50);
    }

    componentDidMount(){
        this.init();
        
        const result = (new Function("return " + this.props.location.query))();
        //console.log(typeof(result))
        if(result == null){
            window.history(-1)
        }
        this.setState({
            canvas:document.getElementById('star'),
            original_data:result,
            data:result,
            /*
            id:result.id,
            backgroundImage:result.backdrop_path,
            genre_ids:result.genre_ids,
            original_title:result.original_title,
            overview:result.overview,
            popularity:result.popularity,
            posterImage:result.poster_path,
            release_date:result.release_date,
            vote_average:result.vote_average,
            vote_count:result.vote_count
            */
        })
    }
    componentDidUpdate(){
        this.init();
    }
    
    mouseEnterHandler =(e)=>{
        this.setState({
            anchor:e.currentTarget
        })
    }
    
    mouseLeaveHandler =()=>{
        this.setState({
            anchor:null
        })
        console.log(1)
    }

    textChangeHandler =(e)=>{
        this.setState({
            order:e.target.value
        })
        console.log('click left button', e);
    }

    sorted = (filed,reverse,pre)=>{
        reverse = (reverse)?-1:1;
        return function(a,b){
            a = a[filed];
            b = b[filed];
            if (typeof (pre) != 'undefined') {
                a = pre(a);
                b = pre(b);
            }
            if (a < b) { return reverse * -1; }
            if (a > b) { return reverse * 1; }
        return 1;
        }
    }

    menuClickHandler =(e)=>{
        this.setState({
            order:e.item.props.value,
            label:e.item.props.children[1]
        })
       // console.log(e.item.props.value);
        let data = this.state.data;
        if(e.item.props.value=='rate') data = data.sort(this.sorted('vote_average',true,parseFloat));
        if(e.item.props.value=='reverse_rate') data = data.sort(this.sorted('vote_average',false,parseFloat));
        if(e.item.props.value=='connection') this.state.data = (new Function("return " + this.props.location.query))();
        if(e.item.props.value=='popularity') data = data.sort(this.sorted('popularity',true,parseFloat))
        //console.log(data)
    }

    paginationChangeHandler = (e) =>{
        this.setState({
            current:e
        })
    }

    
    render(){   
        const BaseURL = 'https://image.tmdb.org/t/p/original/'
        const BaseMovieURL = 'https://www.themoviedb.org/movie/'
        const {classes} = this.props;
        const dictForMovie = {
            "14":"Fantasy",
            "12":"Adventure",
            "18":"Drama",
            "28":"Action",
            "10751":"Family",
            "16":"Animation",
            "35":"Comedy",
            "27":"Horror",
            "80":"Crime",
            "10749":"Romance",
            "53":"Thriller",
            "878":"Sci-Fi",
            "9648":"Thrill",
            "37":"Western",
            "10752":"War",
            "10402":"Music",
            "99":"Documentary"
        }
        const choice = [
        {
            value :'connection',
            label : 'Most Relevant',
        },
        {
            value:'rate',
            label : 'Highest rate'
        },
        {
            value:'reverse_rate',
            label:'Lowest rate'
        },
        {
            value:'popularity',
            label :'Most Popular'
        }

    ]
    console.log(this.state.current)
    const content = (
        <Menu onClick={this.menuClickHandler} >
            {
                choice.map((items,index)=>{
                    return(
                    <Menu.Item key={index} value={items.value}>
                        {items.label}
                    </Menu.Item>
                    )
                })
            }
        </Menu>
        )
        return(
            
            <div className='container'>
                <canvas id='star'></canvas>
                <Row>
                    <Col span={24}>
                        <Navbar history={this.props.history}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={3}></Col>
                    <Col span={2}>
                        <Typography></Typography>
                    </Col>
                </Row>
                <Row className='stand'>
                    <Col span={24}>
                        Stand for location
                    </Col>
                </Row>
                <Row>
                    <Col span={4}></Col>
                    <Col span={2}>
                        <div className='multichoice'>
                            <Dropdown.Button onClick={this.textChangeHandler}
                            overlay={content} >
                                {this.state.label}
                            </Dropdown.Button>                          
                        </div>
                    </Col>
                </Row>
                <Divider></Divider>
                <Row>
                    <Col span={24} >
                        <Pagination className='pagination' defaultCurrent={1} total={this.state.data.length}
                        onChange={this.paginationChangeHandler}/>
                    </Col>
                </Row>
                <Divider></Divider>
                {this.state.data.map((item,index)=>{
                    if(index <this.state.current*10 && index >= (this.state.current-1)*10 ){
                    

                    var classOfMovie='';
                    item.genre_ids.map((items,index)=>{
                        items = dictForMovie[items]
                        if (index == item.genre_ids.length-1){
                            //console.log(typeof(items))
                            classOfMovie = classOfMovie+''+items;
                        }
                        else{
                        classOfMovie = classOfMovie+''+items+'/';
                        }
                    })
                    if(item.poster_path!=null){
                    return(

                        <Row key={index} className='content-movie'>
                            <Col span={5}></Col>
                            <Col span={14}>
                            <Card className='root'>
                            
                            <CardActionArea className='action'>
                            <div className='media_container'>
                                <CardMedia component="img"
                                alt='List_movie'
                                image= {BaseURL+item.poster_path}
                                className='img_card'

                                />
  
                            </div>
                            </CardActionArea>
                            
                            <CardContent className='content'>
                            <Typography className='title' variant='h6'>
                                
                                <a href={BaseMovieURL+item.id}>{item.title}</a>
                                 
                            </Typography>
                            <Typography className='time' variant='subtitle1'>
                                release date : {item.release_date}
                            </Typography>
                            <Typography className='ori_title' variant='subtitle1'>
                                original title : {item.original_title}
                            </Typography>
                            <Typography className='overview' variant='subtitle2' >
                                Overview : {item.overview}
                            </Typography>
                            
                            </CardContent>
                            <CardContent className='content-rating'>
                            <div onMouseEnter={this.mouseEnterHandler}
                            onMouseDown={this.mouseLeaveHandler}
                                > 
                                <Rating name='read-only' 
                                value={item.vote_average/2}
                                readOnly 
                                />
                                </div>
                                <div className='rating-word'>
                                    {item.vote_average}
                                </div>
                                <div className='genre'>
                                    <Typography variant='subtitle1'>
                                    film genre : {classOfMovie}
                                    </Typography>
                                    
                                </div>
                                <div className='button_div' onc>

                            
                            <Button startIcon={<AiFillPlayCircle />}
                            size = 'large'
                            variant ='contained'
                            color='secondary'
                            className='button_play'
                            >
                                <a href={BaseMovieURL+item.id} className='href_link'>Play</a>
                            </Button>
                           
                            <Button startIcon={<IoIosAddCircle />}
                            size = 'large'
                            variant ='contained'
                            color='primary'
                            className='button_add'
                            >
                                ADD
                            </Button>
                            </div>
                            </CardContent>
                            
                        </Card>
                    </Col>
                    <Col span={5}></Col>
                    <Divider></Divider>
                    </Row>
                    )
                    }
                    else if(item.poster_path==null && item.backdrop_path!=null){
                        return(
                            <Row key={index}>
                                <Col span={5}></Col>
                                <Col span={14}>
                                <Card className='root'>
                                
                                <CardActionArea>
                                <div className='media_container'>
                                    <CardMedia component="img"
                                    alt='List_movie'
                                    image= {BaseURL+item.backdrop_path}
                                    className='img_card'
                                    >
                                    </CardMedia>
                                </div>
                                <Typography className='title' variant='h6'>
                                    {item.original_title}
                                </Typography>
                                 <Typography className='overview' variant='subtitle2' >
                                    Overview : {item.overview}
                                </Typography>
                                </CardActionArea>
                                <CardContent className='content-rating'>
                                <div onMouseEnter={this.mouseEnterHandler}
                                onMouseDown={this.mouseLeaveHandler}
                                > 
                                <Rating name='read-only' 
                                value={item.vote_average/2}
                                readOnly 
                                />
                                </div>
                            </CardContent>
                            <div className='button_div'>
                            <Button 
                            size = 'large'
                            variant ='contained'
                            color='secondary'
                            className='button_play'
                            >
                                Play
                            </Button>
                            <Button startIcon={<IoIosAddCircle />}
                            size = 'large'
                            variant ='contained'
                            color='primary'
                            className='button_add'
                            >
                                Play
                            </Button>
                            </div>
                            </Card>
                        </Col>
                        <Col span={5}></Col>
                        <Divider></Divider>
                        </Row>
                
                        )
                    }
                }
                })}
            
                
                
            </div>
        )
    }
}

export default Results