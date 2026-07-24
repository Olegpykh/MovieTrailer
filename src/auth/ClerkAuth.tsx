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
          <button className="px-3.5 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.1em] sm:tracking-[0.15em] whitespace-nowrap rounded-full bg-ink dark:bg-ivory text-paper dark:text-void hover:bg-champagne-dim dark:hover:bg-champagne transition-all duration-300">
            Sign in
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox:
                'w-9 h-9 rounded-full ring-1 ring-champagne-dim/50 dark:ring-champagne/50 hover:ring-champagne transition-all duration-300',
              userButtonBox: 'flex items-center',
              userButtonTrigger:
                'rounded-full focus:shadow-none focus:outline-none',
              userButtonPopoverCard:
                'shadow-lifted rounded-2xl ring-1 ring-ink/10',
            },
          }}
        />
      </SignedIn>
    </div>
  );
}
