import React, { Component } from 'react';

class App extends Component {

    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            items: [],
            _id: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    componentDidMount(){    //on mount
        this.fetchItems()
    }

    fetchItems(){
        fetch('/api/items')
            .then(res => res.json())
            .then(data => {
                this.setState({items: data});
            })
    }

    addItem(e){
        //edit
        if(this.state._id) {
            fetch(`/api/items/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                window.M.toast({html: 'Item Actualizado'})
                this.setState({title:'', description:'', _id: ''})
                this.fetchItems();
            })
        } else {
            //save
            fetch('/api/items', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Item Guardado'});
                this.setState({title:'',description:''})
                this.fetchItems();
            })
            .catch(err => console.log(err))
        }
        e.preventDefault();
    }

    updateItem(id) {
        fetch(`/api/items/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            })
        })
    }

    deleteItem(id) {
        if(confirm('Estas seguro de eliminar este item?')){
            fetch(`/api/items/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Item Eliminado'});
                this.fetchItems();
            })
            .catch(err => console.log(err))
        }
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return(
            <div>
                {/*Sup Nav*/}
                <nav className="blue-grey lighten-2">
                    <div className="container">
                        <a className="brand-logo" href="/">Inventario de ítems</a>
                    </div>
                </nav>

                <div className="container" style={{paddingTop:'2rem'}}>
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <h6 style={{color:'white', textAlign:'center', backgroundColor:'#bfbfbf', padding:'.5rem'}}>Agregar item</h6>
                                <div className="card-content">
                                    <form onSubmit = { this.addItem }>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={ this.handleChange } value={this.state.title} type="text" placeholder="Nombre Item" autoComplete="off" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange = { this.handleChange } value={this.state.description} className="materialize-textarea" placeholder="Descripción Item"></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn waves-effect waves-light light-blue darken-4">Enviar
                                            <i className="material-icons right">send</i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Descripción</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.items.map(item => {
                                            return (
                                                <tr key={item._id}>
                                                    <td>{item.title}</td>
                                                    <td>{item.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" title="Editar item" onClick={() => this.updateItem(item._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn red darken-2" title="Borrar item" style={{margin:'.4rem'}} onClick={() => this.deleteItem(item._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;