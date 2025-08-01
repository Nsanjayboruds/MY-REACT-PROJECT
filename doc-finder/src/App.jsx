import {
  SignIn,
  SignUp,
  SignInButton,
  UserButton,
  useUser,
  RedirectToSignIn,
  SignedIn,
  SignedOut
} from '@clerk/clerk-react';

import { Routes, Route } from 'react-router-dom';

function Home() {
  return <h1>Home Page</h1>;
}

function ProtectedPage() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) return <RedirectToSignIn />;
  return <h1>Welcome to the Protected Page!</h1>;
}

export default function App() {
  return (
    <>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/protected" element={<ProtectedPage />} />
      </Routes>
    </>
  );
}
