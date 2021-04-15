import { providers, useSession } from 'next-auth/client';
import { AppProvider } from 'next-auth/providers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoginScreen from '../../src/screens/login';

export default function SignIn({provedores}:{provedores: Record<string, AppProvider>}){

  const [ session, loading ] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');
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
