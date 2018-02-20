import React from 'react';
import * as request from 'superagent';
import menu from './jsx/menu.jsx';
import { Link } from 'react-router-dom';
import util from './js/util.js';
import { Redirect } from 'react-router-dom';

class pedido extends React.Component {
    constructor() {
      super();
      this.state = {
         error-email: 'ocultar',
         totalpedido: 0,
         seCancelopedido: false
      }
    }
    componentWillMount(){
        let totalpedidos=0;
        for (var index = 0; index < util.productospedidos.length; index++) {
            var element = util.productospedidos[index];
            totalpedidos += (element.cantidadAComprar * element.precio);
        }
        this.setState({
            totalpedido: totalpedidos
        });
    }
    render(){
        const { seCancelopedido } = this.state;
        if (seCancelopedido) {
            return (
                <Redirect to="/catalogo"/>
            )
        }
        console.log(util.productospedidos);
        var ids = [];
        for (var index = 0; index < util.productospedidos.length; index++) {
            var element = util.productospedidos[index];
            ids.push(<li className="media" key={index}>
                <a className="pull-left" href="javascript:;">
                    <img className="media-object img-ped" src={util.server+"./img/"+element.imagen} />
                </a>
                <div className="media-body">
                    <h4 className="media-heading">{element.nombre}</h4>
                    <label>Unidades:</label>{element.cantidadAComprar}<br/>
                    <label>Precio:</label>${element.precio}<br/>
                    <label>SUBTOTAL:</label>${element.cantidadAComprar*element.precio}<br/>
                </div>
            </li>);
        }
        return (
            <div className="img-fondo">
                <menu cantidadpedidos={util.productospedidos.length} />
                <div className="ped-prod panel panel-default">
                    <div className="panel-heading">
                    <span className="panel-title">Carrito de Compras</span>
                    </div>
                    <div className="panel-body">
                    <div className="info">
                        <div className="lista-pedidos">
                        <ul className="media-list">
                            {ids}
                        </ul>
                        </div>
                        <div className="total-pedido">
                        <h2>Total: ${this.state.totalpedido}</h2>
                        <a href="javascript:;" onClick={this.cancelarpedidos.bind(this)} className="boton-volver btn btn-default">Cancelar</a>
                        <a href="javascript:;" onClick={this.pagarpedidos.bind(this)} className="boton-volver btn btn-default">Pagar</a>
                        </div>
                    </div>
                        <Link to="/catalogo" className="boton-volver btn btn-default">Atras</Link>
                    </div>
                </div>
            </div>
        );
    }
    cancelarpedidos(){
        util.productospedidos={};
        this.setState({
            seCancelopedido: true
        });
    }
    pagarpedidos(){
        for (var index = 0; index < util.productospedidos.length; index++) {
            var element = util.productospedidos[index];
            request
            .post('https://tiendareact.firebaseio.com/pedidos.json')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(element))
            .end((err, res)=>{
                console.log(res.body);
            })
        }
        this.cancelarpedidos();
    }
}
export default pedido;
