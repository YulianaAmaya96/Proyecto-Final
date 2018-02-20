import React from 'react';
import * as request from 'superagent';
import menu from './jsx/menu.jsx';
import { Link } from 'react-router-dom';

class prod extends React.Component {
    constructor() {
      super();
      this.state = {
         unidadesDisponible : 0,
         unidadesSolicitadas: 0
      }
    }
    render(){
        return (
            <div className="pnl-prod panel panel-default">
                <div className="panel-body">
                    <img className="img-prod" src={"./img/"+this.props.producto.imagen} alt=""/>
                    <div>
                        <h4>{this.props.producto.nombre}</h4>
                    </div>
                    <div>
                        <label htmlFor="">Precio:&nbsp;</label><span>${this.props.producto.precio}</span>
                    </div>
                    <div>
                        <label htmlFor="">Unidades Disponibles:&nbsp;</label><span>{this.state.unidadesDisponible}</span>
                    </div>
                    <div className="controls">
                        <Link to={`/catalogo/detalle-producto/${this.props.producto.id}`} className="btn btn-primary">Ver Mas</Link>
                        <a onClick={this.addPed.bind(this)} className="btn btn-warning">Añadir</a>
                        <input type="number" name="cantidadAgregar" value={this.state.unidadesSolicitadas} onChange={this.calcularUnidadesDisponibles.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
    addPed(){
        this.props.producto.unidadesDisponibles = this.state.unidadesDisponible;
        this.props.producto.cantidadAComprar = Number.parseInt(this.state.unidadesSolicitadas);
        this.props.addPed(this.props.producto);
        this.setState({
            unidadesSolicitadas: 0
        });
    }
    calcularUnidadesDisponibles(event){
        let cantidadSolicitada = event.target.value;
        let cantidadDisponible = this.props.producto.unidadesDisponibles - cantidadSolicitada;
        this.setState({
            unidadesSolicitadas: event.target.value,
            unidadesDisponible: cantidadDisponible
        });
    }
    componentWillMount(){
        this.setState({
            unidadesDisponible: this.props.producto.unidadesDisponibles
        });
    }
}
export default prod;
