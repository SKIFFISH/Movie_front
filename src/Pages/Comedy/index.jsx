import React from 'react'
import Navbar from '../../components/navbar'
import {Menu} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './style.less'
import {Row,Col,Divider} from 'antd'
import { useRouteMatch } from 'react-router'
import axios from 'axios'
import {Dropdown,Pagination} from 'antd'
import {ButtonGroup, Card,CardActionArea,CardContent,CardMedia,MenuItem,TextField,Typography} from '@material-ui/core'
import {AiFillPlayCircle} from 'react-icons/ai'
import {IoIosAddCircle} from 'react-icons/io'
import {Button} from '@material-ui/core'
import {Rating} from '@material-ui/lab/'

const categories = [
  {
    label:"Fantasy",
    value:14
  },
  {
    label:"Adventure",
    value:12
  },
  {
    label:"Drama",
    value:18
  },
  {
    label:"Action",
    value:28
  },
  {
    label:"Family",
    value:10751
  },
  {
    label:"Animation",
    value:16
  },
  {
    label:"Comedy",
    value:35
  },
  {
    label:"Horror",
    value:27
  },
  {
    label:"Crime",
    value:80
  },
  {
    label:"Romance",
    value:10749
  },
  {
    label:"Thriller",
    value:53
  },
  {
    label:"Sci-Fi",
    value:878
  },
  {
    label:"Thrill",
    value:9648
  },
  {
    label:"Western",
    value:37
  },
  {
    label:"Western",
    value:37
  },
  {
    label:"War",
    value:10752
  },
  {
    label:"Music",
    value:10402
  },
  {
    label:"Documentary",
    value:99
  },
]

export default class Comedy extends React.Component{
    state = {
      activeItem:'Fantasy',
      genre:14,
      order:'connection',
      label:'Most Relevant',
      activeDrop:'Most Relevant',
      data:[],
      current:1,
    }
    handleItemClick = (e, { name }) => 
    {
      let result =  categories.filter((item) => {
        if(item.label==name){
          return item.value
        }
      })
     
     this.setState({ 
        activeItem: name,
        genre: result[0].value
      },()=>{
        axios.post('http://42.192.235.217:8000/api/movie',{
          genre:this.state.genre
        }).then((res)=>{
          console.log(res.data)
          this.setState({
            data:res.data
          })
        }).catch((err)=>{
          console.log(err)
        })
      })
      
      
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
      axios.post('http://localhost:8000/api/movie',{
          genre:this.state.genre
        }).then((res)=>{
          console.log(res.data)
          //let result = (new Function("return " + res.data))()
          this.setState({
            data:res.data
          })
        }).catch((err)=>{
          console.log(err)
        })
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
        const { activeItem } = this.state
        const categories = [
          {
            label:"Fantasy",
            value:14
          },
          {
            label:"Adventure",
            value:12
          },
          {
            label:"Drama",
            value:18
          },
          {
            label:"Action",
            value:28
          },
          {
            label:"Family",
            value:10751
          },
          {
            label:"Animation",
            value:16
          },
          {
            label:"Comedy",
            value:35
          },
          {
            label:"Horror",
            value:27
          },
          {
            label:"Crime",
            value:80
          },
          {
            label:"Romance",
            value:10749
          },
          {
            label:"Thriller",
            value:53
          },
          {
            label:"Sci-Fi",
            value:878
          },
          {
            label:"Thrill",
            value:9648
          },
          {
            label:"Western",
            value:37
          },
          {
            label:"Western",
            value:37
          },
          {
            label:"War",
            value:10752
          },
          {
            label:"Music",
            value:10402
          },
          {
            label:"Documentary",
            value:99
          },
        ]
        return(
          
            <div className='container' >
              <canvas id='star'></canvas>
              <Row>
                    <Col span={24}>
                        <Navbar history={this.props.history}/>
                    </Col>
              </Row>
              <Divider orientation='left'></Divider>
              <Divider></Divider>
              <div className='sidebar'>
              <Row>
                <Col span={5}>
                  <Menu vertical inverted pointing>
                  <Menu.Item>
                    <Menu.Header>Categories</Menu.Header>
                            
                    {
                      categories.map((item,index)=>{
                        const activeitem = item.label
                        return(
                          <Menu.Item
                            key={index}
                            name={item.label}
                            active={activeItem===activeitem}
                            onClick={this.handleItemClick}
                          />
                        )
                      })
                    }
                    </Menu.Item>
                  </Menu>
                </Col>
                <Col span={1}></Col>
                <Col span={10} className='col_pag'>
                        <Pagination className='pagination' defaultCurrent={1} total={this.state.data.length}
                        onChange={this.paginationChangeHandler}/>
                  </Col>   
              </Row>
              </div>
              {
              this.state.data.map((item,index)=>{
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
                      <div className='movie_Card'>
                        <Row key={index} className='content-movie'>
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
                    </div>
                    )
                    }
                    else if(item.poster_path==null && item.backdrop_path!=null){
                        return(
                          <div className='movie_Card'>
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
                        </div>
                        )
                    }
                }
                })}
            
    </div>

            
        )
    }
}