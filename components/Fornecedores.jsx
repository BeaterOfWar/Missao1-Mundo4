import React, { useMemo, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const useFiltrarFornecedores = (fornecedores, categoriaFiltro) => {
  const fornecedoresFiltrados = useMemo(
    () =>
      fornecedores.filter(
        (fornecedor) =>
          categoriaFiltro === "" ||
          fornecedor.categorias.includes(categoriaFiltro)
      ),
    [fornecedores, categoriaFiltro]
  );
  return fornecedoresFiltrados;
};

const ListaFornecedores = ({ fornecedores, onRemove }) => {
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  const fornecedoresFiltrados = useFiltrarFornecedores(
    fornecedores,
    categoriaFiltro
  );

  const handleCategoriaFiltroChange = (text) => {
    setCategoriaFiltro(text);
  };

  const handleDelete = (fornecedor) => {
    Alert.alert(
      "Delete",
      "Delete supplier from database?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => onRemove(fornecedor.id) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#888"
        value={categoriaFiltro}
        onChangeText={handleCategoriaFiltroChange}
      />

      {fornecedoresFiltrados.map((fornecedor, index) => (
        <View key={index} style={styles.fornecedorContainer}>
          <Image
            source={{ uri: fornecedor.imagem }}
            style={styles.imagemFornecedor}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.nomeFornecedor}>{fornecedor.nome}</Text>
            <Text style={styles.detalheFornecedor}>
              Endereço: {fornecedor.endereco}
            </Text>
            <Text style={styles.detalheFornecedor}>
              Contato: {fornecedor.contato}
            </Text>
            <Text style={styles.detalheFornecedor}>
              Categoria: {fornecedor.categorias}
            </Text>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDelete(fornecedor)}
            >
              <Text style={styles.actionText}>Apagar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#121212",
  },
  input: {
    fontSize: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 25,
    backgroundColor: "#1e1e1e",
    color: "#e4e1dc",
  },
  fornecedorContainer: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  nomeFornecedor: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e4e1dc",
  },
  detalheFornecedor: {
    fontSize: 16,
    color: "#b0b0b0",
  },
  imagemFornecedor: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  actionButton: {
    padding: 8,
    width: 70,
    marginTop: 8,
    backgroundColor: "#ff6347",
    borderRadius: 10,
  },
  actionText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default ListaFornecedores;
