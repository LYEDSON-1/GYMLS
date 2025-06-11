import { AuthProvider } from '~/Provider/AuthProvider';
import '../global.css';

import { Slot, Stack } from 'expo-router';



export default function RootLayout() {
  return (
    <AuthProvider>
        <Slot/>
    </AuthProvider>
     
  );
}
