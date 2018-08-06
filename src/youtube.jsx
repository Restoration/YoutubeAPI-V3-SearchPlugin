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
    console.log(url);
    // Get JSON Data
    return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
        console.log(responseJson);
    })
    .catch((error) => {
        console.error(error);
    });
    return false;
}
const domContainer = document.querySelector('#youtube_form_container');
ReactDOM.render(React.createElement(youtubeForm), domContainer);
