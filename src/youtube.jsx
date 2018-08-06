/*----------------------------------------------
Author : RyotaYamamoto
URL : Youtube API V3 SearchPlugin
----------------------------------------------*/
'use strict';
class youtubeForm extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        // Get Parameters
        var params = {
            'part': 'snippet',
            'type': 'video',
            'q' : document.getElementById('keyword').value,
            'key' : G.USER_API_KEY,
        }
        execQuery(params);
        return event.preventDefault(); 
    }
    render(){
        return (
             <form onSubmit={this.handleSubmit}>
                <input id="keyword" type="text" ref="keyword" name="keyword" placeholder="Keyword" />
               <input type="submit" value="Search" />
             </form>
        
        );
    }
}

function execQuery(params){      
    // Create Query
    var query = '';
    for (var key in params){
        if(params[key]){
            query += key + '=' + params[key] + '&';
        }
    }
    var url = G.YOUTUBE_URL+query;
    // Get JSON Data
    return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
        renderData(responseJson);
    })
    .catch((error) => {
        console.error(error);
    });
    return false;
}

function renderData(data){
    var items = data.items;
    var target = document.getElementById("image_container");
    target.innerHTML = "";
    for (var i = 0; i < items.length; i++){
        var title     = items[i].snippet.channelTitle;
        var imgSrc    = items[i].snippet.thumbnails.medium.url; 
        var imgHeight = items[i].snippet.thumbnails.medium.height;
        var imgWidth  = items[i].snippet.thumbnails.medium.width;
        var url       = 'https://www.youtube.com/watch?v='+ items[i].id.videoId;
        var link = document.createElement("a");
        link.setAttribute("href",url);
        link.setAttribute("target","_blank");
        var img = document.createElement("img");
        img.setAttribute("src",imgSrc);
        img.setAttribute("alt",title);
        img.setAttribute("height",imgHeight);
        img.setAttribute("width",imgWidth);
        target.appendChild(link);
        link.appendChild(img);
   }
}
const formContainer = document.querySelector('#youtube_form_container');
ReactDOM.render(React.createElement(youtubeForm), formContainer);
