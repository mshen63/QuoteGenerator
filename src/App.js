import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state=({
      keyWords: '',
      quote:'Hello its me',
      author:'- Adele',
      collection:[],
      link: ''
      })
   this.getkeyWords=this.getkeyWords.bind(this);
   this.newQuote=this.newQuote.bind(this);
   this.handleTweet = this.handleTweet.bind(this);
  }

  componentDidMount(){
    fetch("https://type.fit/api/quotes")
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({
         collection: responseJson
       })
   })
      .catch((error) => {
        console.error(error);
      });
  }

  getkeyWords(e){
    this.setState({
      keyWords: e.target.value
    })
  }

  newQuote(){
    let newArr = this.state.collection.filter(quote=>quote.author!=null);
    let random1 = Math.floor(Math.random()*newArr.length)
    let word = this.state.keyWords.toLowerCase();
    let regex= new RegExp(word+' ')
    let regex2 = new RegExp(' '+word)
    if (word!==''){
      newArr=newArr.filter(quote=>(quote.text.toLowerCase().split(' ').includes(word)||quote.author.toLowerCase().split(' ').includes(word)));
      let random2= Math.floor(Math.random()*newArr.length)
          if (newArr.length!==0){
          this.setState({
            quote: newArr[random2].text,
            author: "- "+newArr[random2].author
        })
          }
          else{
            this.setState({
              quote: this.state.keyWords,
              author: "- you >:)"
            })
          }}
    else{
      this.setState({
        quote: newArr[random1].text,
        author: '- ' + newArr[random1].author
      })
    }
  }

  handleTweet(){
    this.setState({
     link: 'https://twitter.com/intent/tweet?hashtags=quotes&text=' +
      encodeURIComponent('"' + this.state.quote + '" ' + this.state.author)
   })
  }

    render(){
      return(
        <div>

          <div id="search">
            <p>Get Quotes by Keyword or Author:</p>
            <form>
              <input id="editor" value={this.state.keyWords} onChange = {this.getkeyWords} placeholder="Enter a Search Term!"                   type="text"></input>
              <button type="button" onClick = {this.newQuote}>Submit</button>
            </form>
          </div>

          <div id="bottom">
            <div id="words">
              <h2 id = "text">{this.state.quote}</h2>
              <h3 id = "author">{this.state.author}</h3>
            </div>
            <div id="buttons">
              <button id="new-quote" onClick = {this.newQuote}>Anotha One</button>
              <button onClick = {this.handleTweet} id = "tweet-quote"><a  target ="_top" target="_top" href={this.state.link}>Tweet             Tweet</a></button>
            </div>
          </div>

        </div>
      )
    }
}


export default App;
