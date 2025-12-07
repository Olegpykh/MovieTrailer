import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';

export default function ClerkAuth() {
  return (
    <div className="flex items-center">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-5 py-2 text-sm font-bold text-black transition bg-yellow-400 rounded-full hover:bg-yellow-500">
            Sign in
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-10 h-10 ring-2 ring-yellow-400',
            },
          }}
        />
      </SignedIn>
    </div>
  );
}
