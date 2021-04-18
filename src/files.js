import axios from 'axios'
const FileSaver = require('file-saver');


const BaseUrl = 'https://api.themoviedb.org/3';
const ImageUrl = 'https://image.tmdb.org/t/p/original/';
const Api = '7a11f15ae226af612b328dd3ccf527f1';
let moviedata = []



const FetchMovie = () =>{
    for (let year = 2005; year <2006;year ++){
        for(let page =1 ;page<4;page++){
            const request = {
                Movie:`${BaseUrl}`+'/discover/movie?api_key=7a11f15ae226af612b328dd3ccf527f1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page='+`${page}`+'&'+`year=${year}`,
                ComedyMovies: `${BaseUrl}/discover/movie?api_key=${Api}&with_genres=35`,
                ActionMovies: `${BaseUrl}/discover/movie?api_key=${Api}&with_genres=28`,
                Trending: `${BaseUrl}/trending/all/week?api_key=${Api}&language=en-US`,
            }
            axios.get(request.Movie).then(res=>{
                moviedata = [[...res.data.results],...moviedata] 
                if(year===2005&&page===3){
                    let final = []
                    for (let i= 0; i < moviedata.length;i++){
                        for (let j =0 ;j <moviedata[0].length;j++){
                           final = [...final,moviedata[i][j]]
                        }
                    }
                    console.log(final)
                   
                }
            })
        }
    }
    
}  


export default FetchMovie