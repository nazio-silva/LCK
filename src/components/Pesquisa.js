import axios from "axios";
import React from "react";

import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Text, 
  TouchableOpacity 
} from "react-native";

import { SearchBar, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/dist/FontAwesome";

const URL_BUSCA_CLIENTE =
  "http://wsapp.locktec.com.br/apiLCK_dev/services/services.php?action=BUSCA_CLIENTES&token=";

export default class MenuDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: "",
      token: "",
      cli_id: "",
      page: 1,
      requesting: false,
      listaClientes: [],
      nav: null,
    };
    this.pesquisar = this.pesquisar.bind(this);
  }

  componentDidMount() {
    const token = this.props.token;
    const cli_id = this.props.clienteId;

    this.setState({
      token,
      cli_id,
    });

    const BUSCA_CLIENTE =
      URL_BUSCA_CLIENTE + token + "&cliente=" + cli_id + 
      "&page=" + this.state.page + "&query=" + this.state.texto;

    axios
      .get(BUSCA_CLIENTE)
      .then(res => {
        const clientes = res.data.dados;
        this.setState({ listaClientes: clientes });
      })
      .catch(err => console.log("Erro ao buscar dados da API: " + err));
  }

  pesquisar(texto) {
    this.setState({ texto });
    if (this.state.requesting == true) {
      return true;
    }

    this.state.requesting = true;

    axios
      .get(
        URL_BUSCA_CLIENTE +
          this.state.token + "&cliente=" +
          this.state.cli_id + "&page=" +
          this.state.page + "&query=" +
          this.state.texto
      )
      .then(() => {
        const BUSCA_CLIENTE =
          URL_BUSCA_CLIENTE +
          this.state.token + "&cliente=" +
          this.state.cli_id + "&page=" +
          this.state.page + "&query=" +
          this.state.texto;

        this.state.requesting = false;

        axios.get(BUSCA_CLIENTE).then(res => {
          const clientes = res.data.dados;
          this.setState({ 
            listaClientes: clientes 
          });
        });
        console.log("Encontrado");
      })
      .catch(() => {
        this.state.requesting = false;
        console.log("Erro ao pesquisar dados na API!");
      });
  }

  render() {
    return (
      <View style={styles.viewPesquisa}>
        <SearchBar
          round={true}
          value={this.state.texto}
          showLoading={true}
          containerStyle={{ backgroundColor: '#fff' }}
          inputStyle={styles.searchInput}
          placeholderTextColor="#708090"
          placeholder="Pesquisar por um cliente"
          onChangeText={this.pesquisar}
        />

        <ScrollView>
          {
            this.state.listaClientes.map(cliente => {
              const proprietario = cliente.nome.split();
              const dados = cliente.nome.toLowerCase();

              if (
                cliente.nome.indexOf(this.state.texto) != -1 ||
                this.state.texto == "" ||
                dados.indexOf(this.state.texto) != -1
              ) {
                return (
                  <View key={cliente.id}>
                    <ListItem style={styles.listItem}
                      leftIcon={
                        <TouchableOpacity
                          style={styles.leftIcon}
                          onPress={
                            () => {
                              this.props.nav.navigate("ListaVeiculos", [
                                cliente.id,
                                this.state.token,
                              ]);
                            }
                          }
                        >
                          <Icon
                            name="user-o"
                            size={20}
                            style={{ color: "black" }}
                          />
                          <Text style={styles.proprietario}>
                            {proprietario}
                          </Text>
                        </TouchableOpacity>
                      }
                    />
                  </View>
                );
              } else {
                console.log("Cliente nao encontrado!");
              }
            })
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewPesquisa: {
    flex: 1, 
    backgroundColor: "#fff"
  },
  searchInput: {
    backgroundColor: '#fff', 
    textAlign: 'center', 
    borderColor: 'black', 
    borderStyle: 'solid', 
    borderWidth: 1
  },
  listItem: {
    backgroundColor: "#fff",
    marginLeft: 10,
    flexDirection: "row",
  },
  leftIcon: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  proprietario: {
    marginLeft: 10, 
    color: "black"
  },
})

