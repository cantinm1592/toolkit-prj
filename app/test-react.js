/*
The simplist React component ever.
It just renders an H1 tag into the body of the page. Since
JSX is basically just HTML, you can use any valid tag you want.
*/

/*globals ReactDOM React*/
/*eslint-env browser */
ReactDOM.render(React.createElement('h1', null, 'Hello World in ReactJS!'), document.getElementById('root'));