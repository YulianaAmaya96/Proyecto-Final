import React from 'react';
import { Link } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import catalogo from './jsx/catalogo.jsx';
import detProd from './jsx/detProd.jsx';
import pedido from './jsx/pedido.jsx';
import util from './js/util.js';

class index extends React.Component {
    constructor() {
      super();
      this.state = {
         productospedidos: []
      }
    }
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path = '/catalogo' component = {catalogo}/>
                    <Route path = '/catalogo/detalle-producto/:idProducto' component = {detProd} />
                    <Route path = '/catalogo/pedido' component = {pedido} />
                </Switch>
            </div>
        );
    }
}
export default index;
