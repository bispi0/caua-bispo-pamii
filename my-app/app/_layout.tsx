import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* Define a cor da barra de status do celular (bateria, hora, etc.) como escura */}
      <StatusBar style="dark" />
      
      {/* Configura a navegação das telas */}
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false // Esconde a barra predefinida do Expo para usarmos o nosso cabeçalho bonito
          }} 
        />
      </Stack>
    </SafeAreaProvider>
  );
}
