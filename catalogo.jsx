import React from 'react';
import prod from './jsx/prod.jsx';
import * as request from 'superagent';
import menu from './jsx/menu.jsx';
import util from './js/util.js';

class catalogo extends React.Component {
    constructor() {
      super();
      this.state = {
         error-email : 'ocultar',
         error-psw : 'ocultar',
         error-form : 'ocultar',
         error-form-msg : 'Error desconocido',
         msg :' ',
         a-prod : [],
         productosConsulta: [],
         productosPedidos: [],
         filter: ''
      }
      this.getProds();
    }
    render(){
        var ids = [];
        var a-prod = this.state.a-prodConsulta;
        for (var i = 0; i < a-prod.length; i++) {
            let producto = a-prod[i];
            ids.push(
                <div className="prodi" key={i}>
                    <prod addPed={this.addPed.bind(this)} producto = {producto} productosPedidos={this.state.productosPedidos}/>
                </div>
                );
        }
        return (
            <div className="img-fondo cat-prod">
                <menu cantidadPedidos={util.productosPedidos.length} />
                <div className="cat-prod panel panel-default">
                    <div className="panel-heading">
                    <span className="panel-title">Catálogo de productos</span>
                    <div className="get-form navbar-right">
                        <label htmlFor="buscador">¿Que estas buscando?</label>
                        <input type="text" value={this.state.filter} onChange={this.getProd.bind(this)}/>
                    </div>
                    </div>
                    <div className="panel-body">
                        {ids}
                    </div>
                </div>
            </div>
        );
    }
    getProd(event) {
        let patronEscrito = event.target.value;
        this.setState({filter: event.target.value});
        let a-prod = this.state.a-prod;
        let productosConsulta = [];
        for (var index = 0; index < a-prod.length; index++) {
            var element = a-prod[index];
            if(element.nombre.includes(patronEscrito)){
                productosConsulta.push(element);
            }
        }
        this.setState({productosConsulta: productosConsulta});
    }
    getProds(){
        request
            .get('https://tienda-9303e.firebaseio.com/productos.json')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                console.log(res.body);
                let productosRecuperados = res.body;
                request
                    .get('https://tiendareact.firebaseio.com/pedidos.json')
                    .set('Content-Type', 'application/json')
                    .end((errPedido, resPedido) => {
                        console.log(resPedido.body);
                        let pedidosRecuperados = resPedido.body;
                        for (var index = 0; index < productosRecuperados.length; index++) {
                            var element = productosRecuperados[index];
                            for (var indexUtil = 0; indexUtil < util.productosPedidos.length; indexUtil++) {
                                var elementUtil = util.productosPedidos[indexUtil];
                                if(element.id == elementUtil.id){
                                    productosRecuperados[index].unidadesDisponibles -= elementUtil.cantidadAComprar;
                                }
                            }
                            for (let key in pedidosRecuperados) {
                                var pedido = pedidosRecuperados[key];
                                if(element.id == pedido.id){
                                    productosRecuperados[index].unidadesDisponibles -= pedido.cantidadAComprar;
                                }
                            }
                        }
                        this.setState({
                            a-prod: productosRecuperados,
                            productosConsulta: productosRecuperados
                        });
                    });
            });
    }
    addPed(producto){
        console.log(util.productosPedidos.length);
        console.log(producto);
        let indexPedido = -1;
        for (var index = 0; index < util.productosPedidos.length; index++) {
            var element = util.productosPedidos[index];
            if(element.id === producto.id){
                indexPedido = index;
                break;
            }
        }
        if(indexPedido != -1){
            util.productosPedidos[indexPedido].cantidadAComprar += producto.cantidadAComprar;
        }else{
            util.productosPedidos.push(producto);
        }
        this.setState({
            productosPedidos: util.productosPedidosAux
        });
    }
}
export default catalogo;
