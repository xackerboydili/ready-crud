
import React from "react";
import list from "./list";
import { Container, Container2, Size, Table, Input, Btn } from './style';



class State extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           data: list,
           active: null,
           name:'',
           surname: '',
        }
    }
    render(){

        const onDelete = (name) => {
            let del = this.state.data.filter(val => val.name !== name)
            this.setState({
                data : del
            })
        }
        
        const onAdd =()=>{
            let user = {
              surname : this.state.surname,
              name : this.state.name
            }
            this.setState({ data: [user,...this.state.data],
                 name: '',
                 surname: '',})
            
          }
    


        const onEdit = ({name, surname}, saved) => {
            if(saved){
            let res = this.state.data.map(val => val.name === this.state.active.name ? {...val, name: this.state.name, surname: this.state.surname} : val)
            
            this.setState({
                active:null,
                data:res
            })}
            else{
                this.setState({
                    name: name,
                    surname: surname,
                    active: {name, surname}
                })
            }
        }

        const onFilter = (e) =>{
            let res = list.filter((value)=> value.name.includes(e.target.value))
            this.setState({
                data:res
            })
        }

        const onChange =(e)=>{
            this.setState({[e.target.name] : e.target.value})
        }

        return(
            <Container>
                <h2>Add New User:</h2>
            <Container2>
            <Input value={this.state.name} name="name" onChange={onChange} placeholder='name'  type="text"  />
            <Btn className="btn" onClick={onAdd}>Add</Btn>
            <Input value={this.state.surname} name="surname" onChange={onChange} placeholder='surname' type="text"  />
            
            </Container2>
           
           
            <Container2>

                
                <h2>Search user:</h2>
                <Size onChange={onFilter} type="text" name="" id="" />
            </Container2>
           
        
                <Table className="tbl">
                    <thead className="tbl-dt">
                        <tr>
                            <th>Name</th>
                            <th>surname</th>
                            <th>delete</th>
                            <th>edit</th>
                        </tr>
                    </thead>
                    <tbody className="tbl-bdy">
                        {
                            this.state.data.length ?
                            this.state.data.map(({name, surname}) => {
                                return(
                                    <tr key={name}>
                                    <td>
                                        
                                        {this.state.active?.name === name ? (<input onChange={onChange} value={this.state.name} name='name' type='text'></input>) : (name)} 
                                    </td>
                                    <td>
                                        {this.state.active?.name === name ? (<input onChange={onChange} value={this.state.surname} name ='surname' type='text'></input>) : (surname)}
                                    </td>
                                    <td>
                                        <Btn className="btn" onClick={() => onDelete(name)}>delete</Btn>
                                    </td>
                                    <td>
                                        <Btn className="btn" onClick={()=> onEdit({name, surname}, this.state.active?.name === name)}>
                                        {this.state.active?.name === name ? 'save' : 'edit'}
                                        </Btn>
                                    </td>
                                </tr>
                            )
                        }) :
                        <tr>
                                <th colSpan={4}>No Data</th>
                            </tr>
                        }
                    </tbody>
                </Table>


            </Container>
        )
        
    }
}




export default State;
