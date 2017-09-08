import ReactDom from 'react-dom';
import routes from './routes';
import collector from 'lib/collector';
collector.config('csc');

ReactDom.render(routes, document.getElementById('container'));
