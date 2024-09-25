import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import Botao from './Botao';

const CadastroFornecedor = ({ onCadastroSubmit }) => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [contato, setContato] = useState('');
  const [categorias, setCategorias] = useState('');
  const [imagem, setImagem] = useState(null);

  const handleCadastro = () => {
    if (!nome || !endereco || !contato || !categorias) {
      showAlert("Error, please fill in all fields");
      return;
    }

    if (!/^\d{11}$/.test(contato)) {
      showAlert("Error", "The contact field must contain exactly 11 numeric digits. including area code");
      return;
    }

    const novoFornecedor = { nome, endereco, contato, categorias, imagem };
    onCadastroSubmit(novoFornecedor);
    clearFields();
    showAlert("Supplier registered in the database");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets && result.assets.length > 0 ? result.assets[0].uri : null);
    }
  };

  const clearFields = () => {
    setNome('');
    setEndereco('');
    setContato('');
    setCategorias('');
    setImagem(null);
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Supplier Name"
        placeholderTextColor="#ffffff"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Adress"
        placeholderTextColor="#ffffff"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact"
        placeholderTextColor="#ffffff"
        value={contato}
        onChangeText={setContato}
        keyboardType="numeric"
        maxLength={11}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        placeholderTextColor="#ffffff"
        value={categorias}
        onChangeText={setCategorias}
      />

      {imagem && <Image source={{ uri: imagem }} style={styles.image} />}

      <View style={styles.buttonContainer}>
        <Botao title="Chose Image" onPress={pickImage} />
        <Botao title="Sign Up" color="#28A745" onPress={handleCadastro} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#1a1e24",
  },
  input: {
    width: 350,
    fontSize: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#565656",
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    color: "#e4e1dc",
  },
  image: {
    width: 160,
    height: 160,
    marginTop: 12,
    borderRadius: 80,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 350,
  },
});

export default CadastroFornecedor;
