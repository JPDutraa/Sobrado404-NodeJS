import React, {useContext} from "react";
import { View, ActivityIndicator} from "react-native";
import { AuthContext } from "../contexts/AuthContexts";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

function Routes() {
  
    const {isAuthenticaded} = useContext(AuthContext);
    const loading = false;

    if (loading) {
        return(
            <View style={
                {flex:1,
                backgroundColor: '#f5f7fb',
                justifyContent: 'center',
                alignItems:'center'
                }
                }
                
            >
                <ActivityIndicator size={60} color='#1d1d2e' />
            </View>
        )
    }
    
  return (
   isAuthenticaded ? <AppRoutes /> : <AuthRoutes />
  );
}

export default Routes;