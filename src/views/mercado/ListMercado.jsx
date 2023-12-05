import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListProduto() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();


    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/mercado")
            .then((response) => {
                setLista(response.data)
            })
    }
    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }
    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }
    async function remover() {

        await axios.delete('http://localhost:8080/api/mercado/' + idRemover)
            .then((response) => {

                console.log('Mercado removido com sucesso.')

                axios.get("http://localhost:8080/api/mercado")
                    .then((response) => {
                        setLista(response.data)
                    })
            })
            .catch((error) => {
                console.log('Erro ao remover um mercado.')
            })
        setOpenModal(false)
    }

    return (
        <div>
            <MenuSistema />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Mercado </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-mercado'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome do Empreendimento</Table.HeaderCell>
                                    <Table.HeaderCell>CNPJ</Table.HeaderCell>
                                    <Table.HeaderCell>Tipo Empreendimento</Table.HeaderCell>
                                    <Table.HeaderCell>Endereço</Table.HeaderCell>
                                    <Table.HeaderCell>Telefone para Contato</Table.HeaderCell>
                                    <Table.HeaderCell>Rede social (Instagram/Facebook)</Table.HeaderCell>
                                    <Table.HeaderCell>Nome completo do responsável</Table.HeaderCell>
                                    <Table.HeaderCell>Cargo</Table.HeaderCell>
                                    <Table.HeaderCell>Crie uma senha</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(mercado => (

                                    <Table.Row key={mercado.id}>
                                        <Table.Cell>{mercado.NomeEmprendimento}</Table.Cell>
                                        <Table.Cell>{mercado.CnpjEmpreendimento}</Table.Cell>
                                        <Table.Cell>{mercado.TipoEmpreendimento}</Table.Cell>
                                        <Table.Cell>{mercado.Endereco}</Table.Cell>
                                        <Table.Cell>{mercado.TelefoneContato}</Table.Cell>
                                        <Table.Cell>{mercado.RedesSociais}</Table.Cell>
                                        <Table.Cell>{mercado.NomeCompletoResponsavel}</Table.Cell>
                                        <Table.Cell>{mercado.CargoResponsavel}</Table.Cell>
                                        <Table.Cell>{mercado.SenhaDeAcesso}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste Mercado'
                                                icon>
                                                <Link to="/form-mercado" state={{ id: mercado.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>

                                            </Button> &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este mercado'
                                                icon
                                                onClick={e => confirmaRemover(mercado.id)}>

                                                <Icon name='trash' />
                                            </Button>

                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>
            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>

        </div>
    )
}




