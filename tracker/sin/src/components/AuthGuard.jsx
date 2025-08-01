
import { useUser, RedirectToSignIn } from '@clerk/clerk-react';

export default function AuthGuard({ children }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null; 

  if (!isSignedIn) return <RedirectToSignIn />;

  return children;
}
