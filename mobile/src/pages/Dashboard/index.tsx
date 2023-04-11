import React,{useContext, useState} from "react";
import { View, Text, Button } from "react-native";

import { AuthContext } from "../../contexts/AuthContexts";




export default function Dashboard() {

    const { signOut } = useContext(AuthContext);

    return (
        <View>
        <Text>Teste Dashboard</Text>
        <Button title="Sair" onPress={signOut} />
        </View>
    );
    }