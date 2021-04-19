import { providers, useSession } from 'next-auth/client';
import { AppProvider } from 'next-auth/providers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoginScreen from '../../src/screens/login';
import { getUsuario, postUsuario } from '../../src/services/usuarios';

export default function SignIn({provedores}:{provedores: Record<string, AppProvider>}){

  const [ session, loading ] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      getUsuario()
        .then(response => {
          if (response.data.isUsuario) {
            router.push('/');
          } else {
            postUsuario({email: session.user.email})
              .then(response => {
                if (response.status === 201) {
                  router.push('/');
                }
              }).catch(error => {
              console.log(error.response.data);
            });
          }
        }).catch(error => {
          console.log(error.response.data);
      });
    }
  });

  return (
    <LoginScreen providers={provedores}/>
  );
}

export async function getServerSideProps(context){
  const provedores = await providers();
  return {
    props: { provedores }
  }
}
