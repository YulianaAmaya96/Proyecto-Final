import React from 'react';
import * as request from 'superagent';
import { Redirect } from 'react-router-dom';

class iniSesion extends React.Component {
    constructor() {
      super();
      this.state = {
         error-email: 'ocultar',
         error-psw: 'ocultar',
         error-form: 'ocultar',
         error-form-msg: 'Error desconocido',
         isUserValid : false
      }
    }
    render(){
        const { isUserValid } = this.state;
        if (isUserValid) {
            return (
                <Redirect to="/catalogo"/>
            )
        }
        return (
            <div className="login-panel">
                <div className="login-form">
                    <h1>Inicia Sesión</h1>
                    <form id="login-form">
                        <div className="caja-form">
                            <label htmlFor="correo-input">Correo electrónico *</label>
                            <input type="text" id="correo-input" name="correo-input" required pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"/>
                            <span className={this.state.error-email}>Error: campo requerido o error en correo</span>
                        </div>
                        <div className="caja-form">
                            <label htmlFor="contrasena-input">Contraseña *</label>
                            <incatalogo="password" id="contrasena-input" name="contrasena-input" required />
                            <span className={this.state.error-psw}>Error: campo requerido</span>
                        </div>
                        <span className={this.state.error-form}>{this.state.error-form-msg}</span>
                        <button className="btn btn-success" type="button" onClick = {this.validarUsuario.bind(this)}>Ingresar</button>
                    </form>
                </div>
            </div>
        );
    }
    ocultarMsnError(){
        this.setState({
            error-email: 'ocultar',
            error-psw: 'ocultar',
            error-form: 'ocultar',
            error-form-msg: 'Error desconocido'
        });
    }
    validarUsuario(){
        this.ocultarMsnError();
        let formularioLogin = document.getElementById("login-form");
        let inputCorreo = formularioLogin['correo-input'];
        if(!inputCorreo.checkValidity()){
            this.setState({
                error-email: 'mostrar_b'
            });
        }
        let inputContrasena = formularioLogin['contrasena-input'];
        if(!inputContrasena.checkValidity()){
            this.setState({
                error-psw: 'mostrar_b'
            });
        }
        if(inputContrasena.checkValidity() && inputCorreo.checkValidity()){
            let correo = inputCorreo.value;
            let pass = inputContrasena.value;
            request
            .get('https://tiendareact.firebaseio.com/usuarios.json')
            .set('Content-Type', 'application/json')
            .end((err, res)=>{
                console.log(res.body);
                let usuarios = res.body;
                let usuario = undefined;
                for (var index = 0; index < usuarios.length; index++) {
                    var element = usuarios[index];
                    if(element.correo === correo && element.contrasena == pass){
                        usuario = element;
                        break;
                    }
                }
                if(undefined == usuario){
                    this.setState({
                        error-form: 'mostrar_b',
                        error-form-msg: 'Usuario no encontrado'
                    });
                }else{
                    this.setState({
                        isUserValid: true
                    });
                }
            })

        }
    }
}
export default iniSesion;
